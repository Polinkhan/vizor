import { useEffect } from "react";
import useSocket from "../../hooks/socket/use-socket";
import { clearCpuSeriesData, getCpuSeriesData, saveCpuSeriesData } from "../../common/storage-helper";
import { Grid, Stack, Typography } from "@mui/material";
import RealtimeChart from "./RealtimeChart";

const CpuUtilization = () => {
  return (
    <Stack flex={1} gap={4}>
      <RealtimeChart title="CPU Utilization" subheader="CPU Utilization" fetchMethod={getCpuSeriesData} />
      <DetailsView />
    </Stack>
  );
};

const DetailsView = () => {
  useEffect(() => {
    return () => {
      clearCpuSeriesData();
    };
  }, []);

  // ------------------------------------------
  // Fetching data
  // ------------------------------------------
  const { data: cpu_details } = useSocket({ type: "cpu_details", refreshAt: 360000 });
  const { data: cpu_utilization } = useSocket({ type: "cpu_utilization", refreshAt: 1000 });

  useEffect(() => {
    if (!cpu_utilization) return;
    saveCpuSeriesData(Number(cpu_utilization.usage));
  }, [cpu_utilization]);

  return (
    <Stack flex={1} flexDirection={"row"} gap={4}>
      <Stack px={2} flex={1} flexDirection={"row"} spacing={4}>
        <Stack minWidth={120}>
          <span style={{ fontSize: 14, color: "#888" }}>Utilization</span>
          <span style={{ fontSize: 22, fontWeight: 500 }}>{cpu_utilization?.usage}%</span>
        </Stack>
        <Stack minWidth={120}>
          <span style={{ fontSize: 14, color: "#888" }}>Speed</span>
          <span style={{ fontSize: 22, fontWeight: 500 }}>{cpu_utilization?.clockSpeed} MHz</span>
        </Stack>
        <Stack minWidth={120}>
          <span style={{ fontSize: 14, color: "#888" }}>Processes</span>
          <span style={{ fontSize: 22, fontWeight: 500 }}>{cpu_utilization?.processes}</span>
        </Stack>
        <Stack minWidth={120}>
          <span style={{ fontSize: 14, color: "#888" }}>Threads</span>
          <span style={{ fontSize: 22, fontWeight: 500 }}>{cpu_utilization?.threads}</span>
        </Stack>
      </Stack>

      <Stack minWidth={350} gap={1.5}>
        <InfoCard title="CPU Min Speed" value={cpu_details?.cpuMinMHz + " MHz"} />
        <InfoCard title="CPU Max Speed" value={cpu_details?.cpuMaxMHz + " MHz"} />
        <InfoCard title="Cores" value={cpu_details?.totalCores} />
        <InfoCard title="Threads" value={cpu_details?.totalThreads} />
        <InfoCard title="Virtualization" value={cpu_details?.virtualization} />
        <InfoCard title="L1 Cache" value={cpu_details?.l1Cache} />
        <InfoCard title="L2 Cache" value={cpu_details?.l2Cache} />
        <InfoCard title="L3 Cache" value={cpu_details?.l3Cache} />
      </Stack>
    </Stack>
  );
};

const InfoCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <Stack flexDirection={"row"} gap={4}>
      <Typography flex={1} variant="body2">
        {title}
      </Typography>
      <Typography flex={1} variant="body2" fontWeight={500}>
        {value}
      </Typography>
    </Stack>
  );
};

export default CpuUtilization;
