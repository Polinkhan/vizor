// @mui
import { Theme, SxProps } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";

// ----------------------------------------------------------------------

interface Props {
  rowsPerPageOptions?: number[];
  sx?: SxProps<Theme>;
  table: any;
  count: number;
}

const defaultOption = [10, 25, 50, 100];

const TablePaginationCustom = ({ rowsPerPageOptions = defaultOption, sx, table, count }: Props) => {
  return (
    <Box sx={{ position: "relative", ...sx, justifySelf: "end", borderTop: "1px dashed #eee" }}>
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
    </Box>
  );
};

export default TablePaginationCustom;
