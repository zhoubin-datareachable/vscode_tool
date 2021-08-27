import * as vscode from "vscode";
import * as fs from "fs";

const getScssTemplate = function (authorName: string) {
  const scssTemplate = `
/**
* @file 
* @date 2021-08-26
* @author ${authorName} 
* @lastModify ${authorName}  2021-08-26
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
/* <--------------------------- * SECTION1 * --------------------------- */
/* <--------------------------- * SECTION1 * --------------------------- */
`;
  return scssTemplate;
};

const getReactTemplate = function (authorName: string, componentName: string) {
  const reactTemplate = `
/**
* @file
* @date 2021-08-26
* @author ${authorName}
* @lastModify ${authorName} 2021-08-26
*/
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from 'react';
import { Row, Col } from 'antd';
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
<Row>
</Row>
);
};
export default ${componentName};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
`;
  return reactTemplate;
};

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

// this method is called when your extension is deactivated
export function deactivate() {}
