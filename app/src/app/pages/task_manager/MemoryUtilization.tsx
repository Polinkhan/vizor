import { Stack } from "@mui/material";
import RealtimeChart from "./RealtimeChart";
import { useEffect } from "react";
import { clearMemorySeriesData, getMemorySeriesData, saveMemorySeriesData } from "../../common/storage-helper";
import useSocket from "../../hooks/socket/use-socket";

const MemoryUtilization = () => {
  return (
    <Stack flex={1} gap={4}>
      <RealtimeChart
        title="Memory Utilization"
        subheader="Memory Utilization"
        fetchMethod={getMemorySeriesData}
        chartOption={{
          yaxis: {
            max: 16,
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
      />
      <DetailsView />
    </Stack>
  );
};

const DetailsView = () => {
  useEffect(() => {
    return () => {
      clearMemorySeriesData();
    };
  }, []);

  // ------------------------------------------
  // Fetching data
  // ------------------------------------------
  const { data: memory_utilization } = useSocket({ type: "memory_utilization", refreshAt: 1000 });

  useEffect(() => {
    if (!memory_utilization) return;
    saveMemorySeriesData(Number(memory_utilization.used) / 1024);
  }, [memory_utilization]);

  if (!memory_utilization) return null;

  // Helper to format MB values
  const formatMB = (value: number | undefined) => (value !== undefined ? `${value} MB` : "-");

  return (
    <Stack flex={1} flexDirection={"row"} gap={4}>
      <Stack px={2} flex={1} flexDirection={"row"} gap={4}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={4}>
            <Stack minWidth={120}>
              <span style={{ fontSize: 14, color: "#888" }}>Total</span>
              <span style={{ fontSize: 22, fontWeight: 500 }}>{formatMB(memory_utilization.total)}</span>
            </Stack>
            <Stack minWidth={120}>
              <span style={{ fontSize: 14, color: "#888" }}>Used</span>
              <span style={{ fontSize: 22, fontWeight: 500 }}>{formatMB(memory_utilization.used)}</span>
            </Stack>
            <Stack minWidth={120}>
              <span style={{ fontSize: 14, color: "#888" }}>Available</span>
              <span style={{ fontSize: 22, fontWeight: 500 }}>{formatMB(memory_utilization.available)}</span>
            </Stack>
            <Stack minWidth={120}>
              <span style={{ fontSize: 14, color: "#888" }}>Free</span>
              <span style={{ fontSize: 22, fontWeight: 500 }}>{formatMB(memory_utilization.free)}</span>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={4}>
            <Stack minWidth={120}>
              <span style={{ fontSize: 14, color: "#888" }}>Buffer/Cache</span>
              <span style={{ fontSize: 18 }}>{formatMB(memory_utilization.buffCache)}</span>
            </Stack>
            <Stack minWidth={120}>
              <span style={{ fontSize: 14, color: "#888" }}>Shared</span>
              <span style={{ fontSize: 18 }}>{formatMB(memory_utilization.shared)}</span>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MemoryUtilization;
