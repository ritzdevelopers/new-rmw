"use client";
import React, { useState, useEffect, useMemo } from "react";
import ReactECharts from "echarts-for-react";

type TravelPath = {
  from: string;
  to: string;
  value: number;
};

interface ROWDATA {
  setDuration: (val: string) => void;
  setQueryType: (val: string) => void;
  userTravelPath: Record<string, number> | null;
}

function Row2({ setDuration, setQueryType, userTravelPath }: ROWDATA) {
  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsiveness
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Process user travel path data
  const processedTravelData = useMemo(() => {
    if (!userTravelPath) return [];

    const paths: TravelPath[] = [];

    // Convert the object to an array of paths
    Object.entries(userTravelPath).forEach(([key, value]) => {
      // Split keys like "HomeToBlogs" into "Home" and "Blogs"
      const from = key
        .replace(/To([A-Z])/g, (match, p1) => ` → ${p1}`)
        .split(" → ")[0];
      const to = key
        .replace(/To([A-Z])/g, (match, p1) => ` → ${p1}`)
        .split(" → ")[1];

      if (from && to) {
        paths.push({ from, to, value });
      }
    });

    // Sort by value in descending order
    return paths.sort((a, b) => b.value - a.value);
  }, [userTravelPath]);

  // Session data by month
  const sessionData = {
    months: [
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
    ],
    totalSessions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    uniqueUsers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    avgTime: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  // Session analytics chart options
  const getSessionChartOption = () => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: ["Total Sessions", "Unique Users"],
        top: 10,
        textStyle: {
          fontSize: isMobile ? 10 : 12,
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: isMobile ? "15%" : "20%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: sessionData.months,
        axisLabel: {
          fontSize: isMobile ? 9 : 11,
          interval: isMobile ? 2 : 0,
        },
      },
      yAxis: {
        type: "value",
        name: "Users",
        nameTextStyle: {
          fontSize: isMobile ? 10 : 12,
        },
        axisLabel: {
          fontSize: isMobile ? 10 : 12,
        },
      },
      series: [
        {
          name: "Total Sessions",
          type: "bar",
          data: sessionData.totalSessions,
          itemStyle: {
            color: "#5470c6",
          },
          barWidth: isMobile ? "20%" : "30%",
        },
        {
          name: "Unique Users",
          type: "bar",
          data: sessionData.uniqueUsers,
          itemStyle: {
            color: "#91cc75",
          },
          barWidth: isMobile ? "20%" : "30%",
        },
        {
          name: "Average Time",
          type: "line",
          yAxisIndex: 0,
          data: sessionData.avgTime.map((t) => t * 1000), // Scale for better visualization
          itemStyle: {
            color: "#fac858",
          },
          lineStyle: {
            width: 2,
          },
          symbol: isMobile ? "none" : "emptyCircle",
          symbolSize: 6,
        },
      ],
    };
  };

  // User travel chart options
  const getTravelChartOption = () => {
    // Take top 10 paths for better visualization
    const topPaths = processedTravelData.slice(0, 10);

    return {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}",
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: "center",
        data: topPaths.map((path) => `${path.from} → ${path.to}`),
        textStyle: {
          fontSize: isMobile ? 9 : 11,
        },
      },
      series: [
        {
          name: "User Travel Paths",
          type: "pie",
          radius: isMobile ? ["40%", "70%"] : ["50%", "80%"],
          center: isMobile ? ["40%", "50%"] : ["40%", "50%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: isMobile ? 12 : 14,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: topPaths.map((path, index) => ({
            value: path.value,
            name: `${path.from} → ${path.to}`,
            itemStyle: {
              color: [
                "#5470c6",
                "#91cc75",
                "#fac858",
                "#ee6666",
                "#73c0de",
                "#3ba272",
                "#fc8452",
                "#9a60b4",
                "#ea7ccc",
                "#6e7079",
              ][index % 10],
            },
          })),
        },
      ],
    };
  };

  // Custom select component for time range
  const TimeRangeSelect = () => {
    return (
      <div className="relative inline-block ">
        <select
          className="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={timeRange}
          onChange={(e) => {
            setTimeRange(e.target.value);
            setQueryType("User Travel Paths");
            setDuration(e.target.value);
          }}
        >
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="Last 6 Month">Last 6 Months</option>
          <option value="Last 1 Year">Last 1 Year</option>
        </select>
      </div>
    );
  };

  // Table view for user travel paths
  const TravelPathsTable = () => {
    return (
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                From
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                To
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sessions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {processedTravelData.slice(0, 10).map((path, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2 text-sm text-gray-900">{path.from}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{path.to}</td>
                <td className="px-4 py-2 text-sm text-gray-900 font-medium">
                  {path.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="w-full p-4 bg-gray-50 min-h-[10vh]">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Side - Session Analytics */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Session Analytics
          </h2>
          <ReactECharts
            option={getSessionChartOption()}
            style={{ height: isMobile ? "300px" : "400px", width: "100%" }}
            opts={{ renderer: "svg" }}
          />
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="bg-blue-50 p-2 rounded-lg">
              <p className="text-xs text-gray-600">Total Sessions</p>
              <p className="text-sm font-bold text-blue-600">
                {sessionData.totalSessions
                  .reduce((a, b) => a + b, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <p className="text-xs text-gray-600">Unique Users</p>
              <p className="text-sm font-bold text-green-600">
                {sessionData.uniqueUsers
                  .reduce((a, b) => a + b, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="bg-yellow-50 p-2 rounded-lg">
              <p className="text-xs text-gray-600">Avg. Time (min)</p>
              <p className="text-sm font-bold text-yellow-600">
                {(
                  sessionData.avgTime.reduce((a, b) => a + b, 0) /
                  sessionData.avgTime.length
                ).toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - User Travel Paths */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              User Travel Paths
            </h2>
            <TimeRangeSelect />
          </div>
          <ReactECharts
            option={getTravelChartOption()}
            style={{ height: isMobile ? "300px" : "400px", width: "100%" }}
            opts={{ renderer: "svg" }}
          />

          {/* Table view for better readability */}
          <TravelPathsTable />

          <div className="mt-4 text-sm text-gray-600">
            <p className="text-center">
              Shows how users navigate between pages on your website
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Row2;
