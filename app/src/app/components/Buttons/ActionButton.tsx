import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { IconType } from "../../common/types/types.icon";
import { Link } from "react-router-dom";
import { SVG } from "../images/Image";

export interface ActionButtonProps extends IconButtonProps {
  title?: string;
  icon: IconType;
  link?: any;
  iconSize?: number;
}

const ActionButton = ({ title, icon, link, iconSize = 16, ...rest }: ActionButtonProps) => {
  const Icon = SVG[icon];
  return (
    <Tooltip arrow title={title} placement="top">
      {link ? (
        // @ts-ignore
        <IconButton LinkComponent={Link} to={link} {...rest}>
          <Icon size={iconSize} />
        </IconButton>
      ) : (
        <IconButton {...rest}>
          <Icon size={iconSize} />
        </IconButton>
      )}
    </Tooltip>
  );
};

export default ActionButton;
