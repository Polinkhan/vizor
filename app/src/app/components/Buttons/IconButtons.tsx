import { IconButton, IconButtonProps } from "@mui/material";
import { m } from "framer-motion";

interface CustomIconButtonProps extends IconButtonProps {
  open?: boolean;
}

export const CustomIconButton = (props: CustomIconButtonProps) => {
  const { open, children, ...rest } = props;

  return (
    <IconButton component={m.button} whileTap="tap" whileHover="hover" sx={{ width: 40, height: 40 }} {...rest}>
      {children}
    </IconButton>
  );
};
