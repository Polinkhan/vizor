/*
 * Project Name : "Aerosphare Suit"
 *
 * Author: Abu Sayed Polin
 * Copyright : "Brotecs Technologies Limited"
 *
 * Created: 2023-09-28 23:46:42
 * Modified: 2023-09-28 23:46:42
 *
 * File: CustomTextfield.tsx
 * Description: Defines a custom text field component with various options.
 */

// Import necessary modules from MUI (Material-UI)
import { CircularProgress, InputAdornment, TextField, TextFieldProps } from "@mui/material";

// ------------------------------------------------------------------
// Interface for the CustomTextfieldProps that extends TextFieldProps with custom options.
// Parameters:
// - middle: A flag to align the text in the middle.
// - readOnly: A flag to set the text field as read-only.
// - loading: A flag to display a loading spinner.
// - disableUnderline: A flag to disable the text field's underline.
// ------------------------------------------------------------------
type CustomTextfieldProps = {
  inputRef?: any;
  loading?: boolean;
} & TextFieldProps;

// ------------------------------------------------------------------
// CustomTextfield component for a customized text field.
// Parameters:
// - props: CustomTextfieldProps for defining the custom text field.
// ------------------------------------------------------------------
const CustomTextfield = (props: CustomTextfieldProps) => {
  // Destructure properties from props object
  const { inputRef, InputProps, sx, loading, ...rest } = props;

  return (
    <TextField
      sx={{ flex: 1 }}
      ref={inputRef}
      variant="standard"
      autoComplete="off"
      size="small"
      InputProps={{
        sx: { minWidth: 250, py: 0.5, fontSize: 14, ...sx },
        endAdornment: (
          <InputAdornment position="end" sx={{ mx: 1 }}>
            {loading ? <CircularProgress size={16} /> : <></>}
          </InputAdornment>
        ),
        ...InputProps,
      }}
      {...rest}
    />
  );
};

// Export the CustomTextfield component
export default CustomTextfield;
