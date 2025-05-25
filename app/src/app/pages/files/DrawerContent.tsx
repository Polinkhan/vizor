import { Box, InputBase, Stack, Typography } from "@mui/material";
import useSocket from "../../hooks/socket/use-socket";
import { useState, WheelEvent } from "react";

interface DrawerContentProps {
  data: {
    id: string;
    name: string;
    size: number;
    permissions: string;
    type: string;
    mimeType: string;
  };
  path: string[];
}

const DrawerContent = ({ data, path }: DrawerContentProps) => {
  const [scale, setScale] = useState(0.75);

  const is_image = data.mimeType.includes("image");
  const file_path = "/" + path.slice(1).join("/") + "/" + data.name;
  const { data: response } = useSocket({ type: "file_content", payload: { file_path, mimeType: data.mimeType } });

  if (!response || !data.mimeType) return;

  const handleChangeWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    // if (!e.ctrlKey) return;

    const zoomFactor = 0.1;
    if (e.deltaY < 0) {
      // Scroll up = Zoom in
      setScale((prev) => Math.min(prev + zoomFactor, 5));
    } else {
      // Scroll down = Zoom out
      setScale((prev) => Math.max(prev - zoomFactor, 0.2));
    }
  };

  if (is_image) {
    return (
      <Stack flex={1} onWheel={handleChangeWheel}>
        <Box
          component={"img"}
          src={response}
          sx={{ transform: `scale(${scale})`, borderRadius: 1, transition: "0.2s all linear" }}
        />
      </Stack>
    );
  }

  const divider = <Box sx={{ borderBottom: (theme) => `1px dashed ${theme.palette.grey[400]}` }} />;

  return (
    <Stack flex={1} divider={divider} overflow={"auto"} sx={{ bgcolor: "white" }}>
      <Typography p={2}>{data.name}</Typography>
      <Stack m={2} p={2} flex={1} overflow={"auto"}>
        <InputBase multiline defaultValue={response} />
      </Stack>
      <Stack p={2}>{data.name}</Stack>
    </Stack>
  );
};

export default DrawerContent;
