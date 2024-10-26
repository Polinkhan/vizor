import { Box, Container, Stack } from "@mui/material";
import { CustomIconButton } from "../Buttons/IconButtons";
import { MenuOpenOutlined } from "@mui/icons-material";
import Notifications from "./Notifications";

// ------------------------------------------------------------------
// Interface for the Navbar component's properties.
// Parameters:
// - onOpen: Callback function to open the mobile drawer.
// - sm: A boolean indicating if the screen size is small.
// - toggle: ToggleTypes containing open and onToggle functions.
// ------------------------------------------------------------------
interface NavbarProps {
  sm: boolean;
  onOpen: () => void;
}

// ------------------------------------------------------------------
// Navbar component.
// Parameters:
// - sm: A boolean indicating if the screen size is small.
// - onOpen: Callback function to open the mobile drawer.
// - toggle: ToggleTypes containing open and onToggle functions.
// ------------------------------------------------------------------
const Navbar = ({ sm, onOpen }: NavbarProps) => {
  return (
    <Box py={1} sx={{ transition: "0.25s all" }}>
      <Container maxWidth={"xl"}>
        <Stack
          height={1}
          direction={{ sm: "row" }}
          justifyContent={"space-between"}
          alignItems={{ xs: "end", sm: "center" }}
        >
          <Stack width={1} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            {sm && <MobileDrawerBtn onOpen={onOpen} />}
          </Stack>

          <Stack gap={2} direction={"row"} alignItems={"center"}>
            <Notifications />
            {/* <Profile /> */}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

// ------------------------------------------------------------------
// MobileDrawerBtn component for displaying the mobile drawer button.
// Parameters:
// - onOpen: Callback function to open the mobile drawer.
// ------------------------------------------------------------------
const MobileDrawerBtn = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <CustomIconButton onClick={onOpen} sx={{}}>
      <MenuOpenOutlined />
    </CustomIconButton>
  );
};

export default Navbar;
