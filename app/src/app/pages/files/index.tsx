import BodyLayout from "../../layouts/BodyLayout";
import ViewFiles from "./ViewFiles";

const Files = (props: any) => {
  return (
    <BodyLayout {...props}>
      <ViewFiles />
    </BodyLayout>
  );
};

export default Files;
