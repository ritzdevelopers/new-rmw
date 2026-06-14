"use client";

import { cn } from "@/lib/utils";
import {
  readManagementSessionUser,
  type ManagementSessionUser,
} from "@/lib/managementSession";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Globe,
  MonitorSmartphone,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaUsers } from "react-icons/fa";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
function formatRole(role: string): string {
  if (role === "super_admin") return "Super Admin";
  if (role === "editor") return "Editor";
  return role.replace(/_/g, " ");
}

type TrafficRow = {
  _id: string;
  url?: string;
  country?: string;
  device?: string;
  referrer?: string;
  sessionId?: string;
  createdAt?: string;
};

type TrafficApiResponse = {
  success: boolean;
  range: string;
  count: number;
  data: TrafficRow[];
};

const RANGE_OPTIONS = [
  { value: "last7days", label: "7D" },
  { value: "last30days", label: "30D" },
  { value: "last60days", label: "60D" },
  { value: "last90days", label: "90D" },
  { value: "last180days", label: "180D" },
  { value: "last365days", label: "365D" },
  { value: "alltime", label: "All" },
] as const;

const RANGE_LABELS: Record<string, string> = {
  last7days: "Last 7 days",
  last30days: "Last 30 days",
  last60days: "Last 60 days",
  last90days: "Last 90 days",
  last180days: "Last 180 days",
  last365days: "Last 365 days",
  alltime: "All time",
};

const CHART_GOLD = "#c59d4f";
const CHART_SLATE = "#394a59";
const CHART_ACCENT = [
  "#c59d4f",
  "#394a59",
  "#5b7c6d",
  "#5c7a9e",
  "#a68962",
  "#7d6b58",
];

const TOOLTIP_STYLE = {
  borderRadius: 12,
  border: "1px solid rgba(15,23,42,0.08)",
  boxShadow: "0 16px 40px rgba(15,23,42,0.12)",
  backgroundColor: "rgba(255,255,255,0.97)",
  backdropFilter: "blur(8px)",
  fontSize: 12,
};

const TOOLTIP_DARK = {
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.08)",
  backgroundColor: "rgba(9,9,11,0.92)",
  boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
  color: "#fafafa",
  fontSize: 12,
};

function utcDayKey(iso: string | undefined): string {
  if (!iso) return "";
  try {
    const d = parseISO(iso);
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  } catch {
    return "";
  }
}

function aggregateByDay(
  rows: TrafficRow[]
): { date: string; label: string; visits: number }[] {
  const map = new Map<string, number>();
  for (const r of rows) {
    const k = utcDayKey(r.createdAt);
    if (!k) continue;
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, visits]) => ({
      date,
      label: format(new Date(`${date}T12:00:00.000Z`), "MMM d", {
        locale: enUS,
      }),
      visits,
    }));
}

function topByField(
  rows: TrafficRow[],
  field: keyof TrafficRow,
  limit: number,
  emptyLabel: string
): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const r of rows) {
    const raw = r[field];
    const key =
      typeof raw === "string" && raw.trim()
        ? String(raw).trim()
        : emptyLabel;
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

function truncateUrl(url: string, max = 36): string {
  if (url.length <= max) return url;
  return url.slice(0, max - 1) + "…";
}

function uniqueSessions(rows: TrafficRow[]): number {
  const set = new Set<string>();
  for (const r of rows) {
    if (r.sessionId && String(r.sessionId).trim()) set.add(r.sessionId);
  }
  return set.size;
}

function initials(name: string): string {
  const p = name.trim().split(/\s+/).filter(Boolean);
  if (!p.length) return "?";
  if (p.length === 1) return p[0]!.slice(0, 2).toUpperCase();
  return (p[0]![0] + p[p.length - 1]![0]).toUpperCase();
}

function MiniSparkline({ data }: { data: { v: number }[] }) {
  if (data.length < 2) return null;
  return (
    <div className="mt-3 h-8 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <Line
            type="monotone"
            dataKey="v"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={1.5}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                       */
/* ------------------------------------------------------------------ */
function SectionCard({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden"
      style={{
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.04)",
      }}
    >
      <div
        className="flex items-center gap-2 px-5 py-4"
        style={{ borderBottom: "1px solid #F1F5F9" }}
      >
        {icon && (
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(197,157,79,0.1)" }}
          >
            <span style={{ color: "#C59D4F" }}>{icon}</span>
          </div>
        )}
        <div className="min-w-0">
          <h2
            className="text-sm font-semibold leading-tight"
            style={{ color: "#0B1623" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-[11px] mt-0.5" style={{ color: "#94A3B8" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

const LOCALE = "en-US" as const;

/* ------------------------------------------------------------------ */
/* Main dashboard component                                            */
/* ------------------------------------------------------------------ */
export default function DashboardPage() {
  const [chartsMounted, setChartsMounted] = useState(false);
  const [visitorData, setVisitorData] = useState<{ visitors: number } | null>(
    null
  );
  const [user, setUser] = useState<ManagementSessionUser | null>(null);
  const [range, setRange] =
    useState<(typeof RANGE_OPTIONS)[number]["value"]>("last30days");
  const [traffic, setTraffic] = useState<TrafficRow[] | null>(null);
  const [trafficMeta, setTrafficMeta] = useState<{
    count: number;
    range: string;
  } | null>(null);
  const [loadingTraffic, setLoadingTraffic] = useState(true);
  const [trafficError, setTrafficError] = useState<string | null>(null);
  const [visitDataError, setVisitDataError] = useState(false);

  useEffect(() => {
    setUser(readManagementSessionUser());
    setChartsMounted(true);
  }, []);

  useEffect(() => {
    axios
      .get("/api/get-visit-data")
      .then((r) => {
        setVisitorData(r.data);
        setVisitDataError(false);
      })
      .catch(() => setVisitDataError(true));
  }, []);

  const fetchTraffic = useCallback(async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("rm_token") : null;
    if (!token) {
      setTrafficError("Sign in required to load traffic analytics.");
      setTraffic([]);
      setTrafficMeta(null);
      setLoadingTraffic(false);
      return;
    }
    setLoadingTraffic(true);
    setTrafficError(null);
    try {
      const res = await axios.get<TrafficApiResponse>(
        `/api/tracker/get-traffic/${range}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data?.success && Array.isArray(res.data.data)) {
        setTraffic(res.data.data);
        setTrafficMeta({ count: res.data.count, range: res.data.range });
      } else {
        setTraffic([]);
        setTrafficMeta(null);
      }
    } catch (e: unknown) {
      const msg =
        axios.isAxiosError(e) && e.response?.status === 401
          ? "Session expired. Please sign in again."
          : "Could not load traffic data.";
      setTrafficError(msg);
      setTraffic([]);
      setTrafficMeta(null);
    } finally {
      setLoadingTraffic(false);
    }
  }, [range]);

  useEffect(() => {
    fetchTraffic();
  }, [fetchTraffic]);

  const byDay = useMemo(() => aggregateByDay(traffic ?? []), [traffic]);
  const sparkSeries = useMemo(
    () => byDay.slice(-16).map((d) => ({ v: d.visits })),
    [byDay]
  );
  const topPages = useMemo(() => {
    const raw = topByField(traffic ?? [], "url", 8, "(no URL)");
    return raw.map((r) => ({
      ...r,
      name: r.name === "(no URL)" ? r.name : truncateUrl(r.name),
      full: r.name,
    }));
  }, [traffic]);
  const topCountries = useMemo(
    () => topByField(traffic ?? [], "country", 8, "Unknown"),
    [traffic]
  );
  const deviceSplit = useMemo(
    () => topByField(traffic ?? [], "device", 6, "Unknown"),
    [traffic]
  );
  const uniqueSessionCount = useMemo(
    () => uniqueSessions(traffic ?? []),
    [traffic]
  );

  const totalInRange = trafficMeta?.count ?? 0;
  const sessionRate =
    totalInRange > 0
      ? Math.round((uniqueSessionCount / totalInRange) * 100)
      : 0;
  const rangeFullLabel = RANGE_LABELS[range] ?? range;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      {/* ── Welcome banner ─────────────────────────────────── */}
      {user && (
        <div
          className="relative overflow-hidden rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{
            background:
              "linear-gradient(135deg, #0B1623 0%, #1A2E40 60%, #0F2237 100%)",
          }}
        >
          {/* Background orb */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(197,157,79,0.12) 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div className="relative z-10">
            <p className="text-sm font-medium" style={{ color: "#C59D4F" }}>
              Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"},
            </p>
            <h1
              className="text-2xl font-bold text-white mt-0.5 tracking-tight"
            >
              {user.name}
            </h1>
            <div className="mt-3 flex items-center gap-2">
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(197,157,79,0.15)",
                  color: "#C59D4F",
                  border: "1px solid rgba(197,157,79,0.2)",
                }}
              >
                <ShieldCheck className="w-3 h-3" />
                {formatRole(user.role)}
              </div>
              <span className="text-xs" style={{ color: "#4A6070" }}>
                {user.email}
              </span>
            </div>
          </div>
          <div className="relative z-10 flex items-center gap-3">
            {/* Range picker */}
            <div
              className="flex gap-0.5 rounded-xl p-1 overflow-x-auto"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {RANGE_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  onClick={() => setRange(o.value)}
                  className={cn(
                    "shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all duration-150",
                    range === o.value
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-300"
                  )}
                  style={
                    range === o.value
                      ? {
                          background:
                            "linear-gradient(135deg, #C59D4F, #9A7530)",
                        }
                      : {}
                  }
                  title={RANGE_LABELS[o.value]}
                >
                  {o.label}
                </button>
              ))}
            </div>
            {/* Refresh */}
            <button
              onClick={() => fetchTraffic()}
              disabled={loadingTraffic}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all disabled:opacity-50"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <RefreshCw
                className={cn("w-3.5 h-3.5", loadingTraffic && "animate-spin")}
              />
              Refresh
            </button>
          </div>
        </div>
      )}

      {/* ── KPI cards ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* All-time visitors */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "#94A3B8" }}
              >
                Site Visitors
              </p>
              <p
                className="mt-2 text-3xl font-bold tabular-nums"
                style={{ color: "#0B1623" }}
              >
                {visitDataError
                  ? "—"
                  : visitorData != null
                  ? visitorData.visitors.toLocaleString(LOCALE)
                  : "…"}
              </p>
              <p
                className="mt-1.5 flex items-center gap-1.5 text-xs"
                style={{ color: "#94A3B8" }}
              >
                <BarChart3 className="w-3 h-3" style={{ color: "#C59D4F" }} />
                All time
              </p>
            </div>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(197,157,79,0.08)" }}
            >
              <FaUsers className="w-5 h-5" style={{ color: "#C59D4F" }} />
            </div>
          </div>
        </div>

        {/* Period views — dark card */}
        <div
          className="relative rounded-2xl p-5 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0B1623 0%, #1A2E40 100%)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="relative z-10 flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "#4A6070" }}
              >
                Views · Period
              </p>
              <p className="mt-2 text-3xl font-bold tabular-nums text-white">
                {loadingTraffic ? (
                  <span
                    className="inline-block h-9 w-24 rounded-lg animate-pulse"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  />
                ) : (
                  totalInRange.toLocaleString(LOCALE)
                )}
              </p>
              <p
                className="mt-1.5 flex items-center gap-1.5 text-xs"
                style={{ color: "#4A6070" }}
              >
                <Activity className="w-3 h-3" style={{ color: "#C59D4F" }} />
                <span className="truncate">{rangeFullLabel}</span>
              </p>
              {chartsMounted && !loadingTraffic && sparkSeries.length >= 2 && (
                <MiniSparkline data={sparkSeries} />
              )}
            </div>
            <TrendingUp
              className="w-5 h-5 flex-shrink-0"
              style={{ color: "#C59D4F" }}
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Unique sessions */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(197,157,79,0.15)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03), 0 8px 24px rgba(197,157,79,0.06)",
          }}
        >
          <div className="flex flex-col h-full justify-between gap-2">
            <p
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "#94A3B8" }}
            >
              Unique Sessions
            </p>
            <p
              className="text-3xl font-bold tabular-nums"
              style={{ color: "#0B1623" }}
            >
              {loadingTraffic ? (
                <span
                  className="inline-block h-9 w-20 rounded-lg animate-pulse"
                  style={{ background: "rgba(197,157,79,0.1)" }}
                />
              ) : (
                uniqueSessionCount.toLocaleString(LOCALE)
              )}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold"
                style={{
                  background: "rgba(197,157,79,0.1)",
                  color: "#9A7530",
                }}
              >
                <Users className="w-2.5 h-2.5" />
                Sessions
              </span>
              {!loadingTraffic && totalInRange > 0 && (
                <span className="text-[10px]" style={{ color: "#94A3B8" }}>
                  {sessionRate}% of hits
                </span>
              )}
              <ArrowUpRight
                className="ml-auto w-5 h-5"
                style={{ color: "rgba(197,157,79,0.4)" }}
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* User card */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.04)",
          }}
        >
          {user ? (
            <div className="flex flex-col gap-2">
              <p
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "#94A3B8" }}
              >
                Signed In As
              </p>
              <div className="flex items-center gap-3 mt-1">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(197,157,79,0.2), rgba(197,157,79,0.4))",
                    color: "#9A7530",
                    border: "1.5px solid rgba(197,157,79,0.25)",
                  }}
                >
                  {initials(user.name)}
                </div>
                <div className="min-w-0">
                  <p
                    className="text-sm font-semibold truncate"
                    style={{ color: "#0B1623" }}
                  >
                    {user.name}
                  </p>
                  <p
                    className="text-xs truncate"
                    style={{ color: "#94A3B8" }}
                  >
                    {user.email}
                  </p>
                </div>
              </div>
              <div
                className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold w-fit"
                style={{
                  background: "rgba(197,157,79,0.08)",
                  color: "#9A7530",
                  border: "1px solid rgba(197,157,79,0.15)",
                }}
              >
                <ShieldCheck className="w-3 h-3" />
                {formatRole(user.role)}
              </div>
            </div>
          ) : (
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              Session unavailable.
            </p>
          )}
        </div>
      </div>

      {/* ── Error banner ───────────────────────────────────── */}
      {trafficError && (
        <div
          className="flex items-start gap-3 px-4 py-3.5 rounded-xl text-sm"
          style={{
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.2)",
            color: "#92400E",
          }}
        >
          <span
            className="flex w-5 h-5 rounded-md items-center justify-center text-[10px] font-bold flex-shrink-0"
            style={{ background: "rgba(245,158,11,0.15)" }}
          >
            !
          </span>
          {trafficError}
        </div>
      )}

      {/* ── Traffic over time chart ─────────────────────────── */}
      <SectionCard
        title="Traffic over time"
        subtitle={`Daily page views · ${rangeFullLabel}`}
        icon={<BarChart3 className="w-3.5 h-3.5" />}
      >
        <div
          className="px-5 pb-5 pt-2"
          style={{ background: "rgba(248,250,252,0.5)" }}
        >
          <div className="h-[240px] w-full">
            {!chartsMounted ? (
              <div
                className="h-full w-full rounded-xl animate-pulse"
                style={{ background: "#F1F5F9" }}
              />
            ) : loadingTraffic ? (
              <div className="flex h-full flex-col items-center justify-center gap-3">
                <div
                  className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: "#C59D4F", borderTopColor: "transparent" }}
                />
                <p className="text-xs" style={{ color: "#94A3B8" }}>
                  Loading traffic data…
                </p>
              </div>
            ) : byDay.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed"
                style={{ borderColor: "#E2E8F0" }}>
                <Globe className="w-8 h-8" style={{ color: "#CBD5E1" }} />
                <p className="text-sm font-medium" style={{ color: "#64748B" }}>
                  No data for this range.
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={byDay}
                  margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="dashFillGold"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={CHART_GOLD}
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="60%"
                        stopColor={CHART_GOLD}
                        stopOpacity={0.06}
                      />
                      <stop
                        offset="100%"
                        stopColor={CHART_GOLD}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="4 8"
                    stroke="#E2E8F0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11, fill: "#94A3B8", fontWeight: 500 }}
                    tickLine={false}
                    axisLine={{ stroke: "#E2E8F0" }}
                    dy={6}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#94A3B8", fontWeight: 500 }}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                    width={42}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    labelStyle={{
                      fontWeight: 600,
                      color: "#0F172A",
                      marginBottom: 4,
                    }}
                    labelFormatter={(label, payload) => {
                      const row = payload?.[0]?.payload as
                        | { date?: string }
                        | undefined;
                      if (row?.date) {
                        try {
                          return format(
                            new Date(`${row.date}T12:00:00.000Z`),
                            "MMM d, yyyy",
                            { locale: enUS }
                          );
                        } catch {
                          return String(label ?? "");
                        }
                      }
                      return String(label ?? "");
                    }}
                    formatter={(value: number | string) => [
                      typeof value === "number"
                        ? value.toLocaleString(LOCALE)
                        : value,
                      "Views",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="visits"
                    name="Views"
                    stroke={CHART_GOLD}
                    strokeWidth={2.5}
                    fill="url(#dashFillGold)"
                    activeDot={{
                      r: 5,
                      strokeWidth: 2,
                      stroke: "#fff",
                      fill: CHART_GOLD,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </SectionCard>

      {/* ── Secondary charts row ────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Top pages */}
        <SectionCard
          title="Top pages"
          subtitle="By view count — hover for full URL"
          icon={<BarChart3 className="w-3.5 h-3.5" />}
        >
          <div className="h-[240px] px-4 pb-5 pt-2">
            {!chartsMounted ? (
              <div
                className="h-full rounded-xl animate-pulse"
                style={{ background: "#F1F5F9" }}
              />
            ) : loadingTraffic ? (
              <div className="flex h-full items-center justify-center text-xs" style={{ color: "#94A3B8" }}>
                Loading…
              </div>
            ) : topPages.length === 0 ? (
              <div className="flex h-full items-center justify-center rounded-xl border-2 border-dashed text-xs"
                style={{ borderColor: "#E2E8F0", color: "#94A3B8" }}>
                No data.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={topPages}
                  margin={{ left: 4, right: 12, top: 6, bottom: 6 }}
                >
                  <CartesianGrid
                    strokeDasharray="4 8"
                    stroke="#F1F5F9"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: "#94A3B8" }}
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={120}
                    tick={{ fontSize: 10, fill: "#64748B" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(value: number) => [
                      value.toLocaleString(LOCALE),
                      "Views",
                    ]}
                    labelFormatter={(_, payload) => {
                      const row = payload?.[0]?.payload as
                        | { full?: string; name?: string }
                        | undefined;
                      return row?.full ?? row?.name ?? "";
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={12}>
                    {topPages.map((_, i) => (
                      <Cell
                        key={`cell-${i}`}
                        fill={i % 2 === 0 ? CHART_GOLD : CHART_SLATE}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </SectionCard>

        {/* By country */}
        <SectionCard
          title="By country"
          subtitle="Visit distribution"
          icon={<Globe className="w-3.5 h-3.5" />}
        >
          <div className="h-[240px] px-4 pb-5 pt-2">
            {!chartsMounted ? (
              <div
                className="h-full rounded-xl animate-pulse"
                style={{ background: "#F1F5F9" }}
              />
            ) : loadingTraffic ? (
              <div className="flex h-full items-center justify-center text-xs" style={{ color: "#94A3B8" }}>
                Loading…
              </div>
            ) : topCountries.length === 0 ? (
              <div className="flex h-full items-center justify-center rounded-xl border-2 border-dashed text-xs"
                style={{ borderColor: "#E2E8F0", color: "#94A3B8" }}>
                No country data.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topCountries}
                  margin={{ top: 6, right: 6, left: -4, bottom: 4 }}
                >
                  <CartesianGrid
                    strokeDasharray="4 8"
                    stroke="#F1F5F9"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 9, fill: "#94A3B8" }}
                    interval={0}
                    angle={-28}
                    textAnchor="end"
                    height={60}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#94A3B8" }}
                    allowDecimals={false}
                    width={30}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Bar
                    dataKey="count"
                    fill={CHART_SLATE}
                    radius={[8, 8, 0, 0]}
                    maxBarSize={44}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </SectionCard>
      </div>

      {/* ── Devices + Scope row ─────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Devices pie */}
        <div className="lg:col-span-3">
          <SectionCard
            title="Devices"
            subtitle="Share of visits by device type"
            icon={<MonitorSmartphone className="w-3.5 h-3.5" />}
          >
            <div className="h-[210px] px-4 pb-4 pt-2">
              {!chartsMounted ? (
                <div
                  className="h-full rounded-xl animate-pulse"
                  style={{ background: "#F1F5F9" }}
                />
              ) : loadingTraffic || !deviceSplit.length ? (
                <div className="flex h-full items-center justify-center text-xs" style={{ color: "#94A3B8" }}>
                  {loadingTraffic ? "Loading…" : "No device data."}
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceSplit}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="42%"
                      innerRadius={46}
                      outerRadius={76}
                      paddingAngle={3}
                      stroke="rgba(255,255,255,0.9)"
                      strokeWidth={2}
                      label={false}
                    >
                      {deviceSplit.map((_, i) => (
                        <Cell
                          key={`dev-${i}`}
                          fill={CHART_ACCENT[i % CHART_ACCENT.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={TOOLTIP_DARK} />
                    <Legend
                      verticalAlign="bottom"
                      height={26}
                      wrapperStyle={{ fontSize: "11px" }}
                      formatter={(value) => (
                        <span style={{ color: "#64748B" }}>{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </SectionCard>
        </div>

        {/* Scope summary */}
        <div
          className="lg:col-span-2 rounded-2xl p-5 flex flex-col"
          style={{
            background:
              "linear-gradient(145deg, #0B1623 0%, #1A2E40 100%)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "#334D63" }}
          >
            Scope
          </p>
          <p
            className="mt-3 text-xs leading-relaxed"
            style={{ color: "#4A6070" }}
          >
            Data filtered server-side by your session and the selected range.
            Hits = tracked page views. Unique sessions use stored session IDs.
          </p>
          <dl
            className="mt-4 space-y-3 pt-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="flex justify-between gap-2">
              <dt className="text-xs" style={{ color: "#4A6070" }}>
                Range
              </dt>
              <dd
                className="text-xs font-semibold text-white"
              >
                {rangeFullLabel}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-xs" style={{ color: "#4A6070" }}>
                Records
              </dt>
              <dd
                className="text-xs font-semibold tabular-nums text-white"
              >
                {loadingTraffic ? "…" : totalInRange.toLocaleString(LOCALE)}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-xs" style={{ color: "#4A6070" }}>
                Sessions
              </dt>
              <dd
                className="text-xs font-semibold tabular-nums text-white"
              >
                {loadingTraffic
                  ? "…"
                  : uniqueSessionCount.toLocaleString(LOCALE)}
              </dd>
            </div>
          </dl>
          <div
            className="mt-auto pt-4 flex items-center gap-1.5"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
          >
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center"
              style={{ background: "rgba(197,157,79,0.15)" }}
            >
              <ShieldCheck className="w-3 h-3" style={{ color: "#C59D4F" }} />
            </div>
            <p className="text-[10px]" style={{ color: "#334D63" }}>
              Ritz Media World · Admin v2.0
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="text-center text-xs pt-6 border-t"
        style={{ borderColor: "#E2E8F0", color: "#94A3B8" }}
      >
        Designed & developed by{" "}
        <strong className="font-semibold" style={{ color: "#64748B" }}>
          Ritz Media World
        </strong>
      </footer>
    </div>
  );
}
