"use client";
import React, { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";

type TimeFilter = "7days" | "30days" | "6months" | "12months" | "all" | string;
type DrilldownKey = "Google" | "Facebook" | "Twitter" | "Direct" | "Other" | string;

interface TableData {
  path: string;
  activeUsers: number;
  timeSpent: string;
  avgTime: string;
}

function Row3() {
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const [isDrilldown, setIsDrilldown] = useState(false);
  const [currentData, setCurrentData] = useState<DrilldownKey | null>(null);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");

  // Pie chart data for user devices
  const pieOption = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      top: "5%",
      left: "center",
      textStyle: {
        color: "#333", // Changed from white to dark
      },
    },
    series: [
      {
        name: "User Devices",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "60%"],
        startAngle: 180,
        endAngle: 360,
        data: [
          { value: 580, name: "Desktop", itemStyle: { color: "#8884d8" } },
          { value: 484, name: "Tablets", itemStyle: { color: "#82ca9d" } },
          { value: 300, name: "Mobiles", itemStyle: { color: "#ffc658" } },
        ],
        label: {
          show: true,
          formatter: "{b}: {c}",
          color: "#333", // Changed from default to dark
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.2)", // Lighter shadow
          },
        },
      },
    ],
  };

  // Bar chart data for referral sources
  const barOption = {
    title: {
      text: "User Referral Sources",
      textStyle: {
        color: "#333", // Changed from white to dark
      },
      left: "center",
    },
    xAxis: {
      data: ["Google", "Facebook", "Twitter", "Direct", "Other"],
      axisLabel: {
        color: "#333", // Changed from white to dark
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#333", // Changed from white to dark
      },
    },
    series: [
      {
        type: "bar",
        data: [
          { value: 320, name: "Google", itemStyle: { color: "#8884d8" } },
          { value: 240, name: "Facebook", itemStyle: { color: "#82ca9d" } },
          { value: 180, name: "Twitter", itemStyle: { color: "#ffc658" } },
          { value: 150, name: "Direct", itemStyle: { color: "#ff8042" } },
          { value: 100, name: "Other", itemStyle: { color: "#0088fe" } },
        ],
        universalTransition: {
          enabled: true,
          divideShape: "clone",
        },
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: "{b}: {c} users",
    },
  };

  // Drilldown data for referral sources
  const drilldownData: Record<
  DrilldownKey,
  { value: number; name: string; itemStyle: { color: string } }[]
> = {
    Google: [
      { value: 180, name: "Organic Search", itemStyle: { color: "#8884d8" } },
      { value: 100, name: "Google Ads", itemStyle: { color: "#83a6ed" } },
      { value: 40, name: "Google News", itemStyle: { color: "#8dd1e1" } },
    ],
    Facebook: [
      { value: 150, name: "Facebook App", itemStyle: { color: "#82ca9d" } },
      { value: 90, name: "Instagram", itemStyle: { color: "#a4de6c" } },
    ],
    Twitter: [
      { value: 120, name: "Organic Tweets", itemStyle: { color: "#ffc658" } },
      { value: 60, name: "Twitter Ads", itemStyle: { color: "#d0ed57" } },
    ],
    Direct: [
      { value: 100, name: "Direct Entry", itemStyle: { color: "#ff8042" } },
      { value: 50, name: "Bookmarks", itemStyle: { color: "#ffbb28" } },
    ],
    Other: [
      { value: 40, name: "Bing", itemStyle: { color: "#0088fe" } },
      { value: 35, name: "Yahoo", itemStyle: { color: "#00c49f" } },
      { value: 25, name: "Referral", itemStyle: { color: "#ff8042" } },
    ],
  };

  // Sample data for different time periods
  const tableDataByPeriod: Record<TimeFilter, TableData[]> = {
    "7days": [
      {
        path: "/dashboard",
        activeUsers: 350,
        timeSpent: "3m 45s",
        avgTime: "2m 15s",
      },
      {
        path: "/products",
        activeUsers: 280,
        timeSpent: "5m 12s",
        avgTime: "3m 10s",
      },
      {
        path: "/checkout",
        activeUsers: 180,
        timeSpent: "2m 30s",
        avgTime: "1m 45s",
      },
      {
        path: "/profile",
        activeUsers: 150,
        timeSpent: "4m 15s",
        avgTime: "2m 50s",
      },
      {
        path: "/settings",
        activeUsers: 90,
        timeSpent: "6m 20s",
        avgTime: "4m 10s",
      },
    ],
    "30days": [
      {
        path: "/dashboard",
        activeUsers: 850,
        timeSpent: "3m 45s",
        avgTime: "2m 15s",
      },
      {
        path: "/products",
        activeUsers: 680,
        timeSpent: "5m 12s",
        avgTime: "3m 10s",
      },
      {
        path: "/checkout",
        activeUsers: 450,
        timeSpent: "2m 30s",
        avgTime: "1m 45s",
      },
      {
        path: "/profile",
        activeUsers: 380,
        timeSpent: "4m 15s",
        avgTime: "2m 50s",
      },
      {
        path: "/settings",
        activeUsers: 220,
        timeSpent: "6m 20s",
        avgTime: "4m 10s",
      },
    ],
    "6months": [
      {
        path: "/dashboard",
        activeUsers: 1200,
        timeSpent: "3m 45s",
        avgTime: "2m 15s",
      },
      {
        path: "/products",
        activeUsers: 980,
        timeSpent: "5m 12s",
        avgTime: "3m 10s",
      },
      {
        path: "/checkout",
        activeUsers: 650,
        timeSpent: "2m 30s",
        avgTime: "1m 45s",
      },
      {
        path: "/profile",
        activeUsers: 520,
        timeSpent: "4m 15s",
        avgTime: "2m 50s",
      },
      {
        path: "/settings",
        activeUsers: 320,
        timeSpent: "6m 20s",
        avgTime: "4m 10s",
      },
    ],
    "12months": [
      {
        path: "/dashboard",
        activeUsers: 2400,
        timeSpent: "3m 45s",
        avgTime: "2m 15s",
      },
      {
        path: "/products",
        activeUsers: 1960,
        timeSpent: "5m 12s",
        avgTime: "3m 10s",
      },
      {
        path: "/checkout",
        activeUsers: 1300,
        timeSpent: "2m 30s",
        avgTime: "1m 45s",
      },
      {
        path: "/profile",
        activeUsers: 1040,
        timeSpent: "4m 15s",
        avgTime: "2m 50s",
      },
      {
        path: "/settings",
        activeUsers: 640,
        timeSpent: "6m 20s",
        avgTime: "4m 10s",
      },
    ],
    all: [
      {
        path: "/dashboard",
        activeUsers: 3600,
        timeSpent: "3m 45s",
        avgTime: "2m 15s",
      },
      {
        path: "/products",
        activeUsers: 2940,
        timeSpent: "5m 12s",
        avgTime: "3m 10s",
      },
      {
        path: "/checkout",
        activeUsers: 1950,
        timeSpent: "2m 30s",
        avgTime: "1m 45s",
      },
      {
        path: "/profile",
        activeUsers: 1560,
        timeSpent: "4m 15s",
        avgTime: "2m 50s",
      },
      {
        path: "/settings",
        activeUsers: 960,
        timeSpent: "6m 20s",
        avgTime: "4m 10s",
      },
    ],
  };

  // Get current table data based on selected time filter
  const currentTableData = tableDataByPeriod[timeFilter];

  useEffect(() => {
    if (pieChartRef.current) {
      const pieChart = echarts.init(pieChartRef.current);
      pieChart.setOption(pieOption);

      const handleResize = () => {
        pieChart.resize();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        pieChart.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (barChartRef.current) {
      const barChart = echarts.init(barChartRef.current);

      if (isDrilldown && currentData) {
        barChart.setOption({
          title: {
            text: `Traffic from ${currentData}`,
            textStyle: {
              color: "#333", // Changed from white to dark
            },
            left: "center",
          },
          xAxis: {
            data: drilldownData[currentData].map((item) => item.name),
            axisLabel: {
              color: "#333", // Changed from white to dark
              interval: 0,
              rotate: currentData === "Google" ? 20 : 0,
            },
          },
          yAxis: {
            type: "value",
            axisLabel: {
              color: "#333", // Changed from white to dark
            },
          },
          series: [
            {
              type: "bar",
              data: drilldownData[currentData],
              universalTransition: {
                enabled: true,
                divideShape: "clone",
              },
            },
          ],
          tooltip: {
            trigger: "axis",
            formatter: "{b}: {c} users",
          },
          graphic: [
            {
              type: "text",
              left: "5%",
              top: "5%",
              style: {
                text: "← Back",
                fontSize: 14,
                fill: "#333", // Changed from white to dark
                fontWeight: "bold",
              },
              onclick: function () {
                setIsDrilldown(false);
                setCurrentData(null);
              },
            },
          ],
        });
      } else {
        barChart.setOption(barOption);
      }

      // Add click event for drilldown
      barChart.off("click");
      barChart.on("click", function (params) {
        if (!isDrilldown) {
          setIsDrilldown(true);
          setCurrentData(params.name);
        }
      });

      const handleResize = () => {
        barChart.resize();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        barChart.dispose();
      };
    }
  }, [isDrilldown, currentData]);

  return (
    <div className="flex flex-col gap-6 p-4 bg-white min-h-screen text-gray-800 overflow-x-hidden">
      {/* Chart 1: User Devices Pie Chart */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="w-full lg:w-1/3 bg-gray-100 rounded-lg p-4 shadow-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-center">
            User Devices
          </h2>
          <div ref={pieChartRef} className="h-64 md:h-80"></div>
        </div>

        {/* Chart 2: User Referral Bar Chart */}
        <div className="w-full lg:w-2/3 bg-gray-100 rounded-lg p-4 shadow-lg border border-gray-200">
          <div ref={barChartRef} className="h-64 md:h-80"></div>
        </div>
      </div>

      {/* Table: User Page Activity */}
      <div className="w-full bg-gray-100 rounded-lg p-4 shadow-lg overflow-x-auto border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">User Page Activity</h2>
          <div className="flex items-center">
            <label htmlFor="timeFilter" className="mr-2 text-sm font-medium">
              Time Period:
            </label>
            <select
              id="timeFilter"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Link Path</th>
              <th className="px-4 py-2 text-left">Users</th>
              <th className="px-4 py-2 text-left">Time Spent</th>
              <th className="px-4 py-2 text-left">Average Time</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="px-4 py-2 border-t border-gray-200">
                  {row.path}
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {row.activeUsers}
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {row.timeSpent}
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {row.avgTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Row3;