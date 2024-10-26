import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { getIcon } from "../icon/Icons";
import { IconType } from "../../common/types/types.icon";
import { Link } from "react-router-dom";

export interface ActionButtonProps extends IconButtonProps {
  title?: string;
  icon: IconType;
  link?: any;
  iconSize?: number;
}

const ActionButton = ({ title, icon, link, iconSize = 16, ...rest }: ActionButtonProps) => {
  return (
    <Tooltip arrow title={title} placement="top">
      {link ? (
        // @ts-ignore
        <IconButton LinkComponent={Link} to={link} {...rest}>
          {getIcon(icon, iconSize)}
        </IconButton>
      ) : (
        <IconButton {...rest}>{getIcon(icon, iconSize)}</IconButton>
      )}
    </Tooltip>
  );
};

export default ActionButton;
