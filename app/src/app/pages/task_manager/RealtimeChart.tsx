import { alpha, Card, CardHeader, CardProps } from "@mui/material";
import useChart from "../../components/chart/use-chart";
import Chart from "../../components/chart/chart";
import { useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  fetchMethod: () => any[];
  chartOption?: ApexCharts.ApexOptions;
}

const RealtimeChart = ({ title, subheader, chartOption, fetchMethod, ...other }: Props) => {
  const chartRef = useRef<ReactApexChart | null>(null);

  useEffect(() => {
    const updateData = () => {
      const data = fetchMethod();
      console.log(data);
      // @ts-ignore
      if (chartRef.current?.chart) {
        // @ts-ignore
        chartRef.current.chart.appendData([
          {
            data: [data[data.length - 1]],
          },
        ]);
      }
    };

    // Initial data load
    const initialData = fetchMethod();
    // @ts-ignore
    if (chartRef.current?.chart) {
      // @ts-ignore
      chartRef.current.chart.updateSeries([
        {
          data: initialData,
        },
      ]);
    }

    // Update data every second
    const interval = setInterval(updateData, 1000);

    return () => clearInterval(interval);
  }, []);

  const chartOptions = useChart({
    chart: {
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
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
      categories: Array.from({ length: 60 }, (_, i) => i),
      range: 60,
      labels: {
        show: false,
      },
      ...chartOption?.xaxis,
    },
    yaxis: {
      min: 0,
      max: 100,
      opposite: true,
      labels: {
        formatter: (value: number) => `${value.toFixed(0)}%`,
      },
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
        show: true,
      },
      fixed: {
        enabled: false,
      },
      ...chartOption?.tooltip,
    },
    grid: {
      show: true,
      borderColor: "#ddd",
      strokeDashArray: 1,
      position: "back",
      ...chartOption?.grid,
    },
  });

  const series = [
    {
      name: "CPU Usage",
      data: Array(60).fill(0),
    },
  ];

  return (
    <Card {...other} sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.025) }}>
      <CardHeader title={title} subheader={subheader} />
      <Chart type="line" series={series} options={chartOptions} height={350} ref={chartRef} />
    </Card>
  );
};

export default RealtimeChart;
