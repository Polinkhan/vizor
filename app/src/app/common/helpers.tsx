import { Typography } from "@mui/material";
import { HostType } from "./types/types.setup";

export const getSvgPath = (src: string) => {
  const path = `/icons/${src}.svg`;
  return path;
};

export const getImagePath = (src: string) => {
  const path = `/images/${src}.png`;
  return path;
};

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

export const convertBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes.toFixed(2)} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(2)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(2)} MB`;
  const gb = mb / 1024;
  if (gb < 1024) return `${gb.toFixed(2)} GB`;
  const tb = gb / 1024;
  return `${tb.toFixed(2)} TB`;
};
