import { useEffect } from "react";
import useSocket from "../../hooks/socket/use-socket";
import { clearMatrixData, saveMatrixData } from "../../common/storage-helper";
import { Stack, Typography } from "@mui/material";
import RealtimeChart from "./RealtimeChart";
import { REALTIME_INTERVAL } from "../../common/config/config";
import useSocketFetch from "../../hooks/socket/use-socket-fetch";
import Slide from "../../components/animate/Slide";

const CpuUtilization = () => {
  return (
    <Stack flex={1} gap={4}>
      <RealtimeChart
        chartFor="cpu"
        title="CPU Utilization"
        subheader="CPU Utilization"
        chartOption={{
          yaxis: {
            max: 100,
            stepSize: 20,
            labels: {
              formatter: (value: number) => `${value.toFixed(0)}%`,
            },
          },
        }}
        series={[
          {
            name: "CPU Usage",
            data: [0],
          },
        ]}
      />
      <DetailsView />
    </Stack>
  );
};

const DetailsView = () => {
  useEffect(() => {
    return () => {
      clearMatrixData("cpu");
    };
  }, []);

  // ------------------------------------------
  // Fetching data
  // ------------------------------------------
  const { data: cpu_details } = useSocketFetch({ type: "cpu_details" });
  const { data: cpu_utilization } = useSocket({ type: "cpu_utilization", refreshAt: REALTIME_INTERVAL });

  useEffect(() => {
    if (!cpu_utilization) return;
    const data = [{ data: [Number(cpu_utilization.usage)] }];
    saveMatrixData("cpu", data);
  }, [cpu_utilization]);

  if (!cpu_utilization || !cpu_details) return null;

  return (
    <Stack flex={1} flexDirection={"row"} gap={4}>
      <Stack px={2} flex={1} flexDirection={"row"} spacing={4} flexWrap={"wrap"}>
        <MatricsCard title="Utilization" value={cpu_utilization?.usage + "%"} />
        <MatricsCard title="Speed" value={cpu_utilization?.clockSpeed + " MHz"} />
        <MatricsCard title="Processes" value={cpu_utilization?.processes} />
        <MatricsCard title="Threads" value={cpu_utilization?.threads} />
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

const MatricsCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <Stack flex={1} component={Slide} from="Up" withFade>
      <span style={{ fontSize: 14, color: "#888" }}>{title}</span>
      <span style={{ fontSize: 22, fontWeight: 500 }}>{value}</span>
    </Stack>
  );
};

const InfoCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <Stack flexDirection={"row"} gap={4} component={Slide} withFade>
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
