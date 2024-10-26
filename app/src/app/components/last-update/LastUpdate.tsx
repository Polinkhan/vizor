import { Stack, Typography } from "@mui/material";
import Iconify from "../iconify/Iconify";

const LastUpdateComponent = ({ time }: { time: string | number }) => {
  const ParsedTime = time ? new Date(time).toLocaleString() : "...";
  return (
    <Stack direction={"row"} alignItems={"center"} gap={0.5}>
      <Iconify icon={"mingcute:time-fill"} width={14} color={"grey.600"} />
      <Typography variant="caption" color={"grey.600"} sx={{}}>
        Last Updated on {ParsedTime}
      </Typography>
    </Stack>
  );
};

export default LastUpdateComponent;
