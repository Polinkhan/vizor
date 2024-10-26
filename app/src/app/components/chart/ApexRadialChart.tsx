import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface ChartProps {
  value: number;
  title: string;
}

const ApexRadialChart = ({ value, title }: ChartProps) => {
  const options: ApexOptions = {
    chart: {
      height: 400,
      type: "radialBar",
      offsetY: -10,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.075,
          },
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: 150,
            show: true,
            color: "#343536",
            fontSize: "24px",
          },
          value: {
            formatter: function (val) {
              return `${val} %`;
            },
            color: "#111",
            fontSize: "24px",
            show: true,
            offsetY: 0,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: [title],
  };

  const series = [value];

  return <ReactApexChart options={options} series={series} type="radialBar" height={350} />;
};

export default ApexRadialChart;
