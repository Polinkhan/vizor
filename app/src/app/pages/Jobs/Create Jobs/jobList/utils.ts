import { DateTime } from "../../../../common/common";
import { HeaderTypes, TableColumnType } from "../../../../common/types/types.table";
import { ActionField } from "./Components";

export const AvailableJobsTableHeader: HeaderTypes[] = [
  { label: "Job Name", width: 150 },
  { label: "Job Creator", align: "center", width: 200 },
  { label: "Created At", align: "center", width: 120 },
  { label: "Action", align: "center", width: 120 },
];

export const AvailableJobsColumns: TableColumnType[] = [
  { key: "name" },
  { key: "creator", align: "center" },
  { Component: DateTime, align: "center" },
  { Component: ActionField, align: "center" },
];
