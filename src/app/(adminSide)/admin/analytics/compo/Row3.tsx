"use client";
import React, { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";

type TimeFilter =
  | "7 days"
  | "30 days"
  | "6 months"
  | "12 months"
  | "all"
  | string;
type DrilldownKey =
  | "Google"
  | "Facebook"
  | "Twitter"
  | "Direct"
  | "Other"
  | string;



export interface DeviceInfoItem {
  totalPhones?: number;
  totalTablets?: number;
  totalDekstopDevices?: number;
  overAllPercentage: number;
}

export interface PageActivityData {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
}

export interface UserPageActivity {
  [url: string]: PageActivityData;
}

interface ROWDATA {
  setDuration: (val: string) => void;
  setQueryType: (val: string) => void;
  devicesData: DeviceInfoItem[] | null;
  userRefferalSources: Record<string, number> | null;
  userPageActivity: UserPageActivity | null;
}

function Row3({
  setDuration,
  setQueryType,
  devicesData,
  userRefferalSources,
  userPageActivity,
}: ROWDATA) {
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const [isDrilldown, setIsDrilldown] = useState(false);
  const [currentData, setCurrentData] = useState<DrilldownKey | null>(null);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [timeFilter2, setTimeFilter2] = useState<TimeFilter>("all");
  
  // Pagination state for page activity table
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Prepare device data for pie chart
  const getDeviceData = () => {
    if (!devicesData) return [];
    
    const deviceData = [];
    
    if (devicesData[0]?.totalPhones !== undefined) {
      deviceData.push({
        value: devicesData[0].totalPhones,
        name: "Mobiles",
        itemStyle: { color: "#ffc658" }
      });
    }
    
    if (devicesData[1]?.totalTablets !== undefined) {
      deviceData.push({
        value: devicesData[1].totalTablets,
        name: "Tablets",
        itemStyle: { color: "#82ca9d" }
      });
    }
    
    if (devicesData[2]?.totalDekstopDevices !== undefined) {
      deviceData.push({
        value: devicesData[2].totalDekstopDevices,
        name: "Desktop",
        itemStyle: { color: "#8884d8" }
      });
    }
    
    return deviceData;
  };

  // Prepare referral data for bar chart - dynamic approach
  const getReferralData = () => {
    if (!userRefferalSources) return [];
    
    // Convert the object to an array and sort by value (descending)
    const sortedSources = Object.entries(userRefferalSources)
      .sort((a, b) => b[1] - a[1]);
    
    // Take top 10 sources and group the rest as "Other"
    const topSources = sortedSources.slice(0, 10);
    const otherSources = sortedSources.slice(10);
    
    const otherCount = otherSources.reduce((sum, [, count]) => sum + count, 0);
    
    // Prepare data for chart
    const chartData = topSources.map(([source, count], index) => ({
      value: count,
      name: source.charAt(0).toUpperCase() + source.slice(1),
      itemStyle: { color: getColorForIndex(index) }
    }));
    
    // Add "Other" category if there are remaining sources
    if (otherCount > 0) {
      chartData.push({
        value: otherCount,
        name: "Other",
        itemStyle: { color: "#ffbb28" }
      });
    }
    
    return chartData;
  };

  // Helper function to generate colors for chart items
  const getColorForIndex = (index: number) => {
    const colors = [
      "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe",
      "#00c49f", "#ff6b6b", "#339af0", "#51cf66", "#fcc419"
    ];
    return colors[index % colors.length];
  };

  // Prepare page activity data for table
  const getPageActivityData = () => {
    if (!userPageActivity) return [];
    
    return Object.entries(userPageActivity)
      .map(([path, data]) => ({
        path,
        activeUsers: Math.round((data.hours * 3600 + data.minutes * 60 + data.seconds) / 60), // Estimate users based on time
        timeSpent: data.formatted,
        avgTime: data.formatted // Using same value for simplicity
      }))
      .sort((a, b) => b.activeUsers - a.activeUsers); // Sort by active users descending
  };

  // Get paginated page activity data
  const getPaginatedPageActivityData = () => {
    const allData = getPageActivityData();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allData.slice(startIndex, endIndex);
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(getPageActivityData().length / itemsPerPage);

  // Pie chart options for user devices
  const pieOption = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      top: "5%",
      left: "center",
      textStyle: {
        color: "#333",
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
        data: getDeviceData(),
        label: {
          show: true,
          formatter: "{b}: {c} ({d}%)",
          color: "#333",
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.2)",
          },
        },
      },
    ],
  };

  // Bar chart options for referral sources
  const barOption = {
    title: {
      text: "User Referral Sources",
      textStyle: {
        color: "#333",
      },
      left: "center",
    },
    xAxis: {
      type: 'category',
      data: getReferralData().map(item => item.name),
      axisLabel: {
        color: "#333",
        interval: 0,
        rotate: 30, // Rotate labels for better fit
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#333",
      },
    },
    series: [
      {
        type: "bar",
        data: getReferralData(),
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
    grid: {
      bottom: '20%' // Add space for rotated labels
    },
  };



  // Get current table data based on selected time filter
  // const currentTableData = tableDataByPeriod[timeFilter];

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
  }, [devicesData, pieOption]);

  useEffect(() => {
    if (barChartRef.current) {
      const barChart = echarts.init(barChartRef.current);
      barChart.setOption(barOption);

      // Add click event for drilldown
      barChart.off("click");
      barChart.on("click", function (params) {
        if (!isDrilldown) {
          setIsDrilldown(true);
          setCurrentData(params.name as DrilldownKey);
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
  }, [userRefferalSources, isDrilldown, currentData, barOption]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

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
        <div className="w-full lg:w-2/3 bg-gray-100 rounded-lg p-4 shadow-lg border border-gray-200 flex flex-col gap-2">
          <div className="flex items-center">
            <label htmlFor="timeFilter" className="mr-2 text-sm font-medium">
              Time Period:
            </label>
            <select
              id="timeFilter"
              value={timeFilter2}
              onChange={(e) => {
                setTimeFilter2(e.target.value);
                setDuration(e.target.value);
                setQueryType("User Referral Sources");
              }}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 6 Month">Last 6 Months</option>
              <option value="Last 1 Year">Last 12 Months</option>
              <option value="All Time">All Time</option>
            </select>
          </div>
          <div ref={barChartRef} className="h-64 md:h-80"></div>
        </div>
      </div>

      {/* Table: User Page Activity */}
      <div className="w-full bg-gray-100 rounded-lg p-4 shadow-lg overflow-x-auto border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">User Page Activity</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <label htmlFor="timeFilter" className="mr-2 text-sm font-medium">
                Time Period:
              </label>
              <select
                id="timeFilter"
                value={timeFilter}
                onChange={(e) => {
                  setTimeFilter(e.target.value);
                  setDuration(e.target.value);
                  setQueryType("User Page Activity");
                  setCurrentPage(1); // Reset to first page when changing time filter
                }}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7 days">Last 7 Days</option>
                <option value="30 days">Last 30 Days</option>
                <option value="6 months">Last 6 Months</option>
                <option value="12 months">Last 12 Months</option>
                <option value="all">All Time</option>
              </select>
            </div>
            <div className="flex items-center">
              <label htmlFor="itemsPerPage" className="mr-2 text-sm font-medium">
                Rows per page:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="50">50</option>
              </select>
            </div>
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
            {getPaginatedPageActivityData().length > 0 ? (
              getPaginatedPageActivityData().map((row, index) => (
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
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-700">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, getPageActivityData().length)} of {getPageActivityData().length} entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 border border-gray-300 rounded-md ${
                      currentPage === pageNum ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Row3;