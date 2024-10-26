import { useParams } from "react-router-dom";
import BodyLayout from "../../../../layouts/BodyLayout";
import ManageProfileView from "./ManageUserView";
import useFetch from "../../../../hooks/fetch/use-fetch";
import { FetchApiType } from "../../../../common/types/types.api";
import { CircleLoading } from "../../../../components/animate/LoadingScreen";

const ManageUser = (props: any) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const { id } = useParams();

  // ------------------------------------------
  // Fetch Data
  // ------------------------------------------
  const api: FetchApiType = { method: "GET", type: "user", url: `get_user_by_id/${id}` };
  const { data } = useFetch({ api });

  // ------------------------------------------
  // Render Component
  // ------------------------------------------

  if (!data) return <CircleLoading />;

  return (
    <BodyLayout {...props}>
      <ManageProfileView user={data} />
    </BodyLayout>
  );
};

export default ManageUser;
