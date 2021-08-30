import {
  TreeItem,
  TreeDataProvider,
  Event,
  ProviderResult,
  TreeItemCollapsibleState,
  Command,
} from "vscode";

import * as path from "path";
import { docs } from "../json";

export class DocsTree implements TreeDataProvider<DataItem> {
  onDidChangeTreeData?: Event<DataItem | null | undefined> | undefined;
  constructor() {}
  getTreeItem(element: DataItem): TreeItem | Thenable<TreeItem> {
    return element;
  }

  getChildren(element?: DataItem | undefined): ProviderResult<DataItem[]> {
    const data: DataItem[] = [];
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
    this.iconPath = path.join(__filename, "../../resources", icon);
    this.command = command;
  }
}
