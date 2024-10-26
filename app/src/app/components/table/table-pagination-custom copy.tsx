/*
 * Project Name : "Aerosphare Suit"
 *
 * Author: Abu Sayed Polin
 * Copyright : "Brotecs Technologies Limited"
 *
 * Created: 2023-09-28 23:46:42
 * Modified: 2023-09-28 23:46:42
 *
 * File: TablePaginationCustom.tsx
 * Description: Contains the custom table pagination component.
 */

// Import necessary modules from MUI and React
import { Theme, SxProps } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import { CircularProgress, Pagination, Stack } from "@mui/material";

// ------------------------------------------------------------------
// Interface for the TablePaginationCustom component props.
// Parameters:
// - rowsPerPageOptions: Options for rows per page selection.
// - sx: Styling properties.
// - table: Table data and control functions.
// - count: Total number of items to be paginated.
// - defined: Flag indicating if pagination is defined.
// ------------------------------------------------------------------
interface Props {
  rowsPerPageOptions?: number[]; // Options for rows per page selection.
  sx?: SxProps<Theme>; // Styling properties.
  table: any; // Table data and control functions.
  count: number; // Total number of items to be paginated.
  defined?: boolean; // Flag indicating if pagination is defined.
}

// Default rows per page options
const defaultOption = [10, 25, 50, 100];

// ------------------------------------------------------------------
// TablePaginationCustom component for rendering custom table pagination.
// Parameters:
// - rowsPerPageOptions: Options for rows per page selection.
// - sx: Styling properties.
// - table: Table data and control functions.
// - count: Total number of items to be paginated.
// - defined: Flag indicating if pagination is defined.
// ------------------------------------------------------------------
const TablePaginationCustom = ({ rowsPerPageOptions = defaultOption, sx, table, count = 0, defined }: Props) => {
  if (defined) {
    return (
      <Stack
        direction={{ xs: "column", sm: "row" }}
        pt={{ xs: 2, sm: 0 }}
        sx={{ position: "relative", ...sx, justifyContent: "end", alignItems: "center", borderTop: "1px dashed #eee" }}
      >
        <Stack
          direction={"row"}
          justifySelf={"center"}
          alignItems={"center"}
          sx={{ position: { xs: "static", sm: "absolute" }, left: { sm: "0%", lg: "50%" }, transform: { lg: "translateX(-50%)" } }}
        >
          <Pagination
            color="primary"
            page={table.page + 1}
            count={Math.ceil(count / table.rowsPerPage)}
            onChange={(e, _) => table.onChangePage(e, _ - 1)}
          />
        </Stack>
        <Stack direction={"row"} justifySelf={"center"} alignItems={"center"}>
          {table.loading && <CircularProgress size={16} />}
          <TablePagination
            count={count}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            nextIconButtonProps={{ style: { display: "none" } }}
            backIconButtonProps={{ style: { display: "none" } }}
            sx={{ borderTopColor: "transparent", justifySelf: "end", ...sx }}
          />
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack direction={"row"} sx={{ position: "relative", ...sx, justifyContent: "end", alignItems: "center" }}>
      <TablePagination
        count={count || 0}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        sx={{ borderTopColor: "transparent", ...sx }}
      />
    </Stack>
  );
};

export default TablePaginationCustom;
