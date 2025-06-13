import { Stack } from "@mui/material";
import CustomTabs, { tabListType } from "../../components/tab/CustomTabs";
import { SVG } from "../../components/images/icons";
import CpuUtilization from "./CpuUtilization";
import MemoryUtilization from "./MemoryUtilization";
import NetworkUsage from "./NetworkUsage";

const TaskManagerView = () => {
  return (
    <Stack flex={1}>
      <CustomTabs gap={4} tabList={tabList} orientation="vertical" />
    </Stack>
  );
};

const tabList: tabListType[] = [
  {
    label: "CPU",
    icon: <SVG.cpu size={32} />,
    component: <CpuUtilization />,
  },
  {
    label: "Memory",
    icon: <SVG.memory size={32} />,
    component: <MemoryUtilization />,
  },
  {
    label: "Network",
    icon: <SVG.download size={32} />,
    component: <NetworkUsage />,
  },
  {
    label: "Disk",
    icon: <SVG.disk size={32} />,
    component: <div>Disk</div>,
  },
];

export default TaskManagerView;
