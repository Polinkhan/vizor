import { Dispatch, SetStateAction } from "react";
import { alpha, Box, IconButton, Stack, Typography, useTheme } from "@mui/material";

import back_icon from "../../../assets/svg/icons/left.svg";
import forward_icon from "../../../assets/svg/icons/right.svg";
import SvgIcon from "../../components/icon/SvgIcon";

interface BreadcrumbProps {
  path: string[];
  setPath: Dispatch<SetStateAction<string[]>>;
}

export const Breadcrumb = ({ path, setPath }: BreadcrumbProps) => {
  return (
    <Stack direction={"row"} alignItems={"center"} gap={2}>
      <Typography variant="body2" fontWeight={500}>
        Location :{" "}
      </Typography>

      <Stack direction={"row"} gap={1} alignItems={"center"} divider={<Typography variant="caption">-</Typography>}>
        {path.map((dir: string, index: number) => {
          return (
            <Typography
              key={index}
              variant="caption"
              fontWeight={600}
              onClick={() => {
                setPath((prev) => prev.slice(0, index + 1));
              }}
              sx={{
                px: 1.5,
                py: 0.5,
                bgcolor: "grey.200",
                borderRadius: 0.75,
                cursor: "pointer",
              }}
            >
              {dir}
            </Typography>
          );
        })}
      </Stack>
    </Stack>
  );
};

interface BackForwardProps {
  path: string[];
  setPath: Dispatch<SetStateAction<string[]>>;
  forwardHistory: string[][];
  setForwardHistory: Dispatch<SetStateAction<string[][]>>;
}

export const BackForward = ({ path, setPath, forwardHistory, setForwardHistory }: BackForwardProps) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primary_bg = alpha(primary, 0.1);

  const handleBack = () => {
    if (path.length > 1) {
      setForwardHistory((prev) => [...prev, path]);
      setPath((prev) => prev.slice(0, -1));
    }
  };

  const handleForward = () => {
    if (forwardHistory.length > 0) {
      const nextPath = forwardHistory[forwardHistory.length - 1];
      setPath(nextPath);
      setForwardHistory((prev) => prev.slice(0, -1));
    }
  };

  const disableBackBtn = path.length <= 1;
  const disableForwardBtn = forwardHistory.length === 0;

  return (
    <Stack direction={"row"} gap={1} alignItems={"center"}>
      <IconButton color="primary" sx={{ bgcolor: primary_bg }} onClick={handleBack} disabled={disableBackBtn}>
        <SvgIcon src={back_icon} sx={{ width: 24 }} />
      </IconButton>
      <IconButton color="primary" sx={{ bgcolor: primary_bg }} onClick={handleForward} disabled={disableForwardBtn}>
        <SvgIcon src={forward_icon} sx={{ width: 24 }} />
      </IconButton>
    </Stack>
  );
};
