import { alpha } from "@mui/material";

// ----------------------------------------------------------------------

export type ColorSchema = "primary" | "secondary" | "info" | "success" | "warning" | "error" | "gray";

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

// SETUP COLORS

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F0F0F0",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
};

const PRIMARY = {
  lighter: "#E2E0FF	",
  light: "#A7A1FF",
  main: "#564FCC",
  dark: "#2B2866",
  darker: "#0B0A19",
  contrastText: "#fff",
};

const SECONDARY = {
  lighter: "#BBCBDF",
  light: "#6087B4",
  main: "#1c5394",
  dark: "#164276",
  darker: "#0E2A4A",
  contrastText: "#fff",
};

const INFO = {
  lighter: "#CAFDF5",
  light: "#61F3F3",
  main: "#00b0f0",
  dark: "#006C9C",
  darker: "#003768",
  contrastText: "#FFFFFF",
};

const SUCCESS = {
  lighter: "#bde396",
  light: "#aac46d",
  main: "#00a65a",
  dark: "#1b5e20",
  darker: "#577d30",
  contrastText: "#FFFFFF",
};

const WARNING = {
  lighter: "#fff4e6",
  light: "#4caf50",
  main: "#cf7700",
  dark: "#B76E00",
  darker: "#7A4100",
  contrastText: "#FFFFFF",
};

const ERROR = {
  lighter: "#f8dad7",
  light: "#eda29b",
  main: "#DB4437",
  dark: "#B71D18",
  darker: "#7A0916",
  contrastText: "#FFFFFF",
};

const COMMON = {
  common: {
    black: "#000000",
    white: "#FFFFFF",
  },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.2),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export function palette(mode: "light" | "dark") {
  const light = {
    ...COMMON,
    mode: "light",
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: {
      paper: "#F8FBFF",
      default: "#FFFFFF",
      neutral: GREY[200],
    },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  };

  const dark = {
    ...COMMON,
    mode: "dark",
    text: {
      primary: "#FFFFFF",
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: alpha(GREY[500], 0.12),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  };

  return mode === "light" ? light : dark;
}
