import { forwardRef } from "react";
// icons
import { Icon } from "@iconify/react";
// @mui
import Box, { BoxProps } from "@mui/material/Box";

// -----------------------------------------------------------------
// Interface for the Iconify component.
// Parameters:
// - icon: The icon data to display.
// - width: The width of the icon (default is 20).
// - sx: Additional styles for the icon.
// - other: Additional props for the Box component.
// -----------------------------------------------------------------
interface Props extends BoxProps {
  icon: any;
  reverse?: boolean;
}

// -----------------------------------------------------------------
// Iconify component, which displays an icon using the Iconify library.
// This component takes an icon data and optional width and styles.
// -----------------------------------------------------------------
const Iconify = forwardRef<SVGElement, Props>(({ reverse, icon, width = 20, sx, ...other }, ref) => (
  <Box
    ref={ref}
    component={Icon}
    className="component-iconify"
    icon={icon}
    sx={{ width, height: width, ...(reverse && { transform: "rotate(180deg)" }), ...sx }}
    {...other}
  />
));

export default Iconify;
