import {  Stack } from "@mui/material";
import { ReactNode } from "react";
import { CircleLoading } from "../animate/LoadingScreen";

interface ComponentLoaderProps {
  data: any;
  children: ReactNode;
}

const ComponentLoader = ({ data, children }: ComponentLoaderProps) => {
  const no_data = data === undefined || data === null;

  return (
    <Stack height={1}>
      {no_data && <CircleLoading />}
      {!no_data && children}
    </Stack>
  );
};

export default ComponentLoader;
