import { Theme } from "@mui/material";

export function select(_: Theme) {
  return {
    MuiSelect: {
      styleOverrides: {
        icon: {
          right: 10,
          width: 18,
          height: 18,
          top: "calc(50% - 9px)",
        },
      },
    },
    MuiNativeSelect: {
      styleOverrides: {
        icon: {
          right: 10,
          width: 18,
          height: 18,
          top: "calc(50% - 9px)",
        },
      },
    },
  };
}
