import SvgIcon from "../icon/SvgIcon";
import { Box, BoxProps } from "@mui/material";

// sidebar icon
import app from "../../../assets/svg/icons/app.svg";
import job from "../../../assets/svg/sidebar/job.svg";
import user from "../../../assets/svg/sidebar/user.svg";
import profile from "../../../assets/svg/sidebar/profile.svg";
import analytics from "../../../assets/svg/sidebar/analytics.svg";
import dashboard from "../../../assets/svg/sidebar/dashboard.svg";
import system_settings from "../../../assets/svg/sidebar/settings.svg";
import user_management from "../../../assets/svg/sidebar/user_management.svg";
import store_management from "../../../assets/svg/sidebar/store_management.svg";

// icons
import play from "../../../assets/svg/icons/play.svg";
import stop from "../../../assets/svg/icons/stop.svg";
import restart from "../../../assets/svg/icons/restart.svg";
import download from "../../../assets/svg/icons/download.svg";
import notification from "../../../assets/svg/icons/notification.svg";

// ------------------------------------------
// Components
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
  app: (props: svgProps) => getSvgImage(app, props),
  job: (props: svgProps) => getSvgImage(job, props),
  user: (props: svgProps) => getSvgImage(user, props),
  play: (props: svgProps) => getSvgImage(play, props),
  stop: (props: svgProps) => getSvgImage(stop, props),
  restart: (props: svgProps) => getSvgImage(restart, props),
  profile: (props: svgProps) => getSvgImage(profile, props),
  download: (props: svgProps) => getSvgImage(download, props),
  analytics: (props: svgProps) => getSvgImage(analytics, props),
  dashboard: (props: svgProps) => getSvgImage(dashboard, props),
  notification: (props: svgProps) => getSvgImage(notification, props),
  user_management: (props: svgProps) => getSvgImage(user_management, props),
  system_settings: (props: svgProps) => getSvgImage(system_settings, props),
  store_management: (props: svgProps) => getSvgImage(store_management, props),
};
