import { Box, Divider, Stack, Typography } from "@mui/material";
import file_icon from "../../../assets/svg/icons/file.svg";
import image_icon from "../../../assets/svg/icons/image.svg";
import folder_icon from "../../../assets/svg/icons/folder.svg";
import { convertBytes } from "../../common/helpers";

interface FileInfoProps {
  data: {
    id: string;
    name: string;
    size: number;
    permissions: string;
    type: string;
    mimeType?: string;
  };
  path: string[];
}

const FileInfo = ({ data, path }: FileInfoProps) => {
  const { name, size, permissions, type, mimeType } = data;

  let dynamic_file_icon = file_icon;
  if (mimeType && mimeType.includes("image")) {
    dynamic_file_icon = image_icon;
  }

  return (
    <>
      <Divider orientation="vertical" />

      <Stack width={{ lg: 300, xl: 350 }} gap={2} sx={{ overflow: "auto" }}>
        <Stack p={4}>
          {type === "dir" && <Box component={"img"} src={folder_icon} sx={{ height: 150 }} />}
          {type === "file" && <Box component={"img"} src={dynamic_file_icon} sx={{ height: 150 }} />}
        </Stack>

        <Divider />

        <Stack p={2} gap={2}>
          <Typography variant="body2">Type : {type === "dir" ? "Directory" : "File"}</Typography>
          <Typography variant="body2">Name : {name}</Typography>
          <Typography variant="body2">Size : {convertBytes(size)}</Typography>
          <Typography variant="body2">Mime Type : {mimeType}</Typography>
          <Typography variant="body2">Permission : {permissions}</Typography>
          <Typography variant="body2">Location : /{path.slice(1).join("/")}</Typography>
        </Stack>
      </Stack>

      <Divider orientation="vertical" />
    </>
  );
};

export default FileInfo;
