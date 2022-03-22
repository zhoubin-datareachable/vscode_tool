import { lowerFirst } from "../util/str";
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

const jsxAlertTemplate = [
  "/**",
  "* @file",
  `* @date ${date}`,
  "* @author $1",
  `* @lastModify $1 ${date}`,
  "*/",
  "/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */",
  "/** This section will include all the necessary dependence for this tsx file */",
  "import style from './style.scss';",
  "import { Button } from '@datareachable/dr_front_componentlibrary';",
  "/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */",
  "/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */",
  "/** This section will include all the interface for this tsx file */",
  "interface $2Props {",
  "    handleCancel?: () => void;",
  "}",
  "/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */",
  "/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */",
  "const $2: React.FC<$2Props> = ({ handleCancel }): JSX.Element =>  {",
  "/* <------------------------------------ **** STATE START **** ------------------------------------ */",
  "/************* This section will include this component HOOK function *************/",
  "/* <------------------------------------ **** STATE END **** ------------------------------------ */",
  "/* <------------------------------------ **** PARAMETER START **** ------------------------------------ */",
  "/************* This section will include this component parameter *************/",
  "/* <------------------------------------ **** PARAMETER END **** ------------------------------------ */",
  "/* <------------------------------------ **** FUNCTION START **** ------------------------------------ */",
  "/************* This section will include this component general function *************/",
  "/** confirm */",
  "const handleConfirm = () => {",
  "    //",
  "};",
  "/* <------------------------------------ **** FUNCTION END **** ------------------------------------ */",
  "return (",
  "      <div className={style.$3_container}>",
  "         <div className={style.$3_title}>Title</div>",
  "         <div className={style.$3_btn}>",
  "             <Button",
  "                 height='3.2rem'",
  "                 label='Cancel'",
  "                 size='big'",
  "                 type='primary'",
  "                 width='9.5rem'",
  "                 onClick={handleCancel}",
  "             />",
  "             <Button",
  "                 height='3.2rem'",
  "                 label='Confirm'",
  "                 size='small'",
  "                 type='primary'",
  "                 width='9.5rem'",
  "                 onClick={handleConfirm}",
  "             />",
  "         </div>",
  "     </div>",
  " );",
  "export default $2;",
  "/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */",
];

export const getJsxAlertTemplate = (author: string, componentName: string) => {
  return jsxAlertTemplate
    .join("\n")
    .replace(/\$1/g, author)
    .replace(/\$2/g, componentName)
    .replace(/\$3/g, lowerFirst(componentName));
};
