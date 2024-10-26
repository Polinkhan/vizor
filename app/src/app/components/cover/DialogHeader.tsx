import { bgGradient } from "../../theme/css_override";
import { alpha, Box, BoxProps, useTheme } from "@mui/material";
import coverDefault from "../../../assets/images/group-cover.webp";
import time from "../../../assets/images/time.jpg";

interface DialogHeaderProps extends BoxProps {
  image?: "default" | "time";
}

const DialogHeader = ({ sx, image, ...rest }: DialogHeaderProps) => {
  const theme = useTheme();
  let imgUrl = coverDefault;
  if (image === "time") imgUrl = time;

  return (
    <Box
      sx={{
        mb: 4,
        borderRadius: 2,
        position: "relative",
        color: "common.white",
        ...bgGradient({ imgUrl, color: alpha(theme.palette.primary.darker, 0.8) }),
        ...sx,
      }}
      {...rest}
    />
  );
};

export default DialogHeader;
