import { useParams } from "react-router-dom";
import BodyLayout from "../../../../layouts/BodyLayout";
import ManageGroupView from "./ManageGroupView";
import { FetchApiType } from "../../../../common/types/types.api";
import { CircleLoading } from "../../../../components/animate/LoadingScreen";
import useMultiFetch from "../../../../hooks/fetch/ use-multi-fetch";

const ManageGroup = (props: any) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const { id } = useParams();

  // ------------------------------------------
  // Fetch Data
  // ------------------------------------------
  const apis: FetchApiType[] = [
    { method: "GET", type: "group", url: `get_group_by_id/${id}` },
    { method: "GET", type: "ui", url: `/all_modules` },
  ];
  const { data } = useMultiFetch({ apis });

  // ------------------------------------------
  // Render Component
  // ------------------------------------------
  if (!data) return <CircleLoading />;

  return (
    <BodyLayout {...props}>
      <ManageGroupView data={data} />
    </BodyLayout>
  );
};

export default ManageGroup;
