import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 100;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export type CustomMultiSelectProps<type> = {
  value: any;
  options: type[];
  loading?: boolean;
} & SelectProps;

const CustomMultiSelect = ({ label, value, options, loading, ...rest }: CustomMultiSelectProps<any>) => {
  const [objectData, setObjectData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (options) {
      const newData: { [key: string]: any } = {};
      options.forEach(({ id, ...rest }) => {
        newData[id] = { id, ...rest };
      });
      setObjectData(newData);
    }
  }, [options]);

  console.log({ value, objectData, options });

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        fullWidth
        value={value}
        label={label}
        MenuProps={MenuProps}
        renderValue={(selected: any) => {
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value: any) => {
                const user = objectData[value];
                return <Chip key={value} variant="soft" label={user?.name} avatar={<Avatar src={user?.photoUrl} />} />;
              })}
            </Box>
          );
        }}
        sx={{ minHeight: 50, bgcolor: "#fff" }}
        endAdornment={
          loading && (
            <InputAdornment position="end" sx={{ mx: 4 }}>
              <CircularProgress size={16} />
            </InputAdornment>
          )
        }
        {...rest}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.id} sx={{ bgcolor: "#fff", px: 2, py: 1 }}>
            {/* <Profile data={option} /> */}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomMultiSelect;
