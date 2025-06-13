import { Stack, Typography, useTheme } from "@mui/material";
import { REALTIME_INTERVAL } from "../../common/config/config";
import useSocket from "../../hooks/socket/use-socket";
import RealtimeChart from "./RealtimeChart";
import { useEffect, useState } from "react";
import { clearMatrixData, saveMatrixData } from "../../common/storage-helper";
import useSocketFetch from "../../hooks/socket/use-socket-fetch";
import CustomSelect, { SelectListType } from "../../components/select/custom-select";
import Slide from "../../components/animate/Slide";
import { convertBytes } from "../../common/helpers";

const NetworkUsage = () => {
  const theme = useTheme();
  const [selected_interface, setSelectedInterface] = useState<string>("0");
  const { data: network_usage } = useSocketFetch({ type: "network_usage" });
  if (!network_usage) return null;

  const interface_list: SelectListType[] = network_usage.map((item: any, index: number) => ({
    label: item.interface,
    value: index,
  }));

  return (
    <Stack flex={1} gap={4}>
      <CustomSelect
        size="small"
        lists={interface_list}
        label="Interface"
        sx={{ width: 300 }}
        value={selected_interface}
        onChange={(e) => setSelectedInterface(e.target.value as string)}
      />
      <RealtimeChart
        legend={true}
        chartFor="network"
        title="Network Usage"
        subheader="Network Usage"
        chartOption={{
          yaxis: {
            max: 50,
            stepSize: 10,
            labels: {
              formatter: (value: number) => `${value.toFixed(0)} MB`,
            },
          },
          tooltip: {
            y: {
              formatter: (value: number) => `${value.toFixed(0)} MB`,
            },
          },
        }}
        series={[
          {
            name: "Upload",
            data: [0],
            // @ts-ignore
            color: theme.palette.warning.main,
          },
          {
            name: "Download",
            data: [0],
            // @ts-ignore
            color: theme.palette.primary.main,
          },
        ]}
      />
      <DetailsView selected_interface={selected_interface} />
    </Stack>
  );
};

const DetailsView = ({ selected_interface }: { selected_interface: string }) => {
  useEffect(() => {
    return () => {
      clearMatrixData("network");
    };
  }, []);

  // ------------------------------------------
  // Fetching data
  // ------------------------------------------
  const { data: network_usage } = useSocket({ type: "network_usage", refreshAt: REALTIME_INTERVAL });

  useEffect(() => {
    if (!network_usage) return;
    const data = [
      { data: [Number(network_usage[Number(selected_interface)].uploadSpeed) / (1024 * 1024)] },
      { data: [Number(network_usage[Number(selected_interface)].downloadSpeed) / (1024 * 1024)] },
    ];
    saveMatrixData("network", data);
  }, [network_usage]);

  if (!network_usage) return null;

  return (
    <Stack direction="row">
      <MatricsCard title="Download" value={convertBytes(network_usage[Number(selected_interface)].downloadSpeed)} />
      <MatricsCard title="Upload" value={convertBytes(network_usage[Number(selected_interface)].uploadSpeed)} />
      <MatricsCard title="Total Packets Sent" value={convertBytes(network_usage[Number(selected_interface)].tx)} />
      <MatricsCard title="Total Packets Received" value={convertBytes(network_usage[Number(selected_interface)].rx)} />
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
    <Stack minWidth={200} component={Slide} from="Up" withFade style={{ justifyContent: "center", flexWrap: "wrap" }}>
      <Typography component={"span"} sx={{ fontSize: 14, color: "#888" }}>
        {title}
      </Typography>
      <Typography component={"span"} sx={{ fontSize, fontWeight }}>
        {value}
      </Typography>
    </Stack>
  );
};

export default NetworkUsage;
