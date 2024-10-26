import { Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogTitle, SxProps } from "@mui/material";
import { ReactNode } from "react";
import CustomButton from "../Buttons/LoadingButton";

export type DialogActionsType = Array<
  {
    name: string;
    onClick: () => Promise<void>;
    shouldLoading?: boolean;
  } & ButtonProps
>;

type Props = {
  toggle: any;
  DialogBody: ReactNode;
  header: string;
  disableAction?: boolean;
  sx?: SxProps;
  actions?: DialogActionsType;
};

// -----------------------------------------------------------------------------
// Component: CustomDialog
// Purpose: A custom dialog component for displaying content with a header and cancel button.
// Parameters:
// - toggle: Object containing open and onClose functions for dialog control.
// - DialogBody: The content to be displayed in the dialog.
// - header: The header text for the dialog.
// -----------------------------------------------------------------------------
const CustomDialog = ({ toggle, DialogBody, header, disableAction, actions = [], sx }: Props) => {  
  return (
    <Dialog
      open={toggle.open}
      onClose={toggle.onClose}
      PaperProps={{ sx: { minWidth: { xs: 360, md: 450 }, bgcolor: "white", ...sx } }}
    >
      <DialogTitle>{header}</DialogTitle>

      <DialogContent dividers sx={{ display: "flex", alignItems: "center" }}>
        {DialogBody}
      </DialogContent>
      {!disableAction && (
        <DialogActions>
          {actions.length ? (
            actions?.map(({ name, shouldLoading, ...rest }, i) => (
              <CustomButton key={i} variant="text" {...rest}>
                {name}
              </CustomButton>
            ))
          ) : (
            <Button onClick={toggle.onClose}>Cancel</Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CustomDialog;
