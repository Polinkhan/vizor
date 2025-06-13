import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../../../context/data-context";
import { useEffect, useState } from "react";
import CustomButton from "../../../../components/Buttons/LoadingButton";

interface ErrorHandlerProps {
  error_code: string;
  reRender: () => void;
}

const ErrorHandler = ({ error_code, reRender }: ErrorHandlerProps) => {
  const { socket } = useDataContext();
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    socket.on("install_net_tools_response", () => {
      reRender();
      setIsInstalling(false);
    });
  }, []);

  if (error_code === "net-tools_not_installed") {
    return (
      <Stack flex={0.75} p={6} gap={2} alignItems={"center"} justifyContent={"center"}>
        <Typography variant="h5">"Net Tools" is required to use this feature</Typography>

        <Stack gap={1} alignItems={"center"}>
          <Typography>To install net-tools, please run the following command:</Typography>
          <Typography component={"code"}>sudo apt install net-tools</Typography>
        </Stack>

        <Typography>or</Typography>

        <Stack gap={2}>
          <Typography>Click on the button below to install net-tools</Typography>
          <CustomButton
            variant="contained"
            color="primary"
            onClick={async () => {
              setIsInstalling(true);
              socket.emit("install_net_tools");
            }}
            loading={isInstalling}
          >
            {isInstalling ? "Installing Net Tools ..." : "Install Net Tools"}
          </CustomButton>
        </Stack>
      </Stack>
    );
  }

  return "Something went wrong";
};

export default ErrorHandler;
