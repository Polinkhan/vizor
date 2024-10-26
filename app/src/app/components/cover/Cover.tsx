import { Avatar, ListItemText, useTheme } from "@mui/material";
import { BackgroundCoverProps } from "./BackgroundCover";
import DialogHeader from "./DialogHeader";

const Cover = ({ size = "md", avatarUrl, primaryText, secondaryText }: BackgroundCoverProps) => {
  const theme = useTheme();

  const sizeRatio = { height: 1, avatar: 1 };

  if (size === "sm") {
    sizeRatio.height = 0.75;
    sizeRatio.avatar = 0.9;
  } else if (size === "lg") {
    sizeRatio.height = 1.2;
    sizeRatio.avatar = 1.2;
  }

  return (
    <DialogHeader sx={{ height: 200 * sizeRatio.height }}>
      <Avatar
        src={avatarUrl}
        alt={"avater"}
        sx={{
          left: { md: 24 },
          bottom: { md: -24 },
          zIndex: { md: 10 },
          pt: { xs: 6, md: 0 },
          position: { md: "absolute" },
          width: { xs: 64 * sizeRatio.avatar, md: 128 * sizeRatio.avatar },
          height: { xs: 64 * sizeRatio.avatar, md: 128 * sizeRatio.avatar },
          border: `solid 2px ${theme.palette.common.white}`,
        }}
      />

      <ListItemText
        sx={{
          left: { md: 175 },
          bottom: { md: 10 },
          zIndex: { md: 10 },
          pt: { xs: 6, md: 0 },
          position: { md: "absolute" },
        }}
        primary={primaryText}
        secondary={secondaryText}
        primaryTypographyProps={{
          typography: "h4",
        }}
        secondaryTypographyProps={{
          mt: 0.5,
          color: "inherit",
          component: "span",
          typography: "body2",
          sx: { opacity: 0.48 },
        }}
      />
    </DialogHeader>
  );
};

export default Cover;
