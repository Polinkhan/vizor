/*
 * Project Name : "Aerosphare Suit"
 *
 * Author: Abu Sayed Polin
 * Copyright : "Brotecs Technologies Limited"
 *
 * Created: 2023-12-05 02:31:51
 * Modified: 2023-12-05 02:31:51
 *
 * Component : Heading
 * Description :
 */

import { Divider, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import Slide from "../animate/Slide";

const Heading = ({ title, endComponent }: { title?: string; endComponent?: ReactNode }) => {
  return (
    <Stack gap={1} overflow={"hidden"}>
      <Stack direction={"row"} gap={1}>
        <Slide value={50} duration={0.5} style={{ width: "auto", flex: 1 }}>
          <Typography variant={"h5"} color={"primary.light"}>
            {title}
          </Typography>
        </Slide>

        <Stack alignItems={"end"}>{endComponent}</Stack>
      </Stack>
      <Divider sx={{ width: 1 }} />
    </Stack>
  );
};

export default Heading;
