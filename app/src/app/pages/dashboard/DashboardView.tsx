import { Stack } from "@mui/material";
import useSocket from "../../hooks/socket/use-socket";
import RealtimeChart from "./RealtimeChart";
import { useEffect } from "react";
import { clearSeriesData, saveSeriesData } from "../../common/storage-helper";
// import useSocket from "../../hooks/socket/use-socket";

const DashboardView = () => {
  useEffect(() => {
    return () => {
      clearSeriesData();
    };
  }, []);

  return (
    <Stack p={4} gap={4}>
      <SaveSeriesData />
      {/* {JSON.stringify(data)} */}
      {/* <Stack pb={4} gap={0} height={"100vh"}>
        <Typography fontWeight={500}>System Metrics</Typography>
        <Divider />
        <Grid container>
          <Grid item xs={12} sm={6} lg={4}>
            <ApexRadialChart title="CPU" value={60} />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ApexRadialChart title="Memory" value={60} />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ApexRadialChart title="Swap" value={60} />
          </Grid>
        </Grid>

        <Stack flex={1}>
          <CustomTable disableFilter data={[]} header={DashboardTableHeader} resource={{ columns: [] }} />
        </Stack>
      </Stack> */}
      {/* <DemoGraphs /> */}
      <RealtimeChart
        title="CPU Utilization"
        subheader="CPU Utilization"
        chart={{
          series: {
            data: [{ name: "CPU", data: [] }],
          },
        }}
      />
    </Stack>
  );
};

const SaveSeriesData = () => {
  // ------------------------------------------
  // Fetching data
  // ------------------------------------------
  const { data } = useSocket({ type: "dashboard", refreshAt: 1000 });

  useEffect(() => {
    if (!data) return;
    saveSeriesData(Number(data.cpuUsage));
  }, [data]);

  return <></>;
};

export default DashboardView;
