import { TablefilterListType } from "../../common/types/types.table";
import { CustomTable } from "../../components/table/custom-table";
import { ServicesTableHeader, ServicesTableColumns } from "./utils";
import useRerender from "../../hooks/custom/use-rerender";
import { FetchApiType } from "../../common/types/types.api";
import ComponentLoader from "../../components/lodaer/ComponentLoader";
import useIntervalFetch from "../../hooks/fetch/use-interval-fetch";
import useRefresh from "../../hooks/custom/use-refresh";
import RefreshSelect from "../../components/refresh/RefreshSelect";

const ServicesView = () => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const { render, reRender } = useRerender();
  const { refreshAt, RefreshProps } = useRefresh();

  // ------------------------------------------
  // Fetching data
  // ------------------------------------------
  const api: FetchApiType = { method: "GET", url: "api/service" };
  const { data } = useIntervalFetch({ api, dependency: [render], intervalTime: refreshAt });

  // ------------------------------------------
  // variables
  // ------------------------------------------
  const iconButtons = [<RefreshSelect {...RefreshProps} />];

  // ------------------------------------------
  // Table props
  // ------------------------------------------
  const filterList: Omit<TablefilterListType, "data">[] = [
    { label: "Active State", key: "active", defaultFilters: ["active", "inactive"] },
    { label: "Sub State", key: "sub", defaultFilters: ["running", "dead"] },
    { label: "Load State", key: "load", defaultFilters: [] },
  ];

  return (
    <ComponentLoader data={data}>
      <CustomTable
        data={data}
        filterList={filterList}
        header={ServicesTableHeader}
        iconButtons={iconButtons}
        resource={{ columns: ServicesTableColumns, reRender }}
      />
    </ComponentLoader>
  );
};

export default ServicesView;
