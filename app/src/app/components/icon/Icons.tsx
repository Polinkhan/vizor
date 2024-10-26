import { IconType } from "../../common/types/types.icon";
import { SVG } from "../images/Image";

export const IconifyIcons = {
  edit: "solar:pen-bold",
  delete: "mdi:trash",
  restore: "ic:round-settings-backup-restore",
  archive: "ion:archive",
  details: "tabler:list-details",
  menu: "ion:menu",
  notification: "solar:bell-bold",
  download: "octicon:download-16",
  warning: "typcn:warning",
  stop: "fe:stop",
  play: "heroicons:play-20-solid",
};

export const getIcon = (iconName: IconType, width?: number) => {
  const Component = SVG[iconName];
  return <Component size={width} />;
};
