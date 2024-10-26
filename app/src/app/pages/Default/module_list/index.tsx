import ModuleListView from "./ModuleListView";
import BodyLayout from "../../../layouts/BodyLayout";

const ModuleList = (props: any) => {
  return (
    <BodyLayout {...props} viewOption>
      <ModuleListView key={props.id} {...props} />
    </BodyLayout>
  );
};

export default ModuleList;
