import { tabListType } from "../../components/tab/CustomTabs";
import BodyLayout from "../../layouts/BodyLayout";
import DatabaseView from "./(tabs)/database/DatabaseView";
import DockerView from "./(tabs)/docker/DockerView";
import ServicesView from "./(tabs)/services/ServicesView";
import CustomTabs from "../../components/tab/CustomTabs";
const Services = (props: any) => {
  return (
    <BodyLayout {...props}>
      <CustomTabs orientation="vertical" tabList={TabList} />
    </BodyLayout>
  );
};

const TabList: tabListType[] = [
  {
    label: "Services",
    component: <ServicesView />,
  },
  {
    label: "Docker",
    component: <DockerView />,
  },
  {
    label: "Database",
    component: <DatabaseView />,
  },
];
export default Services;
