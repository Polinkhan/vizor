import { alpha, Box, Grid, GridProps, Stack, Typography, useTheme } from "@mui/material";
import file_icon from "../../../assets/svg/icons/file.svg";
import image_icon from "../../../assets/svg/icons/image.svg";
import folder_icon from "../../../assets/svg/icons/folder.svg";

interface FileItemProps extends GridProps {
  label: string;
  mimeType?: string;
  isSelected?: boolean;
  componentFor: "file" | "folder";
}

const FileItem = ({ isSelected, componentFor, mimeType, label, sx, ...rest }: FileItemProps) => {
  const theme = useTheme();
  const primary = theme.palette.error.main;
  const primary_bg = alpha(primary, 0.1);
  const primary_hover_bg = alpha(primary, 0.05);

  let dynamic_file_icon = file_icon;
  if (mimeType && mimeType.includes("image")) {
    dynamic_file_icon = image_icon;
  }

  return (
    <Grid item xs={4} md={4} lg={3} xl={1.5} sx={{ textAlign: "center" }}>
      <Stack
        p={2}
        pb={1}
        gap={1}
        mx={"auto"}
        width={120}
        sx={{
          borderRadius: 2,
          cursor: "pointer",
          userSelect: "none",
          bgcolor: isSelected ? primary_bg : "transparent",
          "&: hover": { bgcolor: isSelected ? primary_bg : primary_hover_bg },
          ...sx,
        }}
        {...rest}
      >
        {componentFor === "folder" && <Box component={"img"} src={folder_icon} sx={{ height: 60 }} />}
        {componentFor === "file" && <Box component={"img"} src={dynamic_file_icon} sx={{ height: 60 }} />}

        <Typography variant="body2" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {label}
        </Typography>
      </Stack>
    </Grid>
  );
};

export default FileItem;
