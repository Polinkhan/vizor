// ------------------------------------------
// Components

import { Box, BoxProps } from "@mui/material";
import SvgIcon from "../icon/SvgIcon";
import { getSvgPath } from "../../common/helpers";

// ------------------------------------------
export interface svgProps extends BoxProps {
  default?: boolean;
  active?: boolean;
  bgcolor?: string;
  size?: number;
}

const getSvgImage = (src: string, props: svgProps) => {
  const { size, sx, ...rest } = props;
  if (props?.default) {
    return <Box component={"img"} height={size} src={src} {...rest} />;
  }

  return (
    <SvgIcon
      src={src}
      height={props.size}
      sx={{
        bgcolor: (theme) => (props.active ? props.bgcolor ?? theme.palette.primary.main : "currentColor"),
        ...sx,
      }}
    />
  );
};

export const SVG = {
  app: (props: svgProps) => getSvgImage(getSvgPath("app"), props),
  job: (props: svgProps) => getSvgImage(getSvgPath("job"), props),
  user: (props: svgProps) => getSvgImage(getSvgPath("user"), props),
  play: (props: svgProps) => getSvgImage(getSvgPath("play"), props),
  stop: (props: svgProps) => getSvgImage(getSvgPath("stop"), props),
  service: (props: svgProps) => getSvgImage(getSvgPath("service"), props),
  restart: (props: svgProps) => getSvgImage(getSvgPath("restart"), props),
  profile: (props: svgProps) => getSvgImage(getSvgPath("profile"), props),
  download: (props: svgProps) => getSvgImage(getSvgPath("download"), props),
  dashboard: (props: svgProps) => getSvgImage(getSvgPath("dashboard"), props),
  notification: (props: svgProps) => getSvgImage(getSvgPath("notification"), props),
  user_management: (props: svgProps) => getSvgImage(getSvgPath("user_management"), props),
  system_settings: (props: svgProps) => getSvgImage(getSvgPath("system_settings"), props),
  store_management: (props: svgProps) => getSvgImage(getSvgPath("store_management"), props),
  internet: (props: svgProps) => getSvgImage(getSvgPath("internet"), props),
  calendar: (props: svgProps) => getSvgImage(getSvgPath("calendar"), props),
  folder: (props: svgProps) => getSvgImage(getSvgPath("folder"), props),
  stack: (props: svgProps) => getSvgImage(getSvgPath("stack"), props),
  directory: (props: svgProps) => getSvgImage(getSvgPath("directory"), props),
  graph: (props: svgProps) => getSvgImage(getSvgPath("graph"), props),
  cpu: (props: svgProps) => getSvgImage(getSvgPath("cpu"), props),
  memory: (props: svgProps) => getSvgImage(getSvgPath("memory"), props),
  disk: (props: svgProps) => getSvgImage(getSvgPath("disk"), props),
};
