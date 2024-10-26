import { Module, SVG } from "../../components/images/Image";

export type modulesName =
  | "No Parent Module"
  | "Daily Job"
  | "Store Management"
  | "Activity Log"
  | "Settings"
  | "Receive Meterial"
  | "Issue Meterial"
  | "Report"
  | "User activity log"
  | "Store activity log"
  | "User Management"
  | "System Management";

export type AllModuleType = {
  id: number;
  url: string;
  icon: icons;
  name: modulesName;
};

export type icons = keyof typeof SVG;

export type ModuleType = {
  id: number;
  name: modulesName;
  parentId: number | null;
  position: number;
  url: string;
  icon: keyof typeof Module;
  active_url: string[];
  section?: string;
  children: ModuleType[];
};

export type ContextModuleType = {
  rootModules: ModuleType[];
  allModules: AllModuleType[];
};

export interface UIContextTypes {
  loading: boolean;
  modules: ContextModuleType;
  init: () => any;
  getModuleData: (name: modulesName) => any;
  moduleViewType: "list" | "grid",
  setModuleViewType: any
}
