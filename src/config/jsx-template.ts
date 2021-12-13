import { getCurrentDate } from "../util/time";

// 当前时间
const date = getCurrentDate("-");

const jsxTemplate = [
  "/**",
  "* @file",
  `* @date ${date}`,
  "* @author $1",
  `* @lastModify $1 ${date}`,
  "*/",
  "/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */",
  "/** This section will include all the necessary dependence for this tsx file */",
  "import React from 'react';",
  "import style from './style.scss';",
  "/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */",
  "/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */",
  "/** This section will include all the interface for this tsx file */",
  "/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */",
  "/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */",
  "const $2 = (): JSX.Element => {",
  "/* <------------------------------------ **** STATE START **** ------------------------------------ */",
  "/************* This section will include this component HOOK function *************/",
  "/* <------------------------------------ **** STATE END **** ------------------------------------ */",
  "/* <------------------------------------ **** PARAMETER START **** ------------------------------------ */",
  "/************* This section will include this component parameter *************/",
  "/* <------------------------------------ **** PARAMETER END **** ------------------------------------ */",
  "/* <------------------------------------ **** FUNCTION START **** ------------------------------------ */",
  "/************* This section will include this component general function *************/",
  "/* <------------------------------------ **** FUNCTION END **** ------------------------------------ */",
  "return (",
  "<div>",
  "</div>",
  ");",
  "};",
  "export default $2;",
  "/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */",
];

export const getJsxTemplate = (author: string, componentName: string) => {
  return jsxTemplate
    .join("\n")
    .replace(/\$1/g, author)
    .replace(/\$2/g, componentName);
};
