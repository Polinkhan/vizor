import { Divider, Grid, Stack, Typography } from "@mui/material";
import DemoGraphs from "./DemoGraphs";
import ApexRadialChart from "../../components/chart/ApexRadialChart";
import { CustomTable } from "../../components/table/custom-table";
import { DashboardTableHeader } from "./utils";
// import useSocket from "../../hooks/socket/use-socket";

const DashboardView = () => {
  return (
    <Stack py={4}>
      <Stack pb={4} gap={0} height={"100vh"}>
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
      </Stack>
      <DemoGraphs />
    </Stack>
  );
};

export default DashboardView;
