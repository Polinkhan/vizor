/*
 * Project Name : "Aerosphare Suit"
 *
 * Author: Abu Sayed Polin
 * Copyright : "Brotecs Technologies Limited"
 *
 * Created: 2023-09-28 23:46:42
 * Modified: 2023-09-28 23:46:42
 *
 * File: SearchTextfield.tsx
 * Description: Defines a custom search text field component.
 */

// Import necessary modules and components
import CustomTextfield from "./CustomTextfield";
import { InputAdornment, TextFieldProps } from "@mui/material";
import Iconify from "../iconify/Iconify";

// ------------------------------------------------------------------
// Interface for the SearchTextfieldProps that extends TextFieldProps with custom options.
// Parameters:
// - loading: A flag to display a loading spinner.
// ------------------------------------------------------------------
type SearchTextfieldProps = {
  loading?: boolean;
} & TextFieldProps;

// ------------------------------------------------------------------
// SearchTextfield component for a customized search text field.
// Parameters:
// - props: SearchTextfieldProps for defining the custom search text field.
// ------------------------------------------------------------------
const SearchTextfield = (props: SearchTextfieldProps) => {
  // Destructure properties from props object
  const { InputProps, loading, ...rest } = props;

  // Return a CustomTextfield component with custom styling and options
  return (
    <CustomTextfield
      loading={loading}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon={"fe:search"} />
          </InputAdornment>
        ),
        ...InputProps,
        sx: { py: 0.5, ...InputProps?.sx, fontSize: 14 },
      }}
      {...rest}
    />
  );
};

// Export the SearchTextfield component
export default SearchTextfield;
