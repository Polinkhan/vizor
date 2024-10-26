import { Box, BoxProps } from "@mui/material";
import { Link } from "react-router-dom";
import logoURL from "../../../assets/svg/logo/logo_with_name.svg";
import { DEFAULT_ROUTE } from "../../common/config/config";

// ------------------------------------------------------------------
// Interface for the Logo component.
// Parameters:
// - src: The source URL for the logo image.
// - sx: Additional styles for the Box component.
// - other: Additional props for the Box component.
// ------------------------------------------------------------------
interface LogoProps extends BoxProps {
  src: string;
}

// ------------------------------------------------------------------
// Logo component, which displays a logo image.
// This component is wrapped in a Link element to navigate to /app/dashboard.
// ------------------------------------------------------------------
const Logo = ({ sx, ...other }: BoxProps) => {
  return (
    <Link to={DEFAULT_ROUTE} style={{ display: "contents" }}>
      <LogoSVG sx={{ ...sx }} src={logoURL} {...other} draggable={false} />
    </Link>
  );
};

// ------------------------------------------------------------------
// LogoSVG component, which renders the logo image using the Box component.
// Parameters:
// - sx: Additional styles for the Box component.
// - src: The source URL for the logo image.
// - other: Additional props for the Box component.
// ------------------------------------------------------------------
const LogoSVG = ({ sx, src, ...other }: LogoProps) => (
  <Box
    component="img"
    src={src}
    sx={{
      height: 60,
      display: "inline-flex",
      ...sx,
    }}
    draggable={false}
    {...other}
  ></Box>
);

export default Logo;
