import merge from "lodash.merge";
import { useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider as MuiThemeProvider, ThemeOptions } from "@mui/material/styles";
import { palette } from "./palette";
import { typography } from "./typography";
import { shadows } from "./shadow";
import { componentsOverrides } from "./overrides";
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  //   const { currentLang } = useLocales();

  //   const settings = useSettingsContext();

  //   const darkModeOption = darkMode(settings.themeMode);

  //   const presetsOption = presets(settings.themeColorPresets);

  //   const contrastOption = contrast(
  //     settings.themeContrast === "bold",
  //     settings.themeMode
  //   );

  //   const directionOption = direction(settings.themeDirection);

  const baseOption = useMemo(
    () => ({
      palette: palette("light"),
      shadows: shadows("light"),
      //   customShadows: customShadows("light"),
      typography,
      shape: { borderRadius: 8 },
    }),
    []
  );

  //   const memoizedValue = useMemo(
  //     () =>
  //       merge(
  //         // Base
  //         baseOption,
  //         // Direction: remove if not in use
  //         directionOption,
  //         // Dark mode: remove if not in use
  //         darkModeOption,
  //         // Presets: remove if not in use
  //         presetsOption,
  //         // Contrast: remove if not in use
  //         contrastOption.theme
  //       ),
  //     [
  //       baseOption,
  //       directionOption,
  //       darkModeOption,
  //       presetsOption,
  //       contrastOption.theme,
  //     ]
  //   );

  const theme = createTheme(baseOption as ThemeOptions);

  theme.components = merge(
    componentsOverrides(theme)
    // contrastOption.components
  );

  //   const themeWithLocale = useMemo(
  //     () => createTheme(theme, currentLang.systemValue),
  //     [currentLang.systemValue, theme]
  //   );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
