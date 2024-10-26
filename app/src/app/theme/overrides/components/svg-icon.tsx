import { Theme } from "@mui/material";

export function svgIcon(_: Theme) {
  return {
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeLarge: {
          width: 32,
          height: 32,
          fontSize: "inherit",
        },
      },
    },
  };
}
