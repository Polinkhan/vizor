/*
 * Project Name : "Aerosphare Suit"
 *
 * Author: Abu Sayed Polin
 * Copyright : "Brotecs Technologies Limited"
 *
 * Created: 2023-09-28 23:46:42
 * Modified: 2023-09-28 23:46:42
 *
 * Component: App
 * Description: Custom Dot component for displaying a colored dot.
 */

import { Box, BoxProps } from "@mui/material";

interface DotProps extends BoxProps {
  size?: number;
  active?: string;
}

// -----------------------------------------------------------------------------
// Component: Dot
// Purpose: A custom Dot component for displaying a colored dot.
// Parameters:
// - active: String that determines the dot's color (e.g., "active" or "grey").
// - size: The size of the dot.
// - sx: Additional style properties for the dot.
// -----------------------------------------------------------------------------
const Dot = (props: DotProps) => {
  const { active, size, sx, ...rest } = props;
  let bgcolor;
  if (props.color) {
    bgcolor = props.color;
  } else {
    bgcolor = active === "active" || active === "online" ? "success.main" : "grey.400";
  }

  return <Box sx={{ bgcolor, height: size ?? 16, width: size ?? 16, borderRadius: 99, mx: "auto", boxShadow: 5, ...sx }} {...rest} />;
};

export default Dot;
