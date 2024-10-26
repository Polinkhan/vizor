import { Theme } from "@mui/material/styles";
import { menuItem } from "../../CSS";
//

// ----------------------------------------------------------------------
export function menu(theme: Theme) {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...menuItem(theme),
        },
      },
    },
  };
}
