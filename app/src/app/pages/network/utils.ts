import { HeaderTypes, TableColumnType } from "../../common/types/types.table";

export const PortLissenTableHeader: HeaderTypes[] = [
  { label: "Protocol", align: "left" },
  { label: "Program", align: "left" },
  { label: "Port", align: "left" },
  { label: "Host", align: "left" },
  { label: "PID", align: "left" },
];

export const PortLissenTableColumns: TableColumnType[] = [
  { key: "protocol", align: "left" },
  { key: "program", align: "left" },
  { key: "port", align: "left" },
  { key: "host", align: "left" },
  { key: "pid", align: "left" },
];
