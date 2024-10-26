import { HeaderTypes, TableColumnType } from "../../common/types/types.table";

export const DashboardTableHeader: HeaderTypes[] = [
  { label: "Name", width: 250 },
  { label: "Specs", width: 350 },
];

export const DashboardTableColumns: TableColumnType[] = [
  { key: "service_name" },
  { key: "description" },
  { key: "description" },
];
