import { Stack } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const SetupLayout = () => {
  return (
    <Stack gap={20} height={1} justifyContent={"center"} alignItems={"center"}>
      <Stack direction={"row"} gap={2}>
        <Link to={"step1"}>Step 1</Link>
        <Link to={"step2"}>Step 2</Link>
      </Stack>
      <Outlet />
    </Stack>
  );
};

export default SetupLayout;
