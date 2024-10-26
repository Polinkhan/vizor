import { FetchApiType } from "../../../common/types/types.api";
import CustomTabs, { tabListType } from "../../../components/tab/CustomTabs";
import useMultiFetch from "../../../hooks/fetch/ use-multi-fetch";
import { CircleLoading } from "../../../components/animate/LoadingScreen";
import useRerender from "../../../hooks/custom/use-rerender";
import GroupTable from "./GroupTable";
import UserTable from "./UserTable";
import TeamTable from "./TeamTable";

const UserManagementView = () => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const { render, reRender } = useRerender();

  // ------------------------------------------
  // Fetching data
  // ------------------------------------------
  const apis: FetchApiType[] = [
    { method: "GET", type: "user", url: "get_all_user" },
    { method: "GET", type: "group", url: "get_all_group" },
    { method: "GET", type: "team", url: "get_all_team_with_users" },
  ];
  const { data } = useMultiFetch({ apis, dependency: [render] });
  if (!data) return <CircleLoading />;

  // ------------------------------------------
  // Variables
  // ------------------------------------------
  const TabList: tabListType[] = [
    {
      label: "User",
      component: <UserTable data={data[0]} reRender={reRender} />,
    },
    {
      label: "Group",
      component: <GroupTable data={data[1]} reRender={reRender} />,
    },
    {
      label: "Team",
      component: <TeamTable data={data[2]} reRender={reRender} />,
    },
  ];

  // ------------------------------------------
  // Render Component
  // ------------------------------------------
  return <CustomTabs tabList={TabList} />;
};

// ------------------------------------------
// User Tab Component
// ------------------------------------------

export default UserManagementView;
