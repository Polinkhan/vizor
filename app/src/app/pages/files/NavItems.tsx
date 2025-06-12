import { Dispatch, SetStateAction } from "react";
import { alpha, IconButton, Stack, Typography, useTheme } from "@mui/material";

import { getSvgPath } from "../../common/helpers";
import SvgIcon from "../../components/icon/SvgIcon";

interface BreadcrumbProps {
  path: string[];
  setPath: Dispatch<SetStateAction<string[]>>;
}

export const Breadcrumb = ({ path, setPath }: BreadcrumbProps) => {
  const path_length = path.length;
  return (
    <Stack direction={"row"} alignItems={"center"} gap={2}>
      <Typography variant="body2" fontWeight={500}>
        Location :{" "}
      </Typography>

      <Stack direction={"row"} gap={1} alignItems={"center"}>
        {path.map((dir: string, index: number) => {
          const is_last = index === path_length - 1;
          if (index === 0) dir = "(root)";

          return (
            <>
              {index > 0 && (
                <Typography variant="body2" fontWeight={400} color="grey.600">
                  /
                </Typography>
              )}
              <Typography
                key={index}
                variant="body2"
                fontWeight={is_last ? 600 : 400}
                onClick={() => {
                  setPath((prev) => prev.slice(0, index + 1));
                }}
                sx={{
                  cursor: "pointer",
                  color: is_last ? "grey.900" : "grey.600",
                  "&:hover": {
                    color: "grey.900",
                    textDecoration: "underline",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {dir}
              </Typography>
            </>
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
        <SvgIcon src={getSvgPath("left")} sx={{ width: 24 }} />
      </IconButton>
      <IconButton color="primary" sx={{ bgcolor: primary_bg }} onClick={handleForward} disabled={disableForwardBtn}>
        <SvgIcon src={getSvgPath("right")} sx={{ width: 24 }} />
      </IconButton>
    </Stack>
  );
};
