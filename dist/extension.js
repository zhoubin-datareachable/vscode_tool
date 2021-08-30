(()=>{"use strict";var e={693:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.docs=t.commonTools=void 0,t.commonTools=[{title:"gitmoji",url:"https://gitmoji.dev/",description:"git表情",icon:"icon_tool.svg"},{title:"正则表达式",url:"https://c.runoob.com/front-end/854",description:"正则表达式",icon:"icon_tool.svg"}],t.docs=[{title:"ES6入门教程",url:"https://es6.ruanyifeng.com/",description:"es6",icon:"icon_tool.svg"},{title:"vue 2.0",url:"https://cn.vuejs.org/v2/guide/",description:"vue 2.0",icon:"icon_tool.svg"},{title:"vue 3.0",url:"https://www.javascriptc.com/vue3js/guide/introduction.html",description:"vue 3.0",icon:"icon_tool.svg"},{title:"react官方文档",url:"https://react.docschina.org/docs/getting-started.html",description:"react官方文档",icon:"icon_tool.svg"},{title:"type script",url:"https://ts.xcatliu.com/introduction/what-is-typescript.html",description:"type script",icon:"icon_tool.svg"},{title:"sass",url:"https://www.sass.hk/docs/",description:"sass",icon:"icon_tool.svg"},{title:"webpack",url:"https://webpack.docschina.org/",description:"webpack",icon:"icon_tool.svg"},{title:"three.js",url:"http://www.webgl3d.cn/threejs/docs/#api/zh/animation/AnimationAction",description:"three.js",icon:"icon_tool.svg"},{title:"uni-app",url:"https://uniapp.dcloud.io/",description:"uni-app",icon:"icon_tool.svg"},{title:"echarts",url:"https://echarts.apache.org/zh/tutorial.html",description:"echarts",icon:"icon_tool.svg"},{title:"vite",url:"https://cn.vitejs.dev/guide/",description:"vite",icon:"icon_tool.svg"},{title:"eslint",url:"https://cn.eslint.org/docs/user-guide/configuring",description:"eslint",icon:"icon_tool.svg"},{title:"babel",url:"https://babel.docschina.org/docs/en/",description:"babel",icon:"icon_tool.svg"},{title:"docker",url:"http://www.dockerinfo.net/document",description:"docker",icon:"icon_tool.svg"},{title:"java",url:"https://how2j.cn/",description:"java",icon:"icon_tool.svg"},{title:"mybatis-plus",url:"https://mp.baomidou.com/guide/",description:"mybatis-plus",icon:"icon_tool.svg"}]},945:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CollectionTree=void 0;const n=o(549),i=o(622);t.CollectionTree=class{constructor(){}getTreeItem(e){return e}getChildren(e){const t=[],o=n.workspace.getConfiguration().get("collection",[]),i=[];for(let e=0;e<o.length;e++)i.push({title:o[e].title,url:o[e].url,description:o[e].title,icon:"icon_tool.svg"});return i.forEach((e=>{t.push(new s(e.title,e.icon,e.description,{title:"",command:"tool.openSite",arguments:[e]}))})),t}};class s extends n.TreeItem{constructor(e,t,o,s){super(e,n.TreeItemCollapsibleState.None),this.tooltip=o,this.iconPath=i.join(__filename,"../../","resources",t),this.command=s}}},97:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DocsTree=void 0;const n=o(549),i=o(622),s=o(693);t.DocsTree=class{constructor(){}getTreeItem(e){return e}getChildren(e){const t=[];return s.docs.forEach((e=>{t.push(new r(e.title,e.icon,e.description,{title:"",command:"tool.openSite",arguments:[e]}))})),t}};class r extends n.TreeItem{constructor(e,t,o,s){super(e,n.TreeItemCollapsibleState.None),this.tooltip=o,this.iconPath=i.join(__filename,"../../resources",t),this.command=s}}},528:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ToolTree=void 0;const n=o(549),i=o(622),s=o(693);t.ToolTree=class{constructor(){}getTreeItem(e){return e}getChildren(e){const t=[];return s.commonTools.forEach((e=>{t.push(new r(e.title,e.icon,e.description,{title:"",command:"tool.openSite",arguments:[e]}))})),t}};class r extends n.TreeItem{constructor(e,t,o,s){super(e,n.TreeItemCollapsibleState.None),this.tooltip=o,this.iconPath=i.join(__filename,"../../resources",t),this.command=s}}},747:e=>{e.exports=require("fs")},622:e=>{e.exports=require("path")},549:e=>{e.exports=require("vscode")}},t={};function o(n){var i=t[n];if(void 0!==i)return i.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,o),s.exports}var n={};(()=>{var e=n;Object.defineProperty(e,"__esModule",{value:!0}),e.deactivate=e.activate=void 0;const t=o(549),i=o(747),s=o(528),r=o(622),c=o(97),l=o(945);let a,d="";const p=(e,o,n,s=!0)=>{var r;i.writeFile(`${e}/${s?"style.scss":"style.module.scss"}`,`\n/**\n* @file \n* @date 2021-08-26\n* @author ${r=o} \n* @lastModify ${r}  2021-08-26\n*/\n/* <------------------------------------ **** CONSTANT IMPORT START **** ------------------------------------ */\n/** Import all the reference constant after this line */\n@import '~/Constant/breakPoint.scss';\n@import '~/Constant/font.scss';\n@import '~/Constant/color.scss';\n/* <------------------------------------ **** CONSTANT IMPORT END **** ------------------------------------ */\n/* <------------------------------------ **** SECTION1 MIXIN START **** ------------------------------------ */\n/** The demo mixin is ..........*/\n@mixin demo {}\n/* <------------------------------------ **** SECTION1 MIXIN END **** ------------------------------------ */\n/* <--------------------------- * SECTION1 * --------------------------- */\n/* <--------------------------- * SECTION1 * --------------------------- */\n`,(function(e){e?t.window.showInformationMessage("创建失败"):t.window.showInformationMessage("创建成功")})),i.writeFile(`${e}/index.tsx`,function(e,t){return`\n/**\n* @file\n* @date 2021-08-26\n* @author ${e}\n* @lastModify ${e} 2021-08-26\n*/\n/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */\n/** This section will include all the necessary dependence for this tsx file */\nimport React, { useState } from 'react';\nimport { Row, Col } from 'antd';\n/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */\n/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */\n/** This section will include all the interface for this tsx file */\n/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */\n/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */\nconst ${t} = (): JSX.Element => {\n/* <------------------------------------ **** STATE START **** ------------------------------------ */\n/************* This section will include this component HOOK function *************/\n/* <------------------------------------ **** STATE END **** ------------------------------------ */\n/* <------------------------------------ **** PARAMETER START **** ------------------------------------ */\n/************* This section will include this component parameter *************/\n/* <------------------------------------ **** PARAMETER END **** ------------------------------------ */\n/* <------------------------------------ **** FUNCTION START **** ------------------------------------ */\n/************* This section will include this component general function *************/\n/* <------------------------------------ **** FUNCTION END **** ------------------------------------ */\nreturn (\n<Row>\n</Row>\n);\n};\nexport default ${t};\n/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */\n`}(o,n),(function(e){e?t.window.showInformationMessage("创建失败"):t.window.showInformationMessage("创建成功")}))};e.activate=function(e){t.window.registerTreeDataProvider("commonTool",new s.ToolTree),t.window.registerTreeDataProvider("docs",new c.DocsTree),t.window.registerTreeDataProvider("collection",new l.CollectionTree),t.commands.registerCommand("tool.openSite",(e=>{!function(e,o){a||(a=t.window.createWebviewPanel("webview","",t.ViewColumn.One,{enableFindWidget:!0,enableCommandUris:!0,enableScripts:!0,retainContextWhenHidden:!0})),a.onDidDispose((()=>{a=null,d=""})),a.title=e.title||"表情",a.iconPath=t.Uri.file(r.join(__dirname,"../resources",e.icon||"icon_tool.svg")),e.url!==d&&(d=e.url,a.webview.html=function(e){const o=r.join(__filename,"../../resources","/view/tool.html");console.log(o);const n=r.dirname(o);let i='<html>\n  <head>\n    <style>\n      * {\n        box-sizing: border-box;\n      }\n      body,\n      html {\n        margin: 0;\n        padding: 0;\n        width: 100%;\n        height: 100%;\n        position: relative;\n      }\n    </style>\n    <script>\n      var params;\n\n      window.addEventListener("message", (event) => {\n        const message = event.data;\n        if (message.command == "load") {\n          params = message.params;\n\n          document.getElementById("ifrDom").onload = function () {\n            log("iframeOnLoaded");\n          };\n          document.getElementById("ifrDom").src = message.params.url;\n          document.getElementById("description").innerText =\n            message.params.description;\n        }\n      });\n    <\/script>\n  </head>\n  <body>\n    <div\n      style="width: 100%; height: 100%; display: flex; flex-direction: column"\n    >\n      <iframe\n        id="ifrDom"\n        src=""\n        width="100%"\n        style="flex: 1; width: 100%"\n        frameborder="no"\n        border="0"\n      ></iframe>\n    </div>\n  </body>\n</html>';return i=i.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g,((e,o,i)=>i.indexOf("https://")<0?o+t.Uri.file(r.resolve(n,i)).with({scheme:"vscode-resource"}).toString()+'"':o+i+'"')),i}(),a.webview.postMessage({command:"load",params:e})),a.reveal()}(e)})),e.subscriptions.push(t.commands.registerCommand("react_tool.addComponents",(e=>{const o=e.path.length,n=e.path.slice(1,o).replace(/\//g,"\\"),i=n.split("\\"),s=i[i.length-1],r=t.workspace.getConfiguration().get("author_name","admin");p(n,r,s)}))),e.subscriptions.push(t.commands.registerCommand("react_tool.addModuleComponents",(e=>{const o=e.path.length,n=e.path.slice(1,o).replace(/\//g,"\\"),i=n.split("\\"),s=i[i.length-1],r=t.workspace.getConfiguration().get("author_name","admin");p(n,r,s,!1)})))},e.deactivate=function(){}})(),module.exports=n})();