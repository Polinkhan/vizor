import { Stack, StackProps, Typography } from "@mui/material";
import { CustomIconButton } from "../Buttons/IconButtons";
import usePopover from "../../hooks/custom/use-popover";
import CustomPopover from "../popover/CustomPopover";

import { SVG } from "../images/icons";

// ------------------------------------------------------------------
// Notifications component.
// Parameters:
// - props: StackProps to allow extending the Stack component.
// ------------------------------------------------------------------
const Notifications = (props: StackProps) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const { onClose, onOpen, open } = usePopover();

  // ------------------------------------------
  // Variables
  // ------------------------------------------

  // ------------------------------------------
  // Functions
  // ------------------------------------------

  return (
    <Stack {...props}>
      <CustomIconButton open={open} onClick={onOpen}>
        <SVG.notification />
      </CustomIconButton>
      {/* Popover */}
      <CustomPopover open={open} onClose={onClose} sx={{ p: 1 }}>
        <Stack bgcolor={"#fff"} sx={{ p: 2, minHeight: 500, width: 300, borderRadius: 1, boxShadow: 1 }}>
          <Typography>Notifications</Typography>
        </Stack>
      </CustomPopover>
    </Stack>
  );
};

export default Notifications;
