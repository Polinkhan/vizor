import { useMediaQuery, useTheme } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { MobileTimePicker, MobileTimePickerProps } from "@mui/x-date-pickers/MobileTimePicker";

// -----------------------------------------------------------------------------
// Configuration: slotProps
// Purpose: Define slot properties for the datetime picker.
// -----------------------------------------------------------------------------
const slotProps: any = {
  textField: { size: "small", variant: "standard", InputProps: { sx: { py: 0.5 } } },
};

// -----------------------------------------------------------------------------
// Component: DateTimePicker
// Purpose: A custom component for a mobile datetime picker.
// -----------------------------------------------------------------------------
export const DateTimePicker = (props: any) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const theme = useTheme();
  const isMobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <MobileDateTimePicker
      disableFuture
      orientation={isMobileDevice ? "portrait" : "landscape"}
      slotProps={slotProps}
      {...props}
    />
  );
};

interface TimePickerProps extends MobileTimePickerProps<any> {
  label: string;
  error: boolean;
}

export const TimePicker = ({ error, label, ...rest }: TimePickerProps) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const theme = useTheme();
  const isMobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <MobileTimePicker
      // format=""
      disableFuture
      orientation={isMobileDevice ? "portrait" : "landscape"}
      slotProps={{ textField: { label: label, error } }}
      sx={{ width: 1, ...rest.sx }}
      {...rest}
    />
  );
};

export default DateTimePicker;
