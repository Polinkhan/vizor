// Import necessary modules from MUI
import Skeleton from "@mui/material/Skeleton";
import { TableRowProps } from "@mui/material/TableRow";
import { StyledTableRow } from "./styled-table";
import { TableCell } from "@mui/material";

// ------------------------------------------------------------------
// Interface for the TableSkeleton component props.
// Parameters:
// - header: Array of header labels.
// ------------------------------------------------------------------
interface TableSkeletonProps extends TableRowProps {
  header: any;
  viewOnly?: boolean;
}

// ------------------------------------------------------------------
// TableSkeleton component for rendering loading placeholders.
// Parameters:
// - header: Array of header labels.
// - other: Additional TableRowProps.
// ------------------------------------------------------------------
export default function TableSkeleton({ header, viewOnly, ...other }: TableSkeletonProps) {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((id) => (
        <StyledTableRow key={id} {...other}>
          {header.map((_: any, i: number) => {
            if (viewOnly && header[i].label?.toLowerCase() === "action") return;

            return (
              <TableCell key={i} sx={{ height: 45 }}>
                <Skeleton sx={{ flex: 1, height: 8 }} />
              </TableCell>
            );
          })}
        </StyledTableRow>
      ))}
    </>
  );
}
