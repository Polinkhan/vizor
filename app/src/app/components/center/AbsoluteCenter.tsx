import { StackProps } from "@mui/material";
import Center from "./Center";

const AbsoluteCenter = (props: StackProps) => {
  return <Center {...props} sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", ...props.sx }} />;
};

export default AbsoluteCenter;
