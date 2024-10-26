import { Box, BoxProps } from "@mui/material";
import { forwardRef } from "react";

export interface SvgColorProps extends BoxProps {
  src: string;
  reverse?: boolean;
}

const SvgIcon = forwardRef<HTMLSpanElement, SvgColorProps>(({ src, sx, reverse, ...other }, ref) => {
  return (
    <Box
      component="span"
      className="svg-color"
      ref={ref}
      sx={{
        width: other.height ?? { xs: 20, xl: 24 },
        height: other.height ?? { xs: 20, xl: 24 },
        display: "inline-block",
        mask: `url(${src}) no-repeat center / contain`,
        bgcolor: "currentcolor",
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...(reverse && { transform: "rotate(180deg)" }),
        ...sx,
      }}
      {...other}
    />
  );
});

export default SvgIcon;
