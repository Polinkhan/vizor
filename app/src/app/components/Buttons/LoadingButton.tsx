import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { ReactNode, useState } from "react";

interface CustomButtonProps extends ButtonProps {
  icon?: ReactNode;
  onClick: (event?: any) => Promise<void>;
}

// -----------------------------------------------------------------------------
// Component: CustomButton
// Purpose: A custom component for a loading button that displays a circular progress indicator.
// -----------------------------------------------------------------------------
const CustomButton = (props: CustomButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { icon, onClick, ...rest } = props;

  const handleClick = async (props: any) => {
    setLoading(true);
    if (onClick) await onClick(props);
    setLoading(false);
  };

  return (
    <Button
      disabled={loading}
      onClick={handleClick}
      endIcon={loading ? <CircularProgress color="inherit" size={18} /> : icon}
      {...rest}
    />
  );
};

export default CustomButton;
