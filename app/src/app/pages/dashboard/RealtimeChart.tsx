import { Card, CardHeader, CardProps } from "@mui/material";
import useChart from "../../components/chart/use-chart";
import Chart from "../../components/chart/chart";
import { getSeriesData } from "../../common/storage-helper";
import { useEffect, useState } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    categories?: string[];
    colors?: string[];
    series: {
      data: {
        name: string;
        data: number[];
      }[];
    };
    options?: ApexOptions;
  };
}

var trigoStrength = 3;
var iteration = 11;

function generateMinuteWiseTimeSeries(baseval: number, count: number, yrange: number) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y = (Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2);

    series.push([x, y]);
    baseval += 300000;
    i++;
  }
  return series;
}

function getNewData(baseval: number, yrange: any) {
  var newTime = baseval + 300000;
  return {
    x: newTime,
    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min,
  };
}

function getRandom() {
  var i = iteration;
  return (Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2);
}

const RealtimeChart = ({ title, subheader, chart, ...other }: Props) => {
  var optionsLine = {
    chart: {
      height: 350,
      type: "line",
      stacked: true,
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      dropShadow: {
        enabled: true,
        opacity: 0.6,
        blur: 5,
        left: -7,
        top: 22,
      },
      events: {
        animationEnd: function (chartCtx, opts) {
          const newData1 = chartCtx.w.config.series[0].data.slice();
          newData1.shift();
          const newData2 = chartCtx.w.config.series[1].data.slice();
          newData2.shift();

          // check animation end event for just 1 series to avoid multiple updates
          if (opts.el.node.getAttribute("index") === "0") {
            window.setTimeout(function () {
              chartCtx.updateOptions(
                {
                  series: [
                    {
                      data: newData1,
                    },
                    {
                      data: newData2,
                    },
                  ],
                  subtitle: {
                    text: parseInt(getRandom() * Math.random()).toString(),
                  },
                },
                false,
                false
              );
            }, 300);
          }
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 5,
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    markers: {
      size: 0,
      hover: {
        size: 0,
      },
    },
    series: [
      {
        name: "Running",
        data: generateMinuteWiseTimeSeries(new Date("12/12/2016 00:20:00").getTime(), 12, {
          min: 30,
          max: 110,
        }),
      },
      {
        name: "Waiting",
        data: generateMinuteWiseTimeSeries(new Date("12/12/2016 00:20:00").getTime(), 12, {
          min: 30,
          max: 110,
        }),
      },
    ],
    xaxis: {
      type: "datetime",
      range: 2700000,
    },
    title: {
      text: "Processes",
      align: "left",
      style: {
        fontSize: "12px",
      },
    },
    subtitle: {
      text: "20",
      floating: true,
      align: "right",
      offsetY: 0,
      style: {
        fontSize: "22px",
      },
    },
    legend: {
      show: true,
      floating: true,
      horizontalAlign: "left",
      onItemClick: {
        toggleDataSeries: false,
      },
      position: "top",
      offsetY: -28,
      offsetX: 60,
    },
  };

  useEffect(() => {
    var chartLine = new ApexCharts(document.querySelector("#linechart"), optionsLine);
    chartLine.render();
  }, []);

  return <div id="linechart"></div>;
};

export default RealtimeChart;
