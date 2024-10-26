import { Theme } from "@mui/material";

export function appBar(_: Theme) {
  return {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  };
}
