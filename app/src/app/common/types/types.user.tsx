import { GridProps } from "@mui/material";
import { HFListType } from "../../components/hook-form/hf-select-field";
import { GroupType } from "./types.group";

export type Management = {
  id: number;
  name: string;
};

export type UserType = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  photoUrl: string;
  group: GroupType;
  teamId: number;
  accountStatus: "Active" | "Archived";
  management: Management;
};

export type HFInputFieldType = {
  type: "input";
  name: string;
  label: string;
  GridProps?: GridProps;
};

export type HFSelectFieldType = {
  type: "select";
  name: string;
  label: string;
  list: HFListType;
  GridProps?: GridProps;
};

export type HFMultiSelectFieldType<type> = {
  type: "multiSelect";
  name: string;
  label: string;
  options: type[];
  GridProps?: GridProps;
};

export type HFDateFieldType = {
  type: "date";
  name: string;
  label: string;
  GridProps?: GridProps;
};

export type HFFieldType = HFInputFieldType | HFSelectFieldType | HFMultiSelectFieldType<any> | HFDateFieldType;
