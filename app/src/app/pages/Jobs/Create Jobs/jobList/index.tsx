import { FetchApiType } from "../../../../common/types/types.api";
import ComponentLoader from "../../../../components/lodaer/ComponentLoader";
import useRerender from "../../../../hooks/custom/use-rerender";
import useFetch from "../../../../hooks/fetch/use-fetch";
import BodyLayout from "../../../../layouts/BodyLayout";
import JobListView from "./JobListView";

const JobList = (props: any) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const { render, reRender } = useRerender();

  // ------------------------------------------
  // Fetch Data
  // ------------------------------------------
  const api: FetchApiType = { method: "GET", type: "job", url: "get_all_available_job" };
  const { data } = useFetch({ api, dependency: [render] });
  return (
    <BodyLayout {...props}>
      <ComponentLoader data={data}>
        <JobListView data={data} reRender={reRender} />
      </ComponentLoader>
    </BodyLayout>
  );
};

export default JobList;
