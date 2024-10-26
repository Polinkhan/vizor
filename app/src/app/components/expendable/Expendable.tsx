import { Box, IconButton, Stack, StackProps, Typography } from "@mui/material";
import Iconify from "../iconify/Iconify";
import { ReactNode, useState } from "react";

interface ExpendableProps extends StackProps {
  title?: string;
  children: ReactNode;
}

const Expendable = ({ title = "", children, ...rest }: ExpendableProps) => {
  const [toggle, setToggle] = useState(false);

  return (
    <Stack gap={1} {...rest}>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ py: 1, px: 2, bgcolor: "primary.main", borderRadius: 1 }}>
        <Typography variant="body2" color={"#fff"}>
          {title}
        </Typography>
        <IconButton color="warning" onClick={() => setToggle((prev) => !prev)}>
          <Iconify icon={"uiw:up"} color={"#fff"} sx={{ transform: toggle ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }} />
        </IconButton>
      </Stack>

      <Box
        p={{ xs: toggle ? 0 : 1, md: toggle ? 0 : 2 }}
        height={toggle ? 0 : 1}
        overflow={toggle ? "hidden" : "auto"}
        sx={{ border: (theme) => `2px solid ${theme.palette.primary.main}`, borderRadius: 1, opacity: toggle ? 0 : 1, transition: "0.3s" }}
      >
        {children}
      </Box>
    </Stack>
  );
};

export default Expendable;
