import BodyLayout from "../../layouts/BodyLayout";
import TaskManagerView from "./TaskManagerView";
const TaskManager = (props: any) => {
  return (
    <BodyLayout {...props}>
      <TaskManagerView />
    </BodyLayout>
  );
};

export default TaskManager;
