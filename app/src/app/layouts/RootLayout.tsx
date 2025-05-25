import { ReactNode } from "react";
import useToggle from "../hooks/custom/use-toggle";
import { Box, Divider, Stack } from "@mui/material";
import { SideBar, MobileSideBar } from "../pages/Default/root/SideBar";
import { useResponsive } from "../components/hook-form/use-responsive";

// ------------------------------------------------------------------
// Interface for the RootLayoutProps component props.
// Parameters:
// - children: The content to be displayed within the layout.
// ------------------------------------------------------------------

interface RootLayoutProps {
  children: ReactNode;
}
// Root Layout
// |--------------------------------------------------|
// |             |                 Navbar             |
// |             |------------------------------------|
// |             |                                    |
// |             |                                    |
// |             |                                    |
// |             |                                    |
// |             |                                    |
// |  Side Bar   |             Body Layout            |
// |             |                                    |
// |             |                                    |
// |             |                                    |
// |             |                                    |
// |             |                                    |
// |             |------------------------------------|
// |             |               Footer               |
// |--------------------------------------------------|

// ------------------------------------------------------------------
// RootLayout component defines the root layout of the application.
// It includes navigation, sidebars, content, and footer.
// Parameters:
// - children: The content to be displayed within the layout.
// -----------------------------------------------------------------

const RootLayout = ({ children }: RootLayoutProps) => {
  const sm = useResponsive("down", "md");
  const { open: navOpen, onClose: navOnClose } = useToggle();

  return (
    <Stack height={"100vh"}>
      <Stack flex={1} direction={"row"} position={"relative"}>
        {/*------------ Sidebar -----------*/}

        {sm ? (
          <MobileSideBar open={navOpen} onClose={navOnClose} />
        ) : (
          <Box display={"flex"} width={{ md: 260, xl: 300 }}>
            <SideBar />
          </Box>
        )}

        <Divider orientation={"vertical"} />

        {/*----------- Full Body ----------*/}

        <Stack gap={0} flex={1} maxHeight={"100vh"} direction={"column"} overflow={"hidden"}>
          {/*------------ Body Layout -----------*/}

          {/*------------ Navbar -----------*/}

          {/* <Navbar onOpen={navOnOpen} sm={sm} /> */}

          <Divider />

          <Box flex={1} overflow={"auto"}>
            {children}
          </Box>

          {/*------------ Footer -----------*/}
          {/* <Divider sx={{ mx: 2 }} />
          <Footer /> */}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RootLayout;
