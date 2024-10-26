import { HeaderTypes, TableColumnType } from "../../common/types/types.table";
import { ActionField, ActiveState, CpuInfo, LoadState, MemInfo, Status } from "./components/Components";

export const ServicesTableHeader: HeaderTypes[] = [
  { label: "Service name", width: 250 },
  { label: "Description", width: 350 },
  { label: "PID", align: "center", width: 120 },
  { label: "CPU Usage", align: "center", width: 120 },
  { label: "Memory Usage", align: "center", width: 150 },
  { label: "Active State", align: "center", width: 150 },
  { label: "Load State", align: "center", width: 150 },
  { label: "Sub State", align: "center", width: 150 },
  { label: "Action", align: "center", width: 150 },
];

export const ServicesTableColumns: TableColumnType[] = [
  { key: "service_name" },
  { key: "description" },
  { key: "pid", align: "center" },
  { Component: CpuInfo, align: "center" },
  { Component: MemInfo, align: "center" },
  { Component: ActiveState, align: "center" },
  { Component: LoadState, align: "center" },
  { Component: Status, align: "center" },
  { Component: ActionField, align: "center" },
];
