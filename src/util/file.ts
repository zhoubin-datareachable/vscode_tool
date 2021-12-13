import * as vscode from "vscode";
import * as fs from "fs";
/**
 * 保存文件
 */
const saveFile = (path: string, fileName: string, content: string) => {
  fs.writeFile(`${path}/${fileName}`, content, function (err) {
    if (err) {
      vscode.window.showInformationMessage(`创建${fileName}失败`);
      return;
    }
    vscode.window.showInformationMessage("创建成功");
  });
};

export { saveFile };
