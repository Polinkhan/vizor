import { TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import CustomMultiSelect, { CustomMultiSelectProps } from "../select/custom-multi-select";

// -----------------------------------------------------------------------------
// Component: HFTextField
// Purpose: Define the properties for the HFTextField component.
// Parameters:
// - name: The name used in react-hook-form to manage the input field.
// - helperText: The helper text to be displayed below the input field.
// - type: The input type (e.g., "text," "number").
// - InputProps: Additional props for the TextField's input element.
// -----------------------------------------------------------------------------
export type HFListType = Array<{
  label: string;
  value: string | number | boolean;
}>;

type Props = TextFieldProps & {
  name: string;
  horizontalLabel?: boolean;
} & CustomMultiSelectProps<any>;

const HFMultiSelectField = ({ name, helperText, type, InputProps, label, horizontalLabel, ...other }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <CustomMultiSelect
          label={horizontalLabel ? null : label}
          {...field}
          error={!!error}
          // @ts-ignore
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
};

export default HFMultiSelectField;
