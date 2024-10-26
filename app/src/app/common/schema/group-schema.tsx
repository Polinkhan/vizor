import * as Yup from "yup";

export const GroupSchema = Yup.object().shape({
  name: Yup.string().required("Group name is required"),
  description: Yup.string(),
});
