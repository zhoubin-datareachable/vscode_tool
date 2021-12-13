import { getCurrentDate } from "../util/time";

// 当前时间
const date = getCurrentDate("-");

const scssTemplate = [
  "/**",
  "* @file",
  `* @date ${date}`,
  "* @author $1",
  `* @lastModify $1 ${date}`,
  "*/",
  "/* <------------------------------------ **** CONSTANT IMPORT START **** ------------------------------------ */",
  "/** Import all the reference constant after this line */",
  "@import '~/Constant/breakPoint.scss';",
  "@import '~/Constant/font.scss';",
  "@import '~/Constant/color.scss';",
  "/* <------------------------------------ **** CONSTANT IMPORT END **** ------------------------------------ */",
  "/* <------------------------------------ **** SECTION1 MIXIN START **** ------------------------------------ */",
  "/** The demo mixin is ..........*/",
  "@mixin demo {}",
  "/* <------------------------------------ **** SECTION1 MIXIN END **** ------------------------------------ */",
  "/* <--------------------------- * SECTION1 * --------------------------- */",
  "/* <--------------------------- * SECTION1 * --------------------------- */",
];

export const getScssTemplate = (author: string) => {
  return scssTemplate.join("\n").replace(/\$1/g, author);
};
