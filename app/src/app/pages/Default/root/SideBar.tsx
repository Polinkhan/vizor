import { Drawer, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { SVG } from "../../../components/images/Image";
import MenuButton from "../../../components/Buttons/MenuButton";
import app from "../../../../assets/svg/icons/app.svg";
import SvgIcon from "../../../components/icon/SvgIcon";

// -----------------------------------------------------------------------------
// Component: SideBar
// Purpose: The sidebar component for rendering the application's navigation menu.
// Parameters:
// - onClose: A function to close the sidebar.
// -----------------------------------------------------------------------------
const SideBar = ({ onClose }: { onClose?: () => void }) => {
  const location = useLocation();

  return (
    <Stack p={2} gap={2} flex={1}>
      <Stack gap={2} direction={"row"} alignItems={"center"}>
        <SvgIcon src={app} height={60} sx={{ bgcolor: (theme) => theme.palette.primary.main }} />
        <Stack>
          <Typography color={"primary.main"} fontWeight={600}>
            Vizor
          </Typography>
          <Typography color={"grey.600"} variant="caption" fontWeight={500}>
            Monitoring in real time
          </Typography>
        </Stack>
      </Stack>
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
    {
      name: "Dashboard",
      url: "dashboard",
      active_url: ["dashboard"],
      icon: "dashboard",
    },
    {
      name: "Services",
      url: "services",
      active_url: ["services"],
      icon: "dashboard",
    },
    {
      name: "Files",
      url: "files",
      active_url: ["files"],
      icon: "dashboard",
    },
    {
      name: "Logger",
      url: "logger",
      active_url: ["logger"],
      icon: "dashboard",
    },
    {
      name: "Terminal",
      url: "terminal",
      active_url: ["terminal"],
      icon: "dashboard",
    },
    {
      name: "System Information",
      url: "system_info",
      active_url: ["system_info"],
      icon: "dashboard",
    },
  ];
  const paths = currentPath.split("/");

  return (
    <Stack flex={1} gap={3}>
      <Stack gap={0.5}>
        {modules.map(({ name, url, active_url, icon }, index) => {
          return (
            <MenuButton
              key={index}
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
