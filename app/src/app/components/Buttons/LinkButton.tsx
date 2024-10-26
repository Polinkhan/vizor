import { Button, ButtonProps } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface LinkButtonTypes extends ButtonProps {
  to: string;
}

const LinkButton = (props: LinkButtonTypes) => {
  // -----------------------------------------
  // Hooks
  // -----------------------------------------
  const navigate = useNavigate();

  const { to, ...rest } = props;

  const handleClick = () => {
    navigate(to);
  };

  return (
    <Button LinkComponent={"a"} color="primary" sx={{ px: 1.5, py: 1, borderRadius: 0.7 }} onClick={handleClick} {...rest}>
      {rest.children}
    </Button>
  );
};

export default LinkButton;
