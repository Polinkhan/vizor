// const roleOptions = {
//   label: "Account Status",
//   data: [...new Set(data.map((row: any) => row.accountStatus))],
// };
import { Stack, SxProps, TableCell, TableRow, Typography } from "@mui/material";
import useTable from "../../hooks/custom/use-table";
import PaginatedStylesTable from "./paginated-styled-table";
import {
  TableProps,
  TablefilterListType,
  alignType,
} from "../../common/types/types.table";
import { useEffect } from "react";
import DefaultTableBody from "./default-table-body";
import TableToolbar from "./table-toolbar";
import useTableFilter from "../../hooks/custom/use-table-filter";

export const CustomTable = (props: TableProps) => {
  const {
    error,
    data,
    header,
    sx,
    config,
    iconButtons,
    disableFilter,
    resource,
    paginated = true,
    filterList = [],
    ...rest
  } = props;
  const table = useTable(config);

  const filterListwithData: TablefilterListType[] = [];
  filterList.map((props, index) => {
    filterListwithData[index] = { ...props, data: [] };
    filterListwithData[index].data = [
      ...new Set(data.map((row: any) => row[props.key])),
    ].sort();
  });

  const {
    filters,
    searchTerm,
    handleFilters,
    handleSearchFilters,
    filterData,
  } = useTableFilter({
    table,
    filterList: filterListwithData,
  });
  const dataFiltered = filterData({ tableData: data });

  return (
    <Stack height={1}>
      <TableToolbar
        filters={filters}
        onFilters={handleFilters}
        iconButtons={iconButtons}
        disableFilter={disableFilter}
        onSearch={handleSearchFilters}
        filterList={filterListwithData}
      />
      <PaginatedStylesTable
        data={dataFiltered || []}
        table={table}
        header={header}
        paginated={paginated}
        sx={{ ...sx }}
      >
        <RenderBody
          data={dataFiltered}
          table={table}
          header={header}
          paginated={paginated}
          resource={{ ...resource, search: searchTerm }}
          {...rest}
        />
      </PaginatedStylesTable>
    </Stack>
  );
};

interface RenderBodyProps extends Omit<TableProps, "filterKeys"> {
  table: any;
}

const RenderBody = (props: RenderBodyProps) => {
  let { TableBody, dataFormatter, data, table, ...rest } = props;

  data = dataFormatter ? dataFormatter(data) : data;

  // Update row count in the table.
  useEffect(() => {
    table.setRowCount(data.length);
  }, [data.length]);

  if (data.length === 0) return <NoDataFound />;

  if (TableBody) return <TableBody data={data} table={table} {...rest} />;
  else return <DefaultTableBody data={data} table={table} {...rest} />;
};

// ------------------------------------------------------------------
// NoDataFound component for displaying a message when no data is available.
// ------------------------------------------------------------------
export const NoDataFound = ({ size = "md" }: { size?: "sm" | "md" }) => {
  ``;
  const valueProp: { align?: alignType; sx?: SxProps } = {
    align: "center",
    sx: { p: size === "md" ? 5 : 0, bgcolor: "#fff" },
  };

  return (
    <TableRow sx={{ height: size === "md" ? "45vh" : 1 }}>
      <TableCell colSpan={99} {...valueProp}>
        {/* <SVG.FileNotFound default size={size === "md" ? 200 : 120} /> */}
        <Typography
          variant={"h6"}
          color={"grey.500"}
          pb={size === "sm" ? 2 : 0}
        >
          No data available in the table
        </Typography>
      </TableCell>
    </TableRow>
  );
};

// ------------------------------------------------------------------
// ErrorCell component for displaying a message error occured
// ------------------------------------------------------------------
// const ErrorCell = () => {
//   const valueProp: { align?: alignType; sx?: SxProps } = { align: "center", sx: { py: 1.1 } };

//   return (
//     <TableRow>
//       <TableCell colSpan={99} {...valueProp}>
//         Something went wrong !! Can't Get Table Data
//       </TableCell>
//     </TableRow>
//   );
// };
