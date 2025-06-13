import { Divider, Stack, Typography } from "@mui/material";
import RealtimeChart from "./RealtimeChart";
import { useEffect } from "react";
import { clearMatrixData, saveMatrixData } from "../../common/storage-helper";
import useSocket from "../../hooks/socket/use-socket";
import { REALTIME_INTERVAL } from "../../common/config/config";
import useSocketFetch from "../../hooks/socket/use-socket-fetch";
import Slide from "../../components/animate/Slide";

const MemoryUtilization = () => {
  const { data } = useSocketFetch({ type: "memory_utilization" });
  if (!data) return null;

  const total = Math.ceil(data.total / 1024);

  return (
    <Stack flex={1} gap={4}>
      <RealtimeChart
        legend={true}
        chartFor="memory"
        title="Memory Utilization"
        subheader="Memory Utilization"
        chartOption={{
          yaxis: {
            max: total,
            stepSize: total > 8 ? 4 : 2,
            labels: {
              formatter: (value: number) => `${value.toFixed(0)} GB`,
            },
          },
          tooltip: {
            y: {
              formatter: (value: number) => `${value.toFixed(0)} GB`,
            },
          },
        }}
        series={[
          {
            name: "Memory Usage",
            data: [0],
          },
          {
            name: "Swap Usage",
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
      clearMatrixData("memory");
    };
  }, []);

  // ------------------------------------------
  // Fetching data
  // ------------------------------------------
  const { data: memory_utilization } = useSocket({ type: "memory_utilization", refreshAt: REALTIME_INTERVAL });

  useEffect(() => {
    if (!memory_utilization) return;
    const data = [
      { data: [Number(memory_utilization.used) / 1024] },
      { data: [Number(memory_utilization.swapUsed) / 1024] },
    ];
    saveMatrixData("memory", data);
  }, [memory_utilization]);

  if (!memory_utilization) return null;

  // Helper to format MB values
  const formatUnit = (value: number | undefined) =>
    value !== undefined
      ? `${value > 1024 ? (value / 1024).toFixed(2) : value.toFixed(2)} ${value > 1024 ? "GB" : "MB"}`
      : "-";

  return (
    <Stack flex={1} flexDirection={"row"} gap={4}>
      <Stack px={2} flex={1} flexDirection={"row"} gap={4}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={4}>
            <MatricsCard title="Total" value={formatUnit(memory_utilization.total)} />
            <MatricsCard title="Used" value={formatUnit(memory_utilization.used)} />
            <MatricsCard title="Available" value={formatUnit(memory_utilization.available)} />
            <MatricsCard title="Free" value={formatUnit(memory_utilization.free)} />
          </Stack>
          <Stack direction="row" spacing={4}>
            <MatricsCard
              title="Buffer/Cache"
              value={formatUnit(memory_utilization.buffCache)}
              fontSize={18}
              fontWeight={400}
            />
            <MatricsCard title="Shared" value={formatUnit(memory_utilization.shared)} fontSize={18} fontWeight={400} />
          </Stack>

          <Divider />

          <Stack direction="row" spacing={4}>
            <MatricsCard title="Swap Total" value={formatUnit(memory_utilization.swapTotal)} fontSize={18} />
            <MatricsCard title="Swap Used" value={formatUnit(memory_utilization.swapUsed)} fontSize={18} />
            <MatricsCard title="Swap Free" value={formatUnit(memory_utilization.swapFree)} fontSize={18} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

const MatricsCard = ({
  title,
  value,
  fontSize = 22,
  fontWeight = 500,
}: {
  title: string;
  value: string;
  fontSize?: number;
  fontWeight?: number;
}) => {
  return (
    <Stack minWidth={120} flex={1} component={Slide} from="Up" withFade>
      <Typography component={"span"} sx={{ fontSize: 14, color: "#888" }}>
        {title}
      </Typography>
      <Typography component={"span"} sx={{ fontSize, fontWeight }}>
        {value}
      </Typography>
    </Stack>
  );
};

export default MemoryUtilization;
