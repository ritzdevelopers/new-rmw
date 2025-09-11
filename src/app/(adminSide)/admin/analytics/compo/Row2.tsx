"use client";
import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

type TravelPath = {
  from: string;
  to: string;
  value: number;
};


function Row2() {
  const [timeRange, setTimeRange] = useState("Past 30 Days");
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsiveness
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Session data by month
  const sessionData = {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    totalSessions: [12500, 13200, 14500, 15800, 16300, 17200, 18500, 19200, 20300, 21500, 22400, 23800],
    uniqueUsers: [8500, 9200, 10100, 11200, 11800, 12500, 13200, 13800, 14500, 15200, 15800, 16500],
    avgTime: [2.8, 3.1, 3.2, 3.0, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.2]
  };

  // User travel paths data
  const travelData = {
    "Past 7 Days": {
      paths: [
        { from: "Home", to: "Blogs", value: 1250 },
        { from: "Blogs", to: "About", value: 850 },
        { from: "About", to: "Contact", value: 650 },
        { from: "Contact", to: "Services", value: 520 },
        { from: "Services", to: "Home", value: 480 }
      ]
    },
    "Past 30 Days": {
      paths: [
        { from: "Home", to: "Blogs", value: 5200 },
        { from: "Blogs", to: "About", value: 3800 },
        { from: "About", to: "Contact", value: 2900 },
        { from: "Contact", to: "Services", value: 2400 },
        { from: "Services", to: "Home", value: 2100 }
      ]
    },
    "Past 6 Month": {
      paths: [
        { from: "Home", to: "Blogs", value: 31200 },
        { from: "Blogs", to: "About", value: 22800 },
        { from: "About", to: "Contact", value: 17400 },
        { from: "Contact", to: "Services", value: 14400 },
        { from: "Services", to: "Home", value: 12600 }
      ]
    },
    "Past 1 Year": {
      paths: [
        { from: "Home", to: "Blogs", value: 62400 },
        { from: "Blogs", to: "About", value: 45600 },
        { from: "About", to: "Contact", value: 34800 },
        { from: "Contact", to: "Services", value: 28800 },
        { from: "Services", to: "Home", value: 25200 }
      ]
    }
  };

  // Session analytics chart options
  const getSessionChartOption = () => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Total Sessions', 'Unique Users'],
        top: 10,
        textStyle: {
          fontSize: isMobile ? 10 : 12
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: isMobile ? '15%' : '20%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: sessionData.months,
        axisLabel: {
          fontSize: isMobile ? 9 : 11,
          interval: isMobile ? 2 : 0
        }
      },
      yAxis: {
        type: 'value',
        name: 'Users',
        nameTextStyle: {
          fontSize: isMobile ? 10 : 12
        },
        axisLabel: {
          fontSize: isMobile ? 10 : 12
        }
      },
      series: [
        {
          name: 'Total Sessions',
          type: 'bar',
          data: sessionData.totalSessions,
          itemStyle: {
            color: '#5470c6'
          },
          barWidth: isMobile ? '20%' : '30%'
        },
        {
          name: 'Unique Users',
          type: 'bar',
          data: sessionData.uniqueUsers,
          itemStyle: {
            color: '#91cc75'
          },
          barWidth: isMobile ? '20%' : '30%'
        },
        {
          name: 'Average Time',
          type: 'line',
          yAxisIndex: 0,
          data: sessionData.avgTime.map(t => t * 1000), // Scale for better visualization
          itemStyle: {
            color: '#fac858'
          },
          lineStyle: {
            width: 2
          },
          symbol: isMobile ? 'none' : 'emptyCircle',
          symbolSize: 6
        }
      ]
    };
  };

  // User travel chart options
  const getTravelChartOption = () => {
   const currentData = travelData[timeRange as keyof typeof travelData];

    
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        data: currentData.paths.map((path: TravelPath) => `${path.from} → ${path.to}`),
        textStyle: {
          fontSize: isMobile ? 9 : 11
        }
      },
      series: [
        {
          name: 'User Travel Paths',
          type: 'pie',
          radius: isMobile ? ['40%', '70%'] : ['50%', '80%'],
          center: isMobile ? ['40%', '50%'] : ['40%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: isMobile ? 12 : 14,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: currentData.paths.map((path: TravelPath) => ({
            value: path.value,
            name: `${path.from} → ${path.to}`
          })),
          color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de']
        }
      ]
    };
  };

  // Custom select component for time range
  const TimeRangeSelect = () => {
    return (
      <div className="relative inline-block ">
        <select 
          className="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="Past 7 Days">Past 7 Days</option>
          <option value="Past 30 Days">Past 30 Days</option>
          <option value="Past 6 Month">Past 6 Months</option>
          <option value="Past 1 Year">Past 1 Year</option>
        </select>
      </div>
    );
  };

  return (
    <div className="w-full p-4 bg-gray-50 min-h-[10vh]">
      
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Side - Session Analytics */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Session Analytics
          </h2>
          <ReactECharts
            option={getSessionChartOption()}
            style={{ height: isMobile ? '300px' : '400px', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="bg-blue-50 p-2 rounded-lg">
              <p className="text-xs text-gray-600">Total Sessions</p>
              <p className="text-sm font-bold text-blue-600">{sessionData.totalSessions.reduce((a, b) => a + b, 0).toLocaleString()}</p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <p className="text-xs text-gray-600">Unique Users</p>
              <p className="text-sm font-bold text-green-600">{sessionData.uniqueUsers.reduce((a, b) => a + b, 0).toLocaleString()}</p>
            </div>
            <div className="bg-yellow-50 p-2 rounded-lg">
              <p className="text-xs text-gray-600">Avg. Time (min)</p>
              <p className="text-sm font-bold text-yellow-600">{(sessionData.avgTime.reduce((a, b) => a + b, 0) / sessionData.avgTime.length).toFixed(1)}</p>
            </div>
          </div>
        </div>

        {/* Right Side - User Travel Paths */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              User Travel Paths
            </h2>
            <TimeRangeSelect />
          </div>
          <ReactECharts
            option={getTravelChartOption()}
            style={{ height: isMobile ? '300px' : '400px', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
          <div className="mt-4 text-sm text-gray-600">
            <p className="text-center">Shows how users navigate between pages on your website</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Row2;