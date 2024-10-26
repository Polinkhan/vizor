import { Stack, SxProps, Typography } from "@mui/material";
import { APP_BUILD, APP_COPYRIGHT, APP_VERSION } from "../../common/config/config";

// -----------------------------------------------------------------------------
// Component: Footer
// Purpose: A custom Footer component for displaying footer information.
// Parameters:
// - open: Boolean flag to determine if the footer is open.
// - sx: Additional style properties for the footer.
// -----------------------------------------------------------------------------
const Footer = ({ sx }: { sx?: SxProps }) => {
  return (
    <Stack
      gap={1}
      alignItems={"center"}
      direction={{ sm: "row" }}
      justifyContent={"space-between"}
      sx={{ py: 1, px: { xs: 1, md: 4 }, transition: "0.25s all", ...sx }}
    >
      <Typography variant="body2" color={"#888"}>
        {APP_COPYRIGHT}
      </Typography>
      <Typography variant="body2" color={"#888"}>
        {`v${APP_VERSION} (Build: ${APP_BUILD})`}
      </Typography>
    </Stack>
  );
};

export default Footer;
