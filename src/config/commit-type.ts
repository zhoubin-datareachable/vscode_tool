import { workspace, QuickPickItem } from "vscode";

/**
 * @description git commit 提交类型
 */
export interface CommitType extends QuickPickItem {
  icon?: string;
  key?: string;
}
//是否展现 Emoji图标 show Emoji or not
const isShowEmoji = workspace
  .getConfiguration("GitCommitPlugin")
  .get<boolean>("ShowEmoji");
//新增的自定义commit type add custom Commit Type
const customCommitType = workspace
  .getConfiguration("GitCommitPlugin")
  .get<boolean>("CustomCommitType");

let commitType: Array<CommitType> = [
  { label: "art", key: "art", detail: "改进代码的结构/格式", icon: "🎨" },
  { label: "zap", key: "zap", detail: "提高性能", icon: "⚡️" },
  { label: "fire", key: "fire", detail: "删除代码或文件", icon: "🔥" },
  { label: "bug", key: "bug", detail: "修复一个错误", icon: "🐛" },
  {
    label: "ambulance",
    key: "ambulance",
    detail: "关键修补程序",
    icon: "🚑️",
  },
  { label: "sparkles", key: "sparkles", detail: "介绍新功能", icon: "✨" },
  { label: "memo", key: "memo", detail: "添加或更新文档", icon: "📝" },
  { label: "rocket", key: "rocket", detail: "部署东西", icon: "🚀" },
  {
    label: "lipstick",
    key: "lipstick",
    detail: "添加或更新 UI 和样式文件",
    icon: "💄",
  },
  { label: "tada", key: "tada", detail: "开始一个项目", icon: "🎉" },
  {
    label: "white_check_mark",
    key: "white_check_mark",
    detail: "添加、更新或通过测试",
    icon: "✅",
  },
  { label: "lock", key: "lock", detail: "修复安全问题", icon: "🔒️" },
  { label: "bookmark", key: "bookmark", detail: "发布/版本标签", icon: "🔖" },
  {
    label: "rotating_light",
    key: "rotating_light",
    detail: "修复编译器/linter 警告",
    icon: "🚨",
  },
  {
    label: "construction",
    key: "construction",
    detail: "工作正在进行中",
    icon: "🚧",
  },
  {
    label: "green_heart",
    key: "green_heart",
    detail: "修复 CI 构建",
    icon: "💚",
  },
  {
    label: "arrow_down",
    key: "arrow_down",
    detail: "降级依赖项",
    icon: "⬇️",
  },
  { label: "arrow_up", key: "arrow_up", detail: "升级依赖", icon: "⬆️" },
  {
    label: "pushpin",
    key: "pushpin",
    detail: "将依赖项固定到特定版本",
    icon: "📌",
  },
  {
    label: "construction_worker",
    key: "construction_worker",
    detail: "添加或更新 CI 构建系统",
    icon: "👷",
  },
  {
    label: "chart_with_upwards_trend",
    key: "chart_with_upwards_trend",
    detail: "添加或更新分析或跟踪代码",
    icon: "📈",
  },
  { label: "recycle", key: "recycle", detail: "重构代码", icon: "♻️" },
  {
    label: "heavy_plus_sign",
    key: "heavy_plus_sign",
    detail: "添加依赖项",
    icon: "➕",
  },
  {
    label: "heavy_minus_sign",
    key: "heavy_minus_sign",
    detail: "删除依赖项",
    icon: "➖",
  },
  { label: "wrench", key: "wrench", detail: "添加或更新配置文件", icon: "🔧" },
  { label: "hammer", key: "hammer", detail: "添加或更新开发脚本", icon: "🔨" },
  {
    label: "globe_with_meridians",
    key: "globe_with_meridians",
    detail: "国际化和本地化",
    icon: "🌐",
  },
  { label: "pencil2", key: "pencil2", detail: "修正错别字", icon: "✏️" },
  { label: "poop", key: "poop", detail: "编写需要改进的糟糕代码", icon: "💩" },
  { label: "rewind", key: "rewind", detail: "还原更改", icon: "⏪️" },
  {
    label: "twisted_rightwards_arrows",
    key: "twisted_rightwards_arrows",
    detail: "合并分支",
    icon: "🔀",
  },
  {
    label: "package",
    key: "package",
    detail: "添加或更新已编译的文件或包",
    icon: "📦️",
  },
  {
    label: "alien",
    key: "alien",
    detail: "由于外部 API 更改而更新代码",
    icon: "👽️",
  },
  {
    label: "truck",
    key: "truck",
    detail: "移动或重命名资源（例如：文件、路径、路由）",
    icon: "🚚",
  },
  {
    label: "page_facing_up",
    key: "page_facing_up",
    detail: "添加或更新许可证",
    icon: "📄",
  },
  { label: "boom", key: "boom", detail: "引入重大变化", icon: "💥" },
  { label: "bento", key: "bento", detail: "添加或更新资产", icon: "🍱" },
  {
    label: "wheelchair",
    key: "wheelchair",
    detail: "提高可访问性",
    icon: "♿️",
  },
  {
    label: "bulb",
    key: "bulb",
    detail: "在源代码中添加或更新注释",
    icon: "💡",
  },
  { label: "beers", key: "beers", detail: "醉酒写代码", icon: "🍻" },
  {
    label: "speech_balloon",
    key: "speech_balloon",
    detail: "添加或更新文本和文字",
    icon: "💬",
  },
  {
    label: "card_file_box",
    key: "card_file_box",
    detail: "执行与数据库相关的更改",
    icon: "🗃️",
  },
  {
    label: "loud_sound",
    key: "loud_sound",
    detail: "添加或更新日志",
    icon: "🔊",
  },
  { label: "mute", key: "mute", detail: "删除日志", icon: "🔇" },
  {
    label: "busts_in_silhouette",
    key: "busts_in_silhouette",
    detail: "添加或更新贡献者",
    icon: "👥",
  },
  {
    label: "children_crossing",
    key: "children_crossing",
    detail: "改善用户体验/可用性",
    icon: "🚸",
  },
  {
    label: "building_construction",
    key: "building_construction",
    detail: "进行架构更改",
    icon: "🏗️",
  },
  { label: "iphone", key: "iphone", detail: "从事响应式设计", icon: "📱" },
  {
    label: "clown_face",
    key: "clown_face",
    detail: "嘲笑的东西",
    icon: "🤡",
  },
  { label: "egg", key: "egg", detail: "添加或更新复活节彩蛋", icon: "🥚" },
  {
    label: "see_no_evil",
    key: "see_no_evil",
    detail: "添加或更新 .gitignore 文件",
    icon: "🙈",
  },
  {
    label: "camera_flash",
    key: "camera_flash",
    detail: "添加或更新快照",
    icon: "📸",
  },
  { label: "alembic", key: "alembic", detail: "进行实验", icon: "⚗️" },
  { label: "mag", key: "mag", detail: "改进搜索引擎优化", icon: "🔍️" },
  { label: "label", key: "label", detail: "添加或更新类型", icon: "🏷️" },
  {
    label: "seedling",
    key: "seedling",
    detail: "添加或更新种子文件",
    icon: "🌱",
  },
  {
    label: "triangular_flag_on_post",
    key: "triangular_flag_on_post",
    detail: "添加、更新或删除功能标志",
    icon: "🚩",
  },
  { label: "goal_net", key: "goal_net", detail: "捕捉错误", icon: "🥅" },
  { label: "dizzy", key: "dizzy", detail: "添加或更新动画和过渡", icon: "💫" },
  {
    label: "wastebasket",
    key: "wastebasket",
    detail: "弃用需要清理的代码",
    icon: "🗑️",
  },
  {
    label: "passport_control",
    key: "passport_control",
    detail: "处理与授权、角色和权限相关的代码",
    icon: "🛂",
  },
  {
    label: "adhesive_bandage",
    key: "adhesive_bandage",
    detail: "对非关键问题的简单修复",
    icon: "🩹",
  },
  {
    label: "monocle_face",
    key: "monocle_face",
    detail: "数据探索/检查",
    icon: "🧐",
  },
  { label: "coffin", key: "coffin", detail: "删除死代码", icon: "⚰️" },
  {
    label: "test_tube",
    key: "test_tube",
    detail: "添加失败的测试",
    icon: "🧪",
  },
  {
    label: "necktie",
    key: "necktie",
    detail: "添加或更新业务逻辑",
    icon: "👔",
  },
];

if (Array.isArray(customCommitType)) {
  customCommitType.forEach((item) => {
    let label = "",
      icon = "",
      detail = "";
    if (typeof item === "string") {
      label = detail = item;
    }
    const resultType = {
      label,
      icon,
      detail,
    };
    if (Object.prototype.toString.call(item) === "[object Object]") {
      if (Reflect.has(item, "label")) {
        resultType.label = item.label;
      } else {
        Reflect.deleteProperty(resultType, "label");
      }
      if (Reflect.has(item, "detail")) {
        resultType.detail = item.detail;
      } else {
        Reflect.deleteProperty(resultType, "detail");
      }
      if (Reflect.has(item, "icon")) {
        resultType.icon = item.icon;
      } else {
        Reflect.deleteProperty(resultType, "icon");
      }
    }

    const target = commitType.find(
      (type) =>
        typeof item.key === "string" &&
        item.key.length > 0 &&
        type.key === item.key
    );

    if (target !== undefined) {
      Object.assign(target, resultType);
    } else {
      commitType.unshift(resultType);
    }
  });
}
if (!isShowEmoji) {
  commitType.forEach((commitType) => {
    commitType.icon = "";
  });
}

if (isShowEmoji) {
  commitType.forEach((item) => {
    // If there is an icon display
    if (typeof item.icon === "string" && item.icon.length > 0) {
      item.label = `${item.icon} ${item.label}`;
    }
  });
}

export default commitType;
