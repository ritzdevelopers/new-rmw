"use client";
import type { CallbackDataParams } from "echarts/types/dist/shared";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import {
  Activity,
  Users,
  Clock,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  BarChart3,
  ChevronDown,
  MoreVertical,
} from "lucide-react";
import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";

// ----- Type Definitions -----
interface CustomSelectProps {
  options: string[];
  defaultValue: string;
  className?: string;
  onSelect: (value: string) => void;
}

interface StatsDataItem {
  title: string;
  value: string;
  description: string;
  change: string;
  changeDirection: "up" | "down";
  icon: React.ReactNode;
  color: string;
  timeFilter: boolean;
  timeOptions: string[];
  sessionFilter?: boolean;
  sessionOptions?: string[];
  unit?: string;
  filterVal?: string;
}

interface EChartsTooltipParam {
  name: string;
  value: number;
  marker: string;
}

type ActiveTabType = "Total" | "Revisit" | "Unique";

// ----- Constants and Helpers -----
const nfCompact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const nfFull = new Intl.NumberFormat("en-IN");

const fmtCompact = (v: number) =>
  typeof v === "number" ? nfCompact.format(v) : v;
const fmtFull = (v: number) => (typeof v === "number" ? nfFull.format(v) : v);

// ----- Custom Select Component -----
const CustomSelect = React.memo(
  ({ options, defaultValue, className = "", onSelect }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(defaultValue);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = useCallback(
      (option: string) => {
        setSelected(option);
        onSelect(option);
        setIsOpen(false);
      },
      [onSelect]
    );

    return (
      <div className={`relative text-xs ${className}`} ref={dropdownRef}>
        <button
          type="button"
          className={`flex items-center justify-between w-full px-3 py-2 bg-white rounded-md border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
            isOpen ? "ring-2 ring-indigo-500 border-indigo-500" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span className="truncate">{selected}</span>
          <ChevronDown
            size={14}
            className={`transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
            <div className="py-1 max-h-60 overflow-auto">
              {options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  className={`block w-full text-left px-3 py-2 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:bg-indigo-50 focus:text-indigo-700 ${
                    selected === option ? "bg-indigo-100 text-indigo-700" : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";

// ----- Stats Card Component -----
const StatsCard = React.memo(
  ({
    stat,
    setQueryType,
    setDuration,
    setFilter,
  }: {
    stat: StatsDataItem;
    setQueryType: (val: string) => void;
    setDuration: (val: string) => void;
    setFilter: (val: string) => void;
  }) => {
    const handleSelect = useCallback(
      (value: string) => {
        setQueryType(stat.title);
        if (
          value.includes("Revisit") ||
          value.includes("More Than 10 Sec") ||
          value.includes("More Than 30 Sec") ||
          value.includes("More Than 1 Min")
        ) {
          setFilter(value);
        } else {
          setDuration(value);
        }
      },
      [stat.title]
    );
    return (
      <div className="bg-white md:h-[350px] rounded-xl shadow-sm p-4 sm:p-5 md:p-6 flex flex-col gap-3 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200">
        {/* Header with title + filters */}
        <div className="flex justify-between items-start flex-wrap gap-2">
          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
          <div className="flex gap-2 flex-wrap">
            {stat.timeFilter && (
              <CustomSelect
                options={stat.timeOptions}
                defaultValue={stat.timeOptions[0]}
                className="w-28"
                onSelect={handleSelect}
              />
            )}
            {stat.sessionFilter && stat.sessionOptions && (
              <CustomSelect
                options={stat.sessionOptions}
                defaultValue={stat.sessionOptions[0]}
                className="w-32"
                onSelect={handleSelect}
              />
            )}
          </div>
        </div>

        {/* Value + Icon */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              {stat.value}{" "}
              {stat.unit ? (
                <span className="text-sm sm:text-base">{stat.unit}</span>
              ) : null}
            </h2>
            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
          </div>
          <div
            className={`p-3 rounded-full ${stat.color} bg-opacity-10 text-gray-700`}
          >
            {stat.icon}
          </div>
        </div>

        {/* Change indicator */}
        <div className="flex items-center gap-1 mt-2">
          <span
            className={`flex items-center text-xs font-medium ${
              stat.changeDirection === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {stat.changeDirection === "up" ? (
              <ArrowUp size={14} />
            ) : (
              <ArrowDown size={14} />
            )}
            {stat.change}
          </span>
          <span className="text-xs text-gray-500">vs previous day</span>
        </div>
      </div>
    );
  }
);

StatsCard.displayName = "StatsCard";

// ----- Chart Components -----
const ActiveUsersChart = React.memo(({ 
  sessionAnalyticsByCity 
}: { 
  sessionAnalyticsByCity: {
    totalSessions: number;
    totalSessionsRaw: number;
    cityWise: Record<string, number>;
    cityWiseRaw: Record<string, number>;
  } | null;
}) => {
  const handleSelect = useCallback((value: string) => {
    console.log("Selected time filter:", value);
  }, []);

  // Prepare data for the chart
  const chartData = useMemo(() => {
    if (!sessionAnalyticsByCity?.cityWise) return { cities: [], values: [] };
    
    const cities = Object.keys(sessionAnalyticsByCity.cityWise);
    const values = Object.values(sessionAnalyticsByCity.cityWise);
    
    return { cities, values };
  }, [sessionAnalyticsByCity]);

  const chartOption: EChartsOption = useMemo(
    () => ({
      title: {
        text: "Active Users By City",
        textStyle: { fontSize: 14, fontWeight: "normal" },
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        confine: true,
        formatter: (params: unknown) => {
          const param = Array.isArray(params)
            ? (params[0] as EChartsTooltipParam)
            : (params as EChartsTooltipParam);
          return `${param.name}<br/>${param.marker} Active Users: <b>${fmtFull(
            param.value
          )}</b>`;
        },
      },
      grid: {
        left: 80,
        right: 24,
        bottom: 16,
        top: 40,
        containLabel: true,
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01],
        axisLabel: {
          hideOverlap: true,
          formatter: (v: number) => fmtCompact(v),
          fontSize: 10,
        },
        splitLine: {
          show: true,
          lineStyle: { color: "#eef2f7" },
        },
      },
      yAxis: {
        type: "category",
        axisLabel: {
          hideOverlap: true,
          interval: 0,
          fontSize: 10,
        },
        data: chartData.cities,
      },
      dataZoom: [
        {
          type: "inside",
          yAxisIndex: 0,
          start: 0,
          end: 100,
          zoomLock: false,
        },
        {
          type: "slider",
          yAxisIndex: 0,
          height: 16,
          right: 8,
          left: 8,
          bottom: 0,
          handleSize: 14,
          brushSelect: false,
        },
      ],
      series: [
        {
          name: "Active Users",
          type: "bar",
          data: chartData.values,
          itemStyle: { color: "#4f46e5" },
          barMaxWidth: 18,
          label: {
            show: true,
            position: "right",
            distance: 4,
            formatter: (p: CallbackDataParams) => fmtCompact(Number(p.value)),
            fontSize: 9,
            color: "#111827",
          },
          labelLayout: { hideOverlap: true },
          emphasis: {
            focus: "series",
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.3)",
            },
          },
        },
      ],
      animation: false,
      progressive: 500,
    }),
    [chartData]
  );

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <Users size={18} className="text-indigo-600" />
          Active Users By City
        </h3>
        <div className="flex gap-2">
          <CustomSelect
            options={[
              "Last 7 Days",
              "Last 30 Days",
              "Last 6 Months",
              "Last Year",
            ]}
            defaultValue="Last 30 Days"
            className="w-36 text-xs"
            onSelect={handleSelect}
          />
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
      <ReactECharts
        option={chartOption}
        style={{ height: "250px", width: "100%" }}
        opts={{
          renderer: "svg",
        }}
      />
      <div className="flex justify-center gap-4 mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[#4f46e5]"></div>
          <span className="text-xs text-gray-600">Active Users</span>
        </div>
      </div>
    </div>
  );
});

ActiveUsersChart.displayName = "ActiveUsersChart";

const SessionAnalyticsChart = React.memo(
  ({
    activeTab,
    setActiveTab,
    setQueryType,
    setDuration,
    setQType,
    sessionAnalyticsByCity
  }: {
    activeTab: ActiveTabType;
    setActiveTab: (tab: ActiveTabType) => void;
    setQueryType: (val: string) => void;
    setDuration: (val: string) => void;
    setQType: (val: string | undefined) => void;
    sessionAnalyticsByCity: {
      totalSessions: number;
      totalSessionsRaw: number;
      cityWise: Record<string, number>;
      cityWiseRaw: Record<string, number>;
    } | null;
  }) => {
    const handleSelect = useCallback((value: string) => {
      setQueryType("Session Analytics By City");
      setDuration(value);
    }, []);
    const handleQFilter = (qType: string) => {
      setQueryType("Session Analytics By City");
      setQType(qType);
    };

    // Prepare data for the chart
    const chartData = useMemo(() => {
      if (!sessionAnalyticsByCity?.cityWise) return { cities: [], values: [] };
      
      const cities = Object.keys(sessionAnalyticsByCity.cityWise);
      const values = Object.values(sessionAnalyticsByCity.cityWise);
      
      return { cities, values };
    }, [sessionAnalyticsByCity]);

    const chartOption: EChartsOption = useMemo(
      () => ({
        title: {
          text: "User Session Analytics",
          textStyle: { fontSize: 14, fontWeight: "normal" },
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          confine: true,
          formatter: (params: unknown) => {
            const param = Array.isArray(params)
              ? (params[0] as EChartsTooltipParam)
              : (params as EChartsTooltipParam);
            return `${param.name}<br/>${param.marker} Sessions: <b>${fmtFull(
              param.value
            )}</b>`;
          },
        },
        grid: {
          left: 80,
          right: 24,
          bottom: 16,
          top: 40,
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLabel: {
            hideOverlap: true,
            formatter: (v: number) => fmtCompact(v),
            fontSize: 10,
          },
          splitLine: {
            show: true,
            lineStyle: { color: "#eef2f7" },
          },
        },
        yAxis: {
          type: "category",
          axisLabel: {
            hideOverlap: true,
            interval: 0,
            fontSize: 10,
          },
          data: chartData.cities,
        },
        dataZoom: [
          {
            type: "inside",
            yAxisIndex: 0,
            start: 0,
            end: 100,
            zoomLock: false,
          },
          {
            type: "slider",
            yAxisIndex: 0,
            height: 16,
            right: 8,
            left: 8,
            bottom: 0,
            handleSize: 14,
            brushSelect: false,
          },
        ],
        series: [
          {
            name: "Sessions",
            type: "bar",
            data: chartData.values,
            itemStyle: { color: "#3b82f6" },
            barMaxWidth: 18,
            label: {
              show: true,
              position: "right",
              distance: 4,
              formatter: (p: CallbackDataParams) => fmtCompact(Number(p.value)),
              fontSize: 9,
              color: "#111827",
            },
            labelLayout: { hideOverlap: true },
            emphasis: {
              focus: "series",
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.3)",
              },
            },
          },
        ],
        animation: false,
        progressive: 500,
      }),
      [chartData]
    );

    return (
      <div className="w-full bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
              <BarChart3 size={18} className="text-indigo-600" />
              User Session Analytics
            </h3>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {(["Total", "Revisit", "Unique"] as ActiveTabType[]).map(
                (tab) => (
                  <button
                    key={tab}
                    className={`whitespace-nowrap px-3 py-1.5 text-xs rounded-md transition-all ${
                      activeTab === tab
                        ? "bg-indigo-100 text-indigo-700 font-medium shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      setActiveTab(tab);
                      handleQFilter(tab);
                    }}
                    aria-pressed={activeTab === tab}
                  >
                    {tab === "Total"
                      ? "Total"
                      : tab === "Revisit"
                      ? "Revisit"
                      : "Unique"}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="flex gap-2 self-end">
            <CustomSelect
              options={[
                "Last 7 Days",
                "Last 30 Days",
                "Last 6 Months",
                "Last Year",
              ]}
              defaultValue="Last 30 Days"
              className="w-36 text-xs"
              onSelect={handleSelect}
            />
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
        <ReactECharts
          option={chartOption}
          style={{ height: "220px", width: "100%" }}
          opts={{
            renderer: "svg",
          }}
        />
        <div className="flex justify-center gap-4 mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#3b82f6]"></div>
            <span className="text-xs text-gray-600">Sessions</span>
          </div>
        </div>
      </div>
    );
  }
);

SessionAnalyticsChart.displayName = "SessionAnalyticsChart";

// Extend RowProps for Row1
interface RowProps {
  setDuration: Dispatch<SetStateAction<string>>;
  setFilter: Dispatch<SetStateAction<string>>;
  setQueryType: Dispatch<SetStateAction<string>>;
  setQType: Dispatch<SetStateAction<string | undefined>>;
  stat?: StatsDataItem;

  // New props for Row1
  totalUsers: { totalUsers: string; performanceAvg: string } | null;
  sessionCount: { totalSessions: string; performanceAvg: string } | null;
  boundeRate: { totalBounceUsers: string; lastUsersBounceRate: string } | null;
  avgVisitDuration: { usersSpentTime: string; lastSpentTimeAvg: string } | null;
  sessionAnalyticsByCity: {
    totalSessions: number;
    totalSessionsRaw: number;
    cityWise: Record<string, number>;
    cityWiseRaw: Record<string, number>;
  } | null;
}

// ----- Main Component -----
function Row1({
  setDuration,
  setFilter,
  setQueryType,
  setQType,
  totalUsers,
  sessionCount,
  boundeRate,
  avgVisitDuration,
  sessionAnalyticsByCity,
}: RowProps) {
  const [activeTab, setActiveTab] = useState<ActiveTabType>("Total");

  // ----- Stats Cards Data -----
  const statsData: StatsDataItem[] = useMemo(
    () => [
      {
        title: "Active Users",
        value: totalUsers?.totalUsers || "0",
        description: "Active Now",
        change: totalUsers?.performanceAvg || "0.00%",
        changeDirection: totalUsers?.performanceAvg?.includes("-") ? "down" : "up",
        icon: <Activity size={20} className="text-[#FFFFFF]" />,
        color: "bg-blue-500",
        timeFilter: true,
        timeOptions: [
          "Current",
          "Last 7 Days",
          "Last 30 Days",
          "Last 6 Month",
          "Last 12 Month",
          "All",
        ],
      },
      {
        title: "Total Users",
        value: totalUsers?.totalUsers || "0",
        description: "All Time",
        change: totalUsers?.performanceAvg || "0.00%",
        changeDirection: totalUsers?.performanceAvg?.includes("-") ? "down" : "up",
        icon: <Users size={20} className="text-[#FFFFFF]" />,
        color: "bg-indigo-500",
        timeFilter: true,
        timeOptions: [
          "All",
          "Last 7 Days",
          "Last 30 Days",
          "Last 6 Month",
          "Last 12 Month",
        ],
      },
      {
        title: "Session Count",
        value: sessionCount?.totalSessions || "0",
        description: "All Time",
        change: sessionCount?.performanceAvg || "0.00%",
        changeDirection: sessionCount?.performanceAvg?.includes("-") ? "down" : "up",
        icon: <BarChart3 size={20} className="text-[#FFFFFF]" />,
        color: "bg-purple-500",
        timeFilter: true,
        sessionFilter: true,
        timeOptions: [
          "All",
          "Last 7 Days",
          "Last 30 Days",
          "Last 6 Month",
          "Last 12 Month",
        ],
        sessionOptions: [
          "All",
          "Session Revisit",
          "More Than 10 Sec",
          "More Than 30 Sec",
          "More Than 1 Min.",
        ],
      },
      {
        title: "Bounce Rate",
        value: boundeRate?.lastUsersBounceRate || "0.00%",
        description: "All Time",
        change: boundeRate?.lastUsersBounceRate || "0.00%",
        changeDirection: boundeRate?.lastUsersBounceRate?.includes("-") ? "down" : "up",
        icon: <TrendingUp size={20} className="text-[#FFFFFF]" />,
        color: "bg-pink-500",
        timeFilter: true,
        timeOptions: [
          "All",
          "Last 7 Days",
          "Last 30 Days",
          "Last 6 Month",
          "Last 12 Month",
        ],
      },
      {
        title: "Total Leads",
        value: totalUsers?.totalUsers || "0",
        description: "All Time",
        change: totalUsers?.performanceAvg || "0.00%",
        changeDirection: totalUsers?.performanceAvg?.includes("-") ? "down" : "up",
        icon: <Users size={20} className="text-[#FFFFFF]" />,
        color: "bg-amber-500",
        timeFilter: true,
        timeOptions: [
          "All",
          "Last 7 Days",
          "Last 30 Days",
          "Last 6 Month",
          "Last 12 Month",
        ],
      },
      {
        title: "Avg. Visit Duration",
        value: avgVisitDuration?.usersSpentTime?.split(" ")[0] || "0",
        unit: avgVisitDuration?.usersSpentTime?.split(" ")[1] || "Hours",
        description: "All Time",
        change: avgVisitDuration?.lastSpentTimeAvg || "0.00%",
        changeDirection: avgVisitDuration?.lastSpentTimeAvg?.includes("-") ? "down" : "up",
        icon: <Clock size={20} className="text-[#FFFFFF]" />,
        color: "bg-green-500",
        timeFilter: true,
        timeOptions: [
          "All",
          "Last 7 Days",
          "Last 30 Days",
          "Last 6 Month",
          "Last 12 Month",
        ],
      },
    ],
    [totalUsers, sessionCount, boundeRate, avgVisitDuration]
  );

  return (
    <section className="w-full flex flex-col gap-6 p-4 sm:p-5 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
        Analytics Dashboard
      </h1>

      {/* First Row Of Dashboard */}
      <div className="w-full flex flex-col xl:flex-row gap-4 md:gap-6">
        {/* Stats Cards */}
        <div className="w-full xl:w-2/3  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              stat={stat}
              setQueryType={setQueryType}
              setDuration={setDuration}
              setFilter={setFilter}
            />
          ))}
        </div>
        {/* Charts Section */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4 md:gap-6">
          <ActiveUsersChart sessionAnalyticsByCity={sessionAnalyticsByCity} />
          <SessionAnalyticsChart
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setQueryType={setQueryType}
            setDuration={setDuration}
            setQType={setQType}
            sessionAnalyticsByCity={sessionAnalyticsByCity}
          />
        </div>
      </div>
    </section>
  );
}

export default Row1;