import { Box, Card, CardHeader, CardProps, Stack, Typography } from "@mui/material";
import useChart from "../../components/chart/use-chart";
import Chart from "../../components/chart/chart";
import { useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import { getMatrixData } from "../../common/storage-helper";
import { REALTIME_INTERVAL } from "../../common/config/config";
import Fade from "../../components/animate/Fade";

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chartOption?: ApexCharts.ApexOptions;
  legend?: boolean;
  chartFor: "cpu" | "memory" | "network" | "disk";
  series?: Array<{
    name: string;
    data: number[];
  }>;
}

const RealtimeChart = ({ title, subheader, chartOption, chartFor, series = [], legend = false, ...other }: Props) => {
  const chartRef = useRef<ReactApexChart | null>(null);

  useEffect(() => {
    const updateData = () => {
      const data = getMatrixData(chartFor);
      // @ts-ignore
      if (chartRef.current?.chart) {
        // @ts-ignore
        chartRef.current.chart.appendData(data);
      }
    };

    // @ts-ignore
    if (chartRef.current?.chart) {
      // @ts-ignore
      chartRef.current.chart.updateSeries(series);
    }

    // Update data every second
    const interval = setInterval(updateData, REALTIME_INTERVAL);

    return () => clearInterval(interval);
  }, [series]);

  const chartOptions = useChart({
    chart: {
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: REALTIME_INTERVAL,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      redrawOnWindowResize: true,
      redrawOnParentResize: true,
      ...chartOption?.chart,
    },
    xaxis: {
      categories: Array.from({ length: 30 }, (_, i) => i),
      range: 30,
      labels: {
        show: false,
      },
      ...chartOption?.xaxis,
    },
    yaxis: {
      min: 0,
      opposite: true,
      ...chartOption?.yaxis,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      x: {
        show: false,
      },
      y: {
        formatter: (value: number) => `${value.toFixed(1)}%`,
      },
      marker: {
        show: false,
      },
      fixed: {
        enabled: false,
      },
      ...chartOption?.tooltip,
    },
    grid: {
      show: true,
      borderColor: "#ccc",
      strokeDashArray: 0,
      position: "back",
      ...chartOption?.grid,
    },
    legend: {
      show: legend,
      horizontalAlign: "right",
      position: "top",
      offsetX: 40,
      offsetY: 0,
    },
  });

  return (
    <Fade duration={0.5} style={{}}>
      <Card {...other} sx={{ px: 2, pb: 4, bgcolor: "transparent" }}>
        <CardHeader title={title} subheader={subheader} />
        <Chart
          type="line"
          series={series.length > 0 ? series : [{ data: [] }]}
          options={chartOptions}
          height={legend ? 325 : 300}
          ref={chartRef}
        />
        <Stack
          pl={"0px"}
          // pr={"36px"}
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          position={"absolute"}
          bottom={20}
          left={20}
          right={60}
        >
          {Array.from({ length: 7 }, (_, i) => 6 - i).map((i) => (
            <Box key={i} sx={{ position: "relative" }}>
              <Box
                sx={{
                  borderRight: "1px solid #ccc",
                  height: 255,
                  p: 0,
                  m: 0,
                  position: "absolute",
                  bottom: 42,
                  left: "50%",
                  zIndex: -1,
                  transform: "translateX(-50%)",
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {i === 0 ? "1s" : `${i * 5}s`}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Card>
    </Fade>
  );
};

export default RealtimeChart;
