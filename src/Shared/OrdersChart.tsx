import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const OrdersChart = () => {
  // State for the time frame: Weekly or Monthly
  const [timeFrame, setTimeFrame] = useState<"weekly" | "monthly">("weekly");

  // Weekly and Monthly Data
  const weeklyData = [
    {
      name: "Orders Per Day",
      data: [10, 20, 15, 50, 30, 20, 35], // Example weekly data
    },
  ];

  const monthlyData = [
    {
      name: "Orders Per Day",
      data: [60, 35, 68, 28, 140, 60, 120, 40], // Example monthly data
    },
  ];

  // Function to get categories based on time frame
  const getCategories = () => {
    if (timeFrame === "weekly") {
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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

  // Set data based on time frame
  const seriesData = timeFrame === "weekly" ? weeklyData : monthlyData;

  // Get maximum value of the data for y-axis max
  const maxYValue = Math.max(...seriesData[0].data);

  // ApexCharts options configuration
  const salesAnalytics: any = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#0A9A73"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "bar",
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
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        columnWidth: "30%",
        endingShape: "flat",
      },
    },
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
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#0cb14b"],
      strokeWidth: 2,
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
        offsetX: 0,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      max: maxYValue,
      labels: {
        formatter: (value: number) => (value % 10 === 0 ? value : ""),
      },
    },
  };

  return (
    <div className="col-span-12 rounded-lg bg-white lg:col-span-8 p-5 h-[395px]">
      <div className="lg:flex items-start justify-between gap-3">
        <h2 className="font-semibold">Orders Per Day</h2>

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
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default OrdersChart;
