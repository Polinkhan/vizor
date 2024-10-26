import { FetchApiType } from "../../../../common/types/types.api";
import ComponentLoader from "../../../../components/lodaer/ComponentLoader";
import { useAuthContext } from "../../../../hooks/context/use-auth-context";
import useRerender from "../../../../hooks/custom/use-rerender";
import useFetch from "../../../../hooks/fetch/use-fetch";
import BodyLayout from "../../../../layouts/BodyLayout";
import MyJobsView from "./MyJobsView";

const MyJobs = (props: any) => {
  // --------------------------------------------
  // Hooks
  // --------------------------------------------
  const { currentUser } = useAuthContext();
  const { reRender, render } = useRerender();
  const teamId = currentUser.teamId;

  // --------------------------------------------
  // Fetch data
  // --------------------------------------------
  const url = `get_my_jobs_by_team/${teamId}`;
  const api: FetchApiType = { type: "job", method: "GET", url };
  const { data } = useFetch({ api, dependency: [render] });

  return (
    <BodyLayout {...props}>
      <ComponentLoader data={data}>
        <MyJobsView data={data} reRender={reRender} />
      </ComponentLoader>
    </BodyLayout>
  );
};

export default MyJobs;
