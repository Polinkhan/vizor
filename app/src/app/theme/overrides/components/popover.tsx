import { Theme } from "@mui/material/styles";
import { listClasses } from "@mui/material/List";
import { paper } from "../../css_override";

// ----------------------------------------------------------------------

export function popover(theme: Theme) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          ...paper({ theme, dropdown: true }),
          [`& .${listClasses.root}`]: {
            paddingTop: 0,
            paddingBottom: 0,
          },
        },
      },
    },
  };
}
