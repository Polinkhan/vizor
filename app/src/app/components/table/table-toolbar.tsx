import { Fragment, ReactNode, useCallback } from "react";
// @mui
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import usePopover from "../../hooks/custom/use-popover";
import Iconify from "../iconify/Iconify";
import CustomPopover from "../popover/CustomPopover";
import { TablefilterListType } from "../../common/types/types.table";
import { OutlinedInput } from "@mui/material";
import { capitalizeFirstLetter } from "../../common/common";
import { useResponsive } from "../hook-form/use-responsive";

// ----------------------------------------------------------------------

type Props = {
  filters: any;
  onFilters: (name: string, value: any) => void;
  onSearch: (value: any) => void;
  filterList: TablefilterListType[];
  iconButtons?: ReactNode[];
  disableFilter?: boolean;
};

export const TableToolbar = ({ filters, onFilters, onSearch, filterList, iconButtons, disableFilter }: Props) => {
  const popover = usePopover();
  const xs = useResponsive("down", "sm");

  const handleChangeFilter = useCallback(
    (name: string, value: string[]) => {
      onFilters(name, value);
    },
    [onFilters]
  );

  return (
    <>
      <Stack
        spacing={xs ? 1 : 2}
        sx={{ p: xs ? 1.5 : 2.5 }}
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-end", md: "center" }}
      >
        {filterList.map(({ key, label, data }) => {
          return (
            <FormControl key={key} sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
              <InputLabel>{label}</InputLabel>
              <Select
                multiple
                // size={xs ? "small" : "medium"}
                value={filters[key]}
                onChange={(e) => handleChangeFilter(key, e.target.value)}
                input={<OutlinedInput label={label} />}
                renderValue={(selected) => selected.map((value: any) => capitalizeFirstLetter(value)).join(", ")}
                MenuProps={{
                  PaperProps: {
                    sx: { maxHeight: 240 },
                  },
                }}
              >
                {data.map((option, i) => (
                  <MenuItem key={i} value={option}>
                    <Checkbox disableRipple size="small" checked={filters[key].includes(option)} />
                    {capitalizeFirstLetter(option)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        })}
        {/* <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>{roleOptions.label}</InputLabel>

          <Select
            multiple
            value={filters.accountStatus}
            onChange={handleFilterRole}
            input={<OutlinedInput label={roleOptions.label} />}
            renderValue={(selected) => selected.map((value) => value).join(", ")}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {roleOptions.data.map((option, i) => (
              <MenuItem key={i} value={option}>
                <Checkbox disableRipple size="small" checked={filters.accountStatus.includes(option)} />
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          {!disableFilter && (
            <>
              <TextField
                fullWidth
                sx={{ flex: 1 }}
                onChange={onSearch}
                placeholder="Search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: "text.disabled" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <IconButton onClick={popover.onOpen}>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </>
          )}
          {iconButtons?.map((iconButton, i) => (
            <Fragment key={i}>{iconButton}</Fragment>
          ))}
        </Stack>
      </Stack>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-top" sx={{ width: 140 }}>
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover>
    </>
  );
};

export default TableToolbar;
