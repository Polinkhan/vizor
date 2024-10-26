/*
 * Project Name : "Aerosphare Suit"
 *
 * Author: Abu Sayed Polin
 * Copyright : "Brotecs Technologies Limited"
 *
 * Created: 2023-09-28 23:46:42
 * Modified: 2023-09-28 23:46:42
 *
 * Component: App
 * Description: Custom component for displaying a loading screen with a progress bar.
 */

import { CircularProgress, LinearProgress, Stack, StackProps } from "@mui/material";
import Fade from "./Fade";
import Center from "../center/Center";

interface LoadingScreenProps extends StackProps {
  name?: string;
  removePadding?: boolean;
  sm?: boolean;
}

// -----------------------------------------------------------------------------
// Component: LoadingScreen
// Purpose: A custom component for displaying a loading screen with a progress bar.
// -----------------------------------------------------------------------------
const LoadingScreen = ({ sm, sx, name, removePadding, ...other }: LoadingScreenProps) => {
  if (removePadding) {
    return (
      <Fade style={{ width: sm ? 100 : "auto" }}>
        <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360, borderRadius: 99 }} />
      </Fade>
    );
  }

  return (
    <Center
      sx={{
        px: 5,
        width: 1,
        flexGrow: 1,
        minHeight: 1,
        ...sx,
      }}
      {...other}
    >
      <Fade style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360, borderRadius: 99 }} />
      </Fade>
    </Center>
  );
};

export const CircleLoading = () => {
  return (
    <Stack height={0.9} justifyContent={"center"} alignItems={"center"}>
      <CircularProgress color="inherit" size={20} />
    </Stack>
  );
};

export default LoadingScreen;
