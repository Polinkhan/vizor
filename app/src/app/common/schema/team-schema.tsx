import * as Yup from "yup";

export const TeamSchema = Yup.object().shape({
  name: Yup.string().required("Team name is required"),
  description: Yup.string(),
  userList: Yup.object(),
});
