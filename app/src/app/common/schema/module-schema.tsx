import * as Yup from "yup";

export const ModuleSchema = Yup.object().shape({
  url: Yup.string().required("URL is required"),
  name: Yup.string().required("Name is required"),
  section: Yup.string().required("Section is required"),
  parentId: Yup.number().required("Parrent module is required").nullable(),
});
