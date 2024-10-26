import BodyLayout from "../../layouts/BodyLayout";
import ServicesView from "./ServicesView";

const Services = (props: any) => {
  return (
    <BodyLayout {...props}>
      <ServicesView />
    </BodyLayout>
  );
};

export default Services;
