import { FormControl, FormHelperText } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { TimePicker } from "../date-time-picker/DateTimePicker";
import { MobileTimePickerProps } from "@mui/x-date-pickers";

// -----------------------------------------------------------------------------
// Component: HFTimePicker
// Purpose: Define the properties for the HFTimePicker component.
// Parameters:
// - name: The name used in react-hook-form to manage the input field.
// - helperText: The helper text to be displayed below the input field.
// - type: The input type (e.g., "text," "number").
// - InputProps: Additional props for the TextField's input element.
// -----------------------------------------------------------------------------
type Props = MobileTimePickerProps<any> & {
  name: string;
  label: string;
};

const HFTimePicker = ({ name, ...other }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error} sx={{ width: 1 }}>
          <TimePicker disableFuture={false} error={!!error} {...field} {...other} />
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default HFTimePicker;
