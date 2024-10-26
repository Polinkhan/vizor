import { SxProps } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import { UseTableProps } from "../../hooks/custom/use-table";

export type alignType = "left" | "right" | "center";

export interface HeaderTypes {
  label: string;
  align?: alignType;
  width?: number;
  sx?: SxProps;
}

type TableColumnType1 = {
  key?: string;
  width?: number | string;
  align?: alignType;
  isActionComponent?: boolean;
  formatter?: (any: any) => any;
  Component: (props: any) => any;
};

type TableColumnType2 = {
  key: string;
  width?: number | string;
  align?: alignType;
  Component?: null;
  isActionComponent?: boolean;
  formatter?: (any: any) => any;
};

export type TableColumnType = TableColumnType1 | TableColumnType2;

export interface TableBodyProps {
  data: any;
  table: any;
  resource?: { columns: TableColumnType[] };
  header: HeaderTypes[];
}

export type TableRecourseType = {
  reRender?: any;
  columns: TableColumnType[];
  search?: string;
  permissions?: string[];
  callback?: (any?: any) => any;
};

export type TablefilterListType = {
  key: string;
  label: string;
  data: any[];
  defaultFilters: string[];
};

export interface TableProps {
  data: any;
  error?: any;
  sx?: SxProps;
  header: HeaderTypes[];
  filterList?: Omit<TablefilterListType, "data">[];
  iconButtons?: ReactNode[];
  dataFormatter?: (any: any) => any;
  TableBody?: FunctionComponent<TableBodyProps>;
  resource: TableRecourseType;
  config?: UseTableProps;
  table?: any;
  disableFilter?: boolean;
}

export interface TableComponentProps<T> extends Omit<TableRecourseType, "columns"> {
  data: T;
}
