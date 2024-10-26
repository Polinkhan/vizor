import { useParams } from "react-router-dom";
import BodyLayout from "../../../../layouts/BodyLayout";
import ManageTeamView from "./ManageTeamView";
import useFetch from "../../../../hooks/fetch/use-fetch";
import { FetchApiType } from "../../../../common/types/types.api";
import { CircleLoading } from "../../../../components/animate/LoadingScreen";

const ManageTeam = (props: any) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const { id } = useParams();

  // ------------------------------------------
  // Fetch Data
  // ------------------------------------------
  const api: FetchApiType = { method: "GET", type: "team", url: `get_team_by_id/${id}` };
  const { data } = useFetch({ api });

  // ------------------------------------------
  // Render Component
  // ------------------------------------------

  if (!data) return <CircleLoading />;

  return (
    <BodyLayout {...props}>
      <ManageTeamView team={data} />
    </BodyLayout>
  );
};

export default ManageTeam;
