import * as Yup from "yup";

export const CronJobSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  teamId: Yup.number().required("Team is required"),
  startTime: Yup.string().required("Start time is required"),
  endTime: Yup.string().required("End time is required"),
  jobId: Yup.number().required("Job is required"),
});
