import {
  TreeItem,
  TreeDataProvider,
  Event,
  ProviderResult,
  TreeItemCollapsibleState,
  Command,
  workspace,
} from "vscode";

import * as path from "path";

export class CollectionTree implements TreeDataProvider<DataItem> {
  onDidChangeTreeData?: Event<DataItem | null | undefined> | undefined;
  constructor() {}
  getTreeItem(element: DataItem): TreeItem | Thenable<TreeItem> {
    return element;
  }

  getChildren(element?: DataItem | undefined): ProviderResult<DataItem[]> {
    const data: DataItem[] = [];
    // 获取用户名
    const configuration = workspace.getConfiguration();
    const collection: Array<{ title: string; url: string }> = configuration.get(
      "collection",
      []
    );
    const docs: any[] = [];
    for (let i = 0; i < collection.length; i++) {
      docs.push({
        title: collection[i].title,
        url: collection[i].url,
        description: collection[i].title,
        icon: "icon_tool.svg",
      });
    }
    docs.forEach((element) => {
      data.push(
        new DataItem(element.title, element.icon, element.description, {
          title: "",
          command: "tool.openSite",
          arguments: [element],
        })
      );
    });
    return data;
  }
}

class DataItem extends TreeItem {
  constructor(label: string, icon: string, tooltip: string, command: Command) {
    super(label, TreeItemCollapsibleState.None);
    this.tooltip = tooltip;
    this.iconPath = path.join(__filename, "../../", "resources", icon);
    this.command = command;
  }
}
