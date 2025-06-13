import { TablefilterListType } from "../../../../common/types/types.table";
import { CustomTable } from "../../../../components/table/custom-table";
import { ServicesTableHeader, ServicesTableColumns } from "../../utils";
import useRerender from "../../../../hooks/custom/use-rerender";
import ComponentLoader from "../../../../components/lodaer/ComponentLoader";
import useRefresh from "../../../../hooks/custom/use-refresh";
import RefreshSelect from "../../../../components/refresh/RefreshSelect";
import useSocket from "../../../../hooks/socket/use-socket";

const ServicesView = () => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const { render, reRender } = useRerender();
  const { refreshAt, RefreshProps } = useRefresh();

  // ------------------------------------------
  // Fetching data
  // ------------------------------------------
  const { data } = useSocket({ type: "services", dependencies: [render], refreshAt });

  // ------------------------------------------
  // variables
  // ------------------------------------------
  const iconButtons = [<RefreshSelect {...RefreshProps} />];

  // ------------------------------------------
  // Table props
  // ------------------------------------------
  const filterList: Omit<TablefilterListType, "data">[] = [
    { label: "Active State", key: "active", defaultFilters: ["active"] },
    { label: "Sub State", key: "sub", defaultFilters: ["running", "dead"] },
  ];

  return (
    <ComponentLoader data={data}>
      <CustomTable
        data={data}
        filterList={filterList}
        iconButtons={iconButtons}
        header={ServicesTableHeader}
        resource={{ columns: ServicesTableColumns, reRender }}
      />
    </ComponentLoader>
  );
};

export default ServicesView;
