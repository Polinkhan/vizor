import { Backdrop, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Iconify from "../iconify/Iconify";

const OfflineChecker = () => {
  const [isOffline, setIsOffline] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const onlineHandler = () => {
      setIsOffline(false);
      enqueueSnackbar("Internet Connection is back", { variant: "success" });
    };

    const offlineHandler = () => {
      setIsOffline(true);
    };

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isOffline}>
      <Stack
        gap={2}
        direction={"row"}
        sx={{
          bgcolor: "#B70404",
          width: 1,
          position: "absolute",
          top: isOffline ? 0 : -100,
          height: 100,
          boxShadow: 20,
          justifyContent: "center",
          alignItems: "center",
          transition: "0.3s",
        }}
      >
        <Iconify icon={"typcn:warning-outline"} width={40} />
        <Typography variant="h4" sx={{ fontSize: { xs: 16, md: 24 } }}>
          No internet Connection !!
        </Typography>
      </Stack>
    </Backdrop>
  );
};

export default OfflineChecker;
