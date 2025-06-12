import BodyLayout from "../../layouts/BodyLayout";
import CustomTabs, { tabListType } from "../../components/tab/CustomTabs";
import PortListView from "./(tabs)/port-list/PortListView";
import FirewallView from "./(tabs)/firewall/FirewallView";

const Network = (props: any) => {
  return (
    <BodyLayout {...props}>
      <CustomTabs tabList={TabList} />
    </BodyLayout>
  );
};

const TabList: tabListType[] = [
  {
    label: "Port List",
    component: <PortListView />,
  },
  {
    label: "Firewall",
    component: <FirewallView />,
  },
];

export default Network;
