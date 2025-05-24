import { Typography } from "@mui/material";
import { HostType } from "./types/types.setup";

export const getErrorMessage = (err: any) => {
  const err_message = err?.response?.data?.message ?? err?.message;
  return <Typography variant="body2" dangerouslySetInnerHTML={{ __html: err_message }} />;
};

export const getHostList = () => {
  const host_list = localStorage.getItem("host_list");
  if (!host_list) {
    return [];
  } else {
    return JSON.parse(host_list) as HostType[];
  }
};

export const addNewHost = (props: Omit<HostType, "id">) => {
  const host_list = getHostList();

  const new_id = "host-" + new Date().getTime();
  const new_host = { ...props, id: new_id };
  const new_host_list = [...host_list, new_host];

  localStorage.setItem("host_list", JSON.stringify(new_host_list));
};
