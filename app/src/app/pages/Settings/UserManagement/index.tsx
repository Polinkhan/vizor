import BodyLayout from "../../../layouts/BodyLayout";
import UserManagementView from "./UserManagementView";

const UserManagement = (props: any) => {
  return (
    <BodyLayout {...props}>
      <UserManagementView />
    </BodyLayout>
  );
};

export default UserManagement;
