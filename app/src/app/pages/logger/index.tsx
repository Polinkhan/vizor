import BodyLayout from "../../layouts/BodyLayout";
import LoggerView from "./LoggerView";

const Logger = (props: any) => {
  return (
    <BodyLayout {...props}>
      <LoggerView />
    </BodyLayout>
  );
};

export default Logger;
