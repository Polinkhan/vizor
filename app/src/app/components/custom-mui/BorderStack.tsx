/*
 * Project Name : "Aerosphare Suit"
 *
 * Author: Abu Sayed Polin
 * Copyright : "Brotecs Technologies Limited"
 *
 * Created: 2023-12-05 02:32:20
 * Modified: 2023-12-05 02:32:20
 *
 * Component : BorderStack
 * Description :
 */

import { Stack, StackProps } from "@mui/material";

const BorderStack = (props: StackProps) => {
  return <Stack {...props} sx={{ border: (theme) => `1px solid ${theme.palette.primary.main}`, borderRadius: 1, ...props.sx }} />;
};

export default BorderStack;
