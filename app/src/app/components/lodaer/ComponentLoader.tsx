import { Stack } from "@mui/material";
import { ReactNode } from "react";
import { CircleLoading } from "../animate/LoadingScreen";
import Fade from "../animate/Fade";

interface ComponentLoaderProps {
  data: any;
  children: ReactNode;
}

const ComponentLoader = ({ data, children }: ComponentLoaderProps) => {
  const no_data = data === undefined || data === null;

  return (
    <Stack height={1}>
      {no_data && (
        <Fade duration={0.3}>
          <CircleLoading />
        </Fade>
      )}
      {!no_data && (
        <Fade duration={0.3}>
          <>{children}</>
        </Fade>
      )}
    </Stack>
  );
};

export default ComponentLoader;
