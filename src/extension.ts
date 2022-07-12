import * as vscode from "vscode";
import * as fs from "fs";
import { getScssAlertTemplate, getScssTemplate } from "./config/scss-template";
import { getJsxAlertTemplate, getJsxTemplate } from "./config/jsx-template";
import { getText, saveFile } from "./util/file";
import CommitInputType from "./config/commit-input";
import { QuickPickOptions } from "vscode";
import { getCurrentDate } from "./util/time";
import { GitExtension } from "./types/git";
import CommitType from "./config/commit-type";
import sendEmail from "./util/sendEmail";
export interface GitMessage {
  icon: string;
  type: string;
  message: string;
}
export function activate(context: vscode.ExtensionContext) {
  //提交信息配置
  const messageConfig: GitMessage = {
    icon: "",
    type: "",
    message: "",
  };

  //选择器
  const commitDetailQuickPickOptions: QuickPickOptions = {
    matchOnDescription: true,
    matchOnDetail: true,
    ignoreFocusOut: true,
  };
  //获取是否在git扩展内 Gets whether it is in the git extension
  function getGitExtension() {
    const vscodeGit =
      vscode.extensions.getExtension<GitExtension>("vscode.git");
    const gitExtension = vscodeGit && vscodeGit.exports;
    return gitExtension;
  }
  const gitExtension = getGitExtension();

  if (!gitExtension?.enabled) {
    vscode.window.showErrorMessage(
      "Git extensions are not currently enabled, please try again after enabled!"
    );
    return false;
  }
  //获取当前的 git仓库实例 Get git repo instance
  let repo: any = gitExtension.getAPI(1).repositories[0];

  // 创建普通组件
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.addComponents", (uri) => {
      const length = uri.path.length;
      const path = uri.path.slice(1, length).replace(/\//g, "\\");
      const pathArray = path.split("\\");
      const componentName = pathArray[pathArray.length - 1];

      // 获取用户名
      const configuration = vscode.workspace.getConfiguration();
      const author = configuration.get("author_name", "admin");

      // 写入文件
      saveFile(path, "index.tsx", getJsxTemplate(author, componentName));
      saveFile(path, "style.scss", getScssTemplate(author));
    })
  );

  // 创建Alert组件
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.addAlert", (uri) => {
      const length = uri.path.length;
      const path = uri.path.slice(1, length).replace(/\//g, "\\");
      const pathArray = path.split("\\");
      const componentName = pathArray[pathArray.length - 1];

      // 获取用户名
      const configuration = vscode.workspace.getConfiguration();
      const author = configuration.get("author_name", "admin");

      // 写入文件
      saveFile(path, "index.tsx", getJsxAlertTemplate(author, componentName));
      saveFile(path, "style.scss", getScssAlertTemplate(author, componentName));
    })
  );

  // 生成内容
  const generaGit = () => {
    vscode.commands.executeCommand("workbench.view.scm");
    repo.inputBox.value = `${messageConfig.icon} ${
      messageConfig.message
    } ${getCurrentDate("/")}`;
  };
  // 输入提交的内容
  const recurInputMessage = () => {
    vscode.window.showInputBox(CommitInputType).then((value) => {
      messageConfig.message = value ?? "";
      generaGit();
    });
  };
  // git 提交
  context.subscriptions.push;
  vscode.commands.registerCommand("extension.showGitCommit", (uri?) => {
    if (uri) {
      //如果有多个repo 寻找当前的 进行填充 If there are multiple repos looking for the current to populate
      repo = gitExtension.getAPI(1).repositories.find((repo) => {
        return repo.rootUri.path === uri._rootUri.path;
      });
    }
    commitDetailQuickPickOptions.placeHolder =
      "搜索 Git 提交类型(Search Commit Type)";

    vscode.window
      .showQuickPick(CommitType, commitDetailQuickPickOptions)
      .then((select) => {
        let label = (select && select.label) || "";
        const icon = (select && select.icon) || "";
        if (typeof icon === "string" && icon.length > 0) {
          label = label.split(" ")[1];
        }
        messageConfig.type = label;
        messageConfig.icon = icon;
        if (label !== "") {
          recurInputMessage();
        }
      });
  });

  // 发送邮件
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.sendEmail", (uri) => {
      const length = uri.path.length;
      const path = uri.path.slice(1, length).replace(/\//g, "\\");
      const html = getText(path);
      sendEmail(html);
    })
  );

  // scss提示
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider("scss", {
      provideCompletionItems(document, position) {
        // 获取项目路径
        const length = document.uri.path.length;
        const _path = document.uri.path.slice(1, length).replace(/\//g, "\\");
        let constantPath = "";
        const match = _path.match(/(\S*)src/);
        if (!match) {
          return [];
        }
        constantPath = match[0] + "\\Constant";
        // 处理color
        const colorFile = fs.readFileSync(`${constantPath}\\color.scss`, {
          encoding: "utf-8",
        });
        const arr: Array<vscode.CompletionItem> = [];
        let colorStr = colorFile.replace(
          /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g,
          ""
        );
        const colorArray = colorStr.replace(/\r\n/g, "").split(";");
        colorArray.map((item) => {
          const completionItem = new vscode.CompletionItem(
            `${item.split(":")[0]}`
          );
          arr.push(completionItem);
        });
        // 处理font
        const fontFile = fs.readFileSync(`${constantPath}\\font.scss`, {
          encoding: "utf-8",
        });

        let fontStr = fontFile
          .replace(
            /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g,
            ""
          )
          .replace(/\r\n/g, "");
        const fontArray = fontStr.split(";");
        fontArray.map((item) => {
          if (item.includes("$fs")) {
            const completionItem = new vscode.CompletionItem(
              item.split(":")[0]
            );
            arr.push(completionItem);
          }
          if (item.includes("@mixin")) {
            const newItem = item.replace(/\}/g, "").replace(/@mixin/, "");
            const completionItem = new vscode.CompletionItem(
              `${newItem.split("{")[0].trim()}()`
            );
            arr.push(completionItem);
          }
        });
        return arr;
      },
    })
  );
}
