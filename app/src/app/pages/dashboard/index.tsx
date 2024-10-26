import BodyLayout from "../../layouts/BodyLayout";
import DashboardView from "./DashboardView";

const Dashboard = (props: any) => {
  return (
    <BodyLayout {...props}>
      <DashboardView {...props} />
    </BodyLayout>
  );
};

export default Dashboard;
