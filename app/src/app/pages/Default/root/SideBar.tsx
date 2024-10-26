import { Drawer, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import { SVG } from "../../../components/images/Image";
import Logo from "../../../components/logo/Logo";
import MenuButton from "../../../components/Buttons/MenuButton";

// -----------------------------------------------------------------------------
// Component: SideBar
// Purpose: The sidebar component for rendering the application's navigation menu.
// Parameters:
// - onClose: A function to close the sidebar.
// -----------------------------------------------------------------------------
const SideBar = ({ onClose }: { onClose?: () => void }) => {
  const location = useLocation();

  return (
    <Stack p={2} flex={1} gap={2} bgcolor={"grey.50"}>
      <Logo
        sx={{
          height: 80,
          alignSelf: "start",
          WebkitFilter: "drop-shadow( 1.95px 1.95px 2.6px rgba(0, 0, 0, 0.25))",
        }}
      />
      <MenuList currentPath={location.pathname} onClose={onClose} />
    </Stack>
  );
};

// -----------------------------------------------------------------------------
// Component: MenuList
// Purpose: Component to render the list of menu items in the sidebar.
// Parameters:
// - currentPath: The current URL path.
// - onClose: A function to close the sidebar.
// -----------------------------------------------------------------------------
const MenuList = ({ currentPath, onClose }: { currentPath: string; onClose: any }) => {
  const modules = [
    { id: 1, name: "Dashboard", url: "dashboard", active_url: ["dashboard"], icon: "dashboard" },
    { id: 2, name: "Services", url: "services", active_url: ["services"], icon: "dashboard" },
    { id: 2, name: "Logger", url: "logger", active_url: ["logger"], icon: "dashboard" },
    { id: 3, name: "System Information", url: "system_info", active_url: ["system_info"], icon: "dashboard" },
  ];
  const paths = currentPath.split("/");

  return (
    <Stack flex={1} gap={3}>
      <Stack gap={0.5}>
        {modules.map(({ id, name, url, active_url, icon }) => {
          return (
            <MenuButton
              key={id}
              active={paths.some((path) => active_url?.includes(path))}
              title={name}
              // @ts-ignore
              Icon={SVG?.[icon]}
              url={url}
              onClose={onClose}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

// -----------------------------------------------------------------------------
// Component: MobileSideBar
// Purpose: Component to render the mobile sidebar.
// Parameters:
// - open: A boolean indicating whether the sidebar is open.
// - onClose: A function to close the sidebar.
// -----------------------------------------------------------------------------
interface MobileSideBarProps {
  open: boolean;
  onClose: () => void;
}

const MobileSideBar = ({ open, onClose }: MobileSideBarProps) => {
  return (
    <Drawer PaperProps={{ sx: { p: 2, width: 300 } }} anchor={"left"} open={open} onClose={onClose}>
      <SideBar onClose={onClose} />
    </Drawer>
  );
};

export { SideBar, MobileSideBar };
