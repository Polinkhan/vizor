import * as Yup from "yup";

export const defaultValues = {
  email: "", // Initial value for the email field
  password: "", // Initial value for the password field
};

// Define a validation schema for the login form using Yup.
export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required") // Email field is required
    .email("Email must be a valid email address"), // Email field should be a valid email address
  password: Yup.string().required("Password is required"), // Password field is required
});
