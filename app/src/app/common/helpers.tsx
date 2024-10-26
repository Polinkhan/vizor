import { Typography } from "@mui/material";

export const getErrorMessage = (err: any) => {
  const err_message = err?.response?.data?.message ?? err?.message;
  return <Typography variant="body2" dangerouslySetInnerHTML={{ __html: err_message }} />;
};
