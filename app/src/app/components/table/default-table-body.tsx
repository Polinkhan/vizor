import { Checkbox, SxProps, TableCell, TableRow, Typography } from "@mui/material";
import { alignType, TableBodyProps, TableColumnType } from "../../common/types/types.table";

const TableBody = ({ data, table, resource }: TableBodyProps) => {
  const { page, rowsPerPage } = table;

  data = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const prevIndex = page * rowsPerPage;
  return (
    <>
      {data.map((val: any, index: any) => (
        <TableRowComponent
          key={prevIndex + index}
          val={val}
          resource={resource}
          selected={table.selected.includes(index)}
          onSelectRow={() => table.onSelectRow(index)}
        />
      ))}
    </>
  );
};

interface TableRowComponentProps {
  val: any;
  resource: any;
  selected: boolean;
  onSelectRow: VoidFunction;
}

const TableRowComponent = ({ val, resource, selected, onSelectRow }: TableRowComponentProps) => {
  const valueProp: { align?: alignType; sx?: SxProps } = { align: "center" };
  const { columns } = resource;

  return (
    <TableRow>
      <TableCell padding="checkbox" align="center">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      {columns.map((_key: TableColumnType, i: number) => {
        let { key, Component, formatter, align } = _key;
        if (!formatter)
          formatter = (data: any) => {
            if (Array.isArray(data)) {
              return data.map((list, i) => (
                <Typography key={i} fontSize={13}>
                  {list}
                </Typography>
              ));
            } else return data;
          };
        return (
          <TableCell {...valueProp} align={align ?? "left"} key={i} sx={{ p: 1.5 }}>
            {Component ? (
              <Component {...resource} data={key ? val[key] : val} />
            ) : (
              // @ts-ignore
              formatter(val[key])
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default TableBody;
