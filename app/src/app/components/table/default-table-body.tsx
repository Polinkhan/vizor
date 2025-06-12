import { Checkbox, SxProps, TableCell, TableRow, Typography } from "@mui/material";
import { alignType, TableBodyProps, TableColumnType, TableRecourseType } from "../../common/types/types.table";

const TableBody = ({ data, table, resource, paginated }: TableBodyProps) => {
  const { page, rowsPerPage } = table;

  if (paginated) {
    data = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }

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
  selected: boolean;
  onSelectRow: VoidFunction;
  resource: TableRecourseType;
}

const TableRowComponent = ({ val, resource, selected, onSelectRow }: TableRowComponentProps) => {
  const valueProp: { align?: alignType; sx?: SxProps } = { align: "center" };
  const { columns, search } = resource;

  const highlightSearchTerm = (text: string, term: string | undefined) => {
    if (!term || !text) return text;
    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(regex, `<mark>$1</mark>`);
  };

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
            } else {
              return (
                <Typography
                  fontSize={13}
                  dangerouslySetInnerHTML={{
                    __html: highlightSearchTerm(data, search),
                  }}
                />
              );
            }
          };
        return (
          <TableCell {...valueProp} align={align ?? "left"} key={i} sx={{ px: 2, py: 1.2 }}>
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
