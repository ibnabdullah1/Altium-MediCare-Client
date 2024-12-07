import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const SalesAnalytics = () => {
  const [timeFrame, setTimeFrame] = useState("monthly");

  const weeklyData = [
    {
      name: "Average Check Size (USD)",
      data: [10, 20, 15, 25, 30, 20, 15],
    },
  ];

  const monthlyData = [
    {
      name: "Average Check Size (USD)",
      data: [60, 35, 68, 28, 140, 60, 120, 40],
    },
  ];

  const getCategories = () => {
    if (timeFrame === "weekly") {
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    }
    return [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  };

  const seriesData = timeFrame === "weekly" ? weeklyData : monthlyData;
  const maxYValue = Math.max(...seriesData[0].data);

  const salesAnalytics: any = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#0A9A73", "#0cb14b"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#fff",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
      padding: {
        left: 20,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
            padding: {
              left: 10,
            },
          },
          grid: {
            padding: {
              left: 10,
            },
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
            padding: {
              left: 20,
            },
          },
          grid: {
            padding: {
              left: 20,
            },
          },
        },
      },
    ],
    stroke: {
      width: [3],
      curve: "smooth",
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        left: 20,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#0cb14b", "#fdb"],
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: getCategories(),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        offsetX: 1,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      tickAmount: 5,
      max: maxYValue,
    },
  };

  return (
    <div className=" rounded  bg-white lg:col-span-8 p-6 h-[420px]">
      <div className="lg:flex items-start justify-between gap-3">
        <h2 className=" font-semibold">Average Check Size (USD)</h2>
        <div className="flex gap-2">
          <button
            className={`px-3 text-sm py-1 rounded ${
              timeFrame === "weekly"
                ? "bg-primary text-white"
                : "bg-[rgb(10,154,115,0.1)] text-primary"
            }`}
            onClick={() => setTimeFrame("weekly")}
          >
            Weekly
          </button>
          <button
            className={`px-3 text-sm py-1 rounded ${
              timeFrame === "monthly"
                ? "bg-primary text-white"
                : "bg-[rgb(10,154,115,0.1)] text-primary"
            }`}
            onClick={() => setTimeFrame("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="-ml-5">
        <ReactApexChart
          options={salesAnalytics}
          series={seriesData}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default SalesAnalytics;
