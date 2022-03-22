import { lowerFirst } from "../util/str";
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

const scssAlertTemplate = [
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
  ".$2_container {",
  "  position: relative;",
  "  padding: 3.2rem 2.4rem;",
  "  width: 42rem;",
  "  height: 25.2rem;",
  "}",
  ".$2_title {",
  "    @include h_2();",
  "    color: $neutral_700;",
  "}",
  ".$2_btn {",
  "    position: absolute;",
  "    bottom: 1.6rem;",
  "    right: 2.4rem;",
  "    button {",
  "        &:nth-of-type(1) {",
  "            color: $primary_600 !important;",
  "        }",
  "        &:nth-of-type(2) {",
  "            background: $primary_600;",
  "            box-shadow: 0px 2px 6px rgba(26, 26, 26, 0.06), 0px 3px 15px rgba(26, 26, 26, 0.1);",
  "            border-radius: 0.6rem;",
  "        }",
  "    }",
  "}",
  "/* <--------------------------- * SECTION1 * --------------------------- */",
];
export const getScssAlertTemplate = (author: string, componentName: string) => {
  return scssAlertTemplate
    .join("\n")
    .replace(/\$1/g, author)
    .replace(/\$2/g, lowerFirst(componentName));
};
