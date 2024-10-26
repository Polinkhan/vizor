import { HeaderTypes, TableColumnType } from "../../../common/types/types.table";
import { ActionField, Profile, TeamUserlist, UserAccountStatus, UserGroupField } from "./Components";

export const UserTableHeader: HeaderTypes[] = [
  { label: "User", width: 250 },
  { label: "Role", align: "center" },
  { label: "Group", align: "center" },
  { label: "Team", align: "center" },
  { label: "Phone", align: "center" },
  { label: "Account Status", align: "center" },
  { label: "Action", align: "center" },
];

export const UserColumns: TableColumnType[] = [
  { Component: Profile },
  { key: "role", align: "center" },
  { Component: UserGroupField, align: "center" },
  { key: "team", align: "center" },
  { key: "phone", align: "center" },
  { Component: UserAccountStatus, align: "center" },
  { Component: ActionField, align: "center" },
];

export const GroupTableHeader: HeaderTypes[] = [
  { label: "Group", width: 350 },
  { label: "Description", width: 600 },
  { label: "Action", align: "center", width: 200 },
];
export const GroupColumns: TableColumnType[] = [
  { Component: Profile },
  { key: "description" },
  { Component: ActionField, align: "center" },
];

export const TeamTableHeader: HeaderTypes[] = [
  { label: "Team", width: 350 },
  { label: "Description", width: 300 },
  { label: "Users", width: 600 },
  { label: "Action", align: "center", width: 200 },
];
export const TeamColumns: TableColumnType[] = [
  { Component: Profile },
  { key: "description" },
  { Component: TeamUserlist },
  { Component: ActionField, align: "center" },
];
