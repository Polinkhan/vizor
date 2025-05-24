import {
  Box,
  IconButton,
  Stack,
  SxProps,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
} from "@mui/material";
import TableHeadCustom from "./table-head-custom";
import { ReactNode } from "react";
import TablePaginationCustom from "./table-pagination-custom";
import TableSelectedAction from "./table-selected-action";
import { SVG } from "../images/Image";

// ------------------------------------------------------------------
// Interface for the StyledTableProps.
// Parameters:
// - table: The table configuration.
// - header: Header configuration.
// - sx: Styling properties.
// - children: Child components.
// - defined: A boolean indicating if the table is defined (optional).
// ------------------------------------------------------------------
interface StyledTableProps {
  data: any[];
  table: any;
  header: any;
  sx: SxProps;
  viewOnly?: boolean;
  children: ReactNode;
  paginated?: boolean;
}
// ------------------------------------------------------------------
// PaginatedStylesTable component for rendering a paginated table.
// Parameters:
// - children: Child components.
// - defined: A boolean indicating if the table is defined (optional).
// - table: The table configuration.
// - header: Header configuration.
// - sx: Styling properties.
// ------------------------------------------------------------------
const PaginatedStylesTable = ({
  data,
  children,
  table,
  header,
  sx,
  paginated,
}: StyledTableProps) => {
  return (
    <Box height={1} overflow={"hidden"}>
      <Stack sx={{ height: 1, justifyContent: "space-between" }}>
        <TableContainer
          sx={{
            height: 1,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <TableSelectedAction
            numSelected={table.selected.length}
            rowCount={data.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                data.map((row: any) => row.id)
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={() => {}}>
                  <SVG.stop />
                </IconButton>
              </Tooltip>
            }
          />

          <Table stickyHeader sx={{ zIndex: 9999, ...sx }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={header}
              rowCount={table.rowCount}
              numSelected={table.selected.length}
              onSort={table.onSort}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  data.map((_, i) => i)
                )
              }
            />
            <TableBody sx={{ height: 1, overflow: "auto" }}>
              {children}
            </TableBody>
          </Table>
        </TableContainer>

        {paginated && (
          <TablePaginationCustom table={table} count={table.rowCount} />
        )}
      </Stack>
    </Box>
  );
};

export default PaginatedStylesTable;
