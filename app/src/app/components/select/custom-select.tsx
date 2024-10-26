import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from "@mui/material";
import { ReactNode } from "react";

export type SelectListType = {
  label: string;
  value: string | number;
};

type CustomSelectProps = {
  lists: SelectListType[];
  helperText?: string | ReactNode;
} & SelectProps;

const CustomSelect = (props: CustomSelectProps) => {
  const { lists, label, helperText, fullWidth, ...rest } = props;
  return (
    <FormControl fullWidth={fullWidth ?? true}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        sx={{ flex: 1 }}
        inputProps={{
          sx: { overflow: "hidden", bgcolor: "#fff", fontSize: 14 },
        }}
        {...rest}
      >
        {lists.map(({ label, value }, i) => (
          <MenuItem sx={{ p: 1 }} value={value} key={i}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {!!helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;
