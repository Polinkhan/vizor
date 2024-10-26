import dayjs from "dayjs";
import { TableComponentProps } from "./types/types.table";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getRatio(ratio = "1/1") {
  return {
    "4/3": "calc(100% / 4 * 3)",
    "3/4": "calc(100% / 3 * 4)",
    "6/4": "calc(100% / 6 * 4)",
    "4/6": "calc(100% / 4 * 6)",
    "16/9": "calc(100% / 16 * 9)",
    "9/16": "calc(100% / 9 * 16)",
    "21/9": "calc(100% / 21 * 9)",
    "9/21": "calc(100% / 9 * 21)",
    "1/1": "100%",
  }[ratio];
}

export const ModuleView = {
  GetType: () => {
    let currentType: "list" | "grid" | null = localStorage.getItem("moduleViewType") as "list" | "grid" | null;
    if (currentType === null) {
      currentType = "grid";
    }
    return currentType;
  },
  SetType: (type: "list" | "grid") => {
    localStorage.setItem("moduleViewType", type);
  },
};

export const ConvertTime = (second: any) => {
  if (second >= 86400) {
    const day = parseInt((second / 86400) as any);
    second -= day * 86400;
    const remains: any = ConvertTime(second % 86400);
    return `${day}d : ${remains}`;
  }
  if (second >= 3600) {
    const hour = parseInt((second / 3600) as any);
    second -= hour * 3600;
    const remains: any = ConvertTime(second % 3600);
    return `${hour}h : ${remains}`;
  }
  if (second >= 60) {
    const min = parseInt((second / 60) as any);
    const remains: any = ConvertTime(second % 60);
    return `${min}m : ${remains}`;
  }
  const sec = parseInt(second as any);
  return `${sec.toFixed(0)}s`;
};

export const parseDateTime = (dateTimeString: string) => {
  console.log(dateTimeString);
  return dayjs(dateTimeString, "YYYY-MM-DD HH:mm:ss.SSS").toDate();
};

export const capitalizeFirstLetter = (string: string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const ConvertToUTCTime = (time: number | string) => {
  const local_Date = new Date(time);
  const UTC_Date = new Date(local_Date.getTime() - local_Date.getTimezoneOffset() * 60000);
  return UTC_Date.getTime();
};

export const DateTime = ({ data }: TableComponentProps<any>) => {
  return new Date(data.createdAt).toLocaleString();
};
