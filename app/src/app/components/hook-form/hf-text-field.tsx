import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import Iconify from "../iconify/Iconify";
import { useState } from "react";

// -----------------------------------------------------------------------------
// Component: HFTextField
// Purpose: Define the properties for the HFTextField component.
// Parameters:
// - name: The name used in react-hook-form to manage the input field.
// - helperText: The helper text to be displayed below the input field.
// - type: The input type (e.g., "text," "number").
// - InputProps: Additional props for the TextField's input element.
// -----------------------------------------------------------------------------
type Props = TextFieldProps & {
  name: string;
};

const HFTextField = ({ name, helperText, type, InputProps, ...other }: Props) => {
  const { control } = useFormContext();
  const [showPass, setShowPass] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          autoComplete="off"
          type={type === "password" ? (showPass ? "text" : type) : type}
          value={type === "number" && field.value === 0 ? "" : field.value}
          onChange={(event) => {
            if (type === "number") field.onChange(Number(event.target.value));
            else field.onChange(event.target.value);
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          InputProps={{
            sx: { bgcolor: "white" },
            endAdornment: type === "password" && (
              <InputAdornment position="end" sx={{ mr: 1 }}>
                <IconButton edge="end" onClick={() => setShowPass((prev) => !prev)}>
                  <Iconify icon={showPass ? "solar:eye-linear" : "solar:eye-closed-linear"} />
                </IconButton>
              </InputAdornment>
            ),
            ...InputProps,
          }}
          {...other}
        />
      )}
    />
  );
};

export default HFTextField;
