import { Box, Stack } from "@mui/material";
import SearchTextfield from "./SearchTextfield";

const CustomSearchTextField = ({ search, handleChange, sx, ...rest }: any) => {
  return (
    <Stack direction={"row"} justifyContent={"end"} sx={sx}>
      <Box width={300} px={1}>
        <SearchTextfield fullWidth placeholder="Enter a key word ..." value={search} onChange={handleChange} {...rest} />
      </Box>
    </Stack>
  );
};

export default CustomSearchTextField;
