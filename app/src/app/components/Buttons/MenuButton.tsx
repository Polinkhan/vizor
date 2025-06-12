import { ListItemButton, ListItemIcon, ListItemText, Stack, alpha, styled, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

// -----------------------------------------------------------------------------
// Component: MenuButton
// Purpose: A custom component for menu buttons with icons and text.
// -----------------------------------------------------------------------------
const MenuButton = ({ active, title, Icon, url, onClose, disabled }: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    onClose && onClose();
    disabled && enqueueSnackbar("insufficient Privileges!", { variant: "error" });
  };

  if (active) {
    return <ButtonComponent active={active} title={title} Icon={Icon} disabled={disabled} />;
  }

  return (
    <Link to={disabled ? "#" : url} className="preventSelect" style={{ textDecoration: "none" }} onClick={handleClick}>
      <ButtonComponent active={active} title={title} Icon={Icon} disabled={disabled} />
    </Link>
  );
};

const ButtonComponent = ({ active, title, Icon, disabled }: any) => {
  const theme = useTheme();
  return (
    <MenuButtonWrapper disabled={disabled} disableGutters active={active} theme={theme}>
      <Stack px={1}>{Icon && <Icon active={active} size={20} />}</Stack>

      <ListItemText
        primary={title}
        primaryTypographyProps={{
          marginTop: 0.2,
          noWrap: true,
          typography: "body2",
          textTransform: "capitalize",
          fontWeight: 500,
          // paddingLeft: active ? 0.5 : 0,
          sx: {
            transition: "0.3s all ease-in-out",
            "&:focus": {
              transform: "scale(95%)",
              bgcolor: "red",
            },
          },
        }}
      />
    </MenuButtonWrapper>
  );
};

// Type for styled icon size
type StyledIconProps = {
  size?: number;
};

// -----------------------------------------------------------------------------
// Component: StyledIcon
// Purpose: A styled icon component for menu buttons.
// -----------------------------------------------------------------------------
export const StyledIcon = styled(ListItemIcon)<StyledIconProps>(({ size }) => ({
  width: size,
  height: size,
  alignItems: "center",
  justifyContent: "center",
}));

// -----------------------------------------------------------------------------
// Component: MenuButtonWrapper
// Purpose: A styled wrapper component for menu buttons.
// -----------------------------------------------------------------------------
const MenuButtonWrapper = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "active",
})<any>(({ active, theme }) => {
  const activeStyles = {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
    },
  };

  return {
    // Root item styles
    padding: 8,
    borderRadius: 8,
    color: theme.palette.text.secondary,

    // Active root item styles
    ...(active && { ...activeStyles }),
  };
});

export default MenuButton;
