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
 * Description: Custom component for centering its children within a stack layout.
 */

import { Stack, StackProps } from "@mui/material";

// -----------------------------------------------------------------------------
// Component: Center
// Purpose: A custom component for centering its children within a stack layout.
// -----------------------------------------------------------------------------
const Center = (props: StackProps) => {
  return (
    <Stack flex={1} width={1} justifyContent={"center"} alignItems={"center"} {...props}>
      {props.children}
    </Stack>
  );
};

export default Center;
