import { Stack } from "@mui/material";
import { TablefilterListType } from "../../../../common/types/types.table";
import ComponentLoader from "../../../../components/lodaer/ComponentLoader";
import RefreshSelect from "../../../../components/refresh/RefreshSelect";
import { CustomTable } from "../../../../components/table/custom-table";
import useRefresh from "../../../../hooks/custom/use-refresh";
import useRerender from "../../../../hooks/custom/use-rerender";
import useSocket from "../../../../hooks/socket/use-socket";
import { PortLissenTableColumns, PortLissenTableHeader } from "../../utils";
import ErrorHandler from "./ErrorHandler";

const PortListView = () => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const { render, reRender } = useRerender();
  const { refreshAt, RefreshProps } = useRefresh();

  // ------------------------------------------
  // Fetching data
  // ------------------------------------------
  const { data }: any = useSocket({ type: "port_list", dependencies: [render, refreshAt], refreshAt });

  // ------------------------------------------
  // variables
  // ------------------------------------------
  const iconButtons = [<RefreshSelect {...RefreshProps} />];

  // ------------------------------------------
  // Table props
  // ------------------------------------------
  const filterList: Omit<TablefilterListType, "data">[] = [
    { label: "Protocol", key: "protocol", defaultFilters: ["tcp", "udp", "tcp6", "udp6"] },
    { label: "Program", key: "program", defaultFilters: [] },
  ];

  console.log(data);

  if (data?.success === false) {
    return <ErrorHandler error_code={data?.error_code} reRender={reRender} />;
  }

  return (
    <ComponentLoader data={data}>
      <CustomTable
        data={data}
        filterList={filterList}
        iconButtons={iconButtons}
        header={PortLissenTableHeader}
        config={{ defaultRowsPerPage: 25 }}
        resource={{ columns: PortLissenTableColumns, reRender }}
      />
    </ComponentLoader>
  );
};

export default PortListView;
