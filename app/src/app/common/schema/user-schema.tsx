import * as Yup from "yup";

export const UserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().required("Email is required").email("Email must be a valid email address").trim().lowercase(),
  phone: Yup.string().nullable().notRequired(), // Accepts empty values
  password: Yup.string().nullable().notRequired(), // Accepts empty values
  role: Yup.string().required("Role is required"),
  groupId: Yup.number().required("Group ID is required"),
});

export const UserCreateSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().required("Email is required").email("Email must be a valid email address").trim().lowercase(),
  phone: Yup.string().nullable().notRequired(),
  password: Yup.string().required("Password is required").min(8, "Password must be at least 8 charecter long"),
  role: Yup.string().required("Role is required"),
  groupId: Yup.number().required("Group ID is required"),
});
