import { Avatar, ListItemText, Stack, useTheme } from "@mui/material";

import DialogHeader from "./DialogHeader";

export interface BackgroundCoverProps {
  size?: "sm" | "md" | "lg";
  avatarUrl?: string;
  primaryText?: string;
  secondaryText?: string;
}

const BackgroundCover = ({ size = "md", avatarUrl, primaryText, secondaryText }: BackgroundCoverProps) => {
  const theme = useTheme();

  const sizeRatio = {
    avatar: 1,
  };

  if (size === "sm") {
    sizeRatio.avatar = 0.8;
  } else if (size === "lg") {
    sizeRatio.avatar = 1.2;
  }

  return (
    <DialogHeader>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          left: { md: 24 },
          bottom: { md: 24 },
          zIndex: { md: 10 },
          pt: { xs: 6, md: 0 },
          position: { md: "absolute" },
        }}
      >
        <Avatar
          src={avatarUrl}
          alt={"avater"}
          sx={{
            mx: "auto",
            width: { xs: 64 * sizeRatio.avatar, md: 128 * sizeRatio.avatar },
            height: { xs: 64 * sizeRatio.avatar, md: 128 * sizeRatio.avatar },
            border: `solid 2px ${theme.palette.common.white}`,
          }}
        />

        <ListItemText
          sx={{
            px: 2,
            pb: 2,
            mt: 3,
            ml: { md: 3 },
            textAlign: { xs: "center", md: "unset" },
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
      </Stack>
    </DialogHeader>
  );
};

export default BackgroundCover;
