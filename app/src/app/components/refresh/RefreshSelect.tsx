import { SelectProps } from "@mui/material";
import CustomSelect, { SelectListType } from "../select/custom-select";

const RefreshSelect = ({ sx, ...rest }: SelectProps) => {
  return <CustomSelect label={"Refresh At"} fullWidth={false} lists={list} sx={{ minWidth: 150, ...sx }} {...rest} />;
};

const list: SelectListType[] = [
  { label: "1 second", value: 1000 },
  { label: "5 second", value: 5000 },
  { label: "10 second", value: 10000 },
  { label: "30 second", value: 30000 },
  { label: "1 minute", value: 60000 },
  { label: "5 minute", value: 300000 },
];

export default RefreshSelect;
