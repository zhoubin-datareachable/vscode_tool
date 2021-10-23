import * as vscode from "vscode";
import * as fs from "fs";
import { ToolTree } from "./tree/tool";
import { Uri, WebviewPanel } from "vscode";
import * as path from "path";
import { DocsTree } from "./tree/docs";
import { CollectionTree } from "./tree/collection";

const getCurrentDate = function () {
  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
  const day = date.getDate() <= 9 ? `0${date.getDate()}` : `${date.getDate()}`;

  return `${year}-${month}-${day}`;
};

const getScssTemplate = function (authorName: string) {
  const scssTemplate = `
/**
* @file 
* @date ${getCurrentDate()}
* @author ${authorName} 
* @lastModify ${authorName}  ${getCurrentDate()}
*/
/* <------------------------------------ **** CONSTANT IMPORT START **** ------------------------------------ */
/** Import all the reference constant after this line */
@import '~/Constant/breakPoint.scss';
@import '~/Constant/font.scss';
@import '~/Constant/color.scss';
/* <------------------------------------ **** CONSTANT IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** SECTION1 MIXIN START **** ------------------------------------ */
/** The demo mixin is ..........*/
@mixin demo {}
/* <------------------------------------ **** SECTION1 MIXIN END **** ------------------------------------ */
/* <------------------------------------ **** ONE START **** ------------------------------------ */
/* <------------------------------------ **** ONE END **** ------------------------------------ */
`;
  return scssTemplate;
};

const getReactTemplate = function (authorName: string, componentName: string) {
  const reactTemplate = `
/**
* @file
* @date ${getCurrentDate()}
* @author ${authorName}
* @lastModify ${authorName} ${getCurrentDate()}
*/
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from 'react';
import style from './style.scss'
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const ${componentName} = (): JSX.Element => {
/* <------------------------------------ **** STATE START **** ------------------------------------ */
/************* This section will include this component HOOK function *************/
/* <------------------------------------ **** STATE END **** ------------------------------------ */
/* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
/************* This section will include this component parameter *************/
/* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
/************* This section will include this component general function *************/
/* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
return (
  <div className="${componentName.replace(/^\S/, (s) =>
    s.toLocaleLowerCase()
  )}_container"></div>
);
};
export default ${componentName};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
`;
  return reactTemplate;
};

let currentSrc = "";
let panel: WebviewPanel | null;
// 写入文件
const writeFile = (
  path: string,
  aName: string,
  componentName: string,
  type: boolean = true
): void => {
  // 写入style.scss
  fs.writeFile(
    `${path}/${type ? "style.scss" : "style.module.scss"}`,
    getScssTemplate(aName),
    function (err) {
      if (err) {
        vscode.window.showInformationMessage("创建失败");
        return;
      }
      vscode.window.showInformationMessage("创建成功");
    }
  );

  // 写入index.ts
  fs.writeFile(
    `${path}/index.tsx`,
    getReactTemplate(aName, componentName),
    function (err) {
      if (err) {
        vscode.window.showInformationMessage("创建失败");
        return;
      }
      vscode.window.showInformationMessage("创建成功");
    }
  );
};
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // 注册provider
  vscode.window.registerTreeDataProvider("commonTool", new ToolTree());
  vscode.window.registerTreeDataProvider("docs", new DocsTree());
  vscode.window.registerTreeDataProvider("collection", new CollectionTree());

  vscode.commands.registerCommand("tool.openSite", (params) => {
    openInWebview(params, context);
  });

  // 创建普通组件
  context.subscriptions.push(
    vscode.commands.registerCommand("react_tool.addComponents", (uri) => {
      const length = uri.path.length;
      const path = uri.path.slice(1, length).replace(/\//g, "\\");
      const pathArray = path.split("\\");
      const componentName = pathArray[pathArray.length - 1];

      // 获取用户名
      const configuration = vscode.workspace.getConfiguration();
      const aName = configuration.get("author_name", "admin");

      // 写入文件
      writeFile(path, aName, componentName);
    })
  );

  // 创建组件库组件
  context.subscriptions.push(
    vscode.commands.registerCommand("react_tool.addModuleComponents", (uri) => {
      const length = uri.path.length;
      const path = uri.path.slice(1, length).replace(/\//g, "\\");
      const pathArray = path.split("\\");
      const componentName = pathArray[pathArray.length - 1];

      // 获取用户名
      const configuration = vscode.workspace.getConfiguration();
      const aName = configuration.get("author_name", "admin");

      // 写入文件
      writeFile(path, aName, componentName, false);
    })
  );
}

function openInWebview(
  params: { title: string; icon: any; url: string },
  context: vscode.ExtensionContext
) {
  // 创建webview
  if (!panel) {
    panel = vscode.window.createWebviewPanel(
      "webview", // viewType
      "", // 视图标题
      vscode.ViewColumn.One,
      {
        enableFindWidget: true,
        enableCommandUris: true,
        enableScripts: true, // 启用JS，默认禁用
        retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
      }
    );
  }
  panel.onDidDispose(() => {
    panel = null;
    currentSrc = "";
  });
  panel.title = params.title || "表情";
  panel.iconPath = vscode.Uri.file(
    path.join(
      __dirname,
      "../resources",
      params.icon || "icon_" + "tool" + ".svg"
    )
  );

  if (params.url !== currentSrc) {
    currentSrc = params.url;
    panel.webview.html = getWebViewContent("/view/" + "tool.html");
    panel.webview.postMessage({ command: "load", params: params });
  }

  panel.reveal();
}

function getWebViewContent(templatePath: string) {
  const resourcePath = path.join(__filename, "../../resources", templatePath);
  console.log(resourcePath);

  const dirPath = path.dirname(resourcePath);
  let html = `<html>
  <head>
    <style>
      * {
        box-sizing: border-box;
      }
      body,
      html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        position: relative;
      }
    </style>
    <script>
      var params;

      window.addEventListener("message", (event) => {
        const message = event.data;
        if (message.command == "load") {
          params = message.params;

          document.getElementById("ifrDom").onload = function () {
            log("iframeOnLoaded");
          };
          document.getElementById("ifrDom").src = message.params.url;
          document.getElementById("description").innerText =
            message.params.description;
        }
      });
    </script>
  </head>
  <body>
    <div
      style="width: 100%; height: 100%; display: flex; flex-direction: column"
    >
      <iframe
        id="ifrDom"
        src=""
        width="100%"
        style="flex: 1; width: 100%"
        frameborder="no"
        border="0"
      ></iframe>
    </div>
  </body>
</html>`;
  html = html.replace(
    /(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g,
    (m, $1, $2) => {
      if ($2.indexOf("https://") < 0) {
        return (
          $1 +
          vscode.Uri.file(path.resolve(dirPath, $2))
            .with({ scheme: "vscode-resource" })
            .toString() +
          '"'
        );
      } else {
        return $1 + $2 + '"';
      }
    }
  );
  return html;
}
// this method is called when your extension is deactivated
export function deactivate() {}
