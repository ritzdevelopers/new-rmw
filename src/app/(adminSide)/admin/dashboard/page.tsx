"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";
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
  LayoutDashboard,
  MonitorSmartphone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCircle,
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

function formatRole(role: string): string {
  if (role === "super_admin") return "Super admin";
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
  { value: "alltime", label: "All time" },
] as const;

/** Full labels for tooltips / summary */
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
const CHART_ACCENT = ["#c59d4f", "#394a59", "#5b7c6d", "#5c7a9e", "#a68962", "#7d6b58"];

const TOOLTIP_LIGHT = {
  borderRadius: 12,
  border: "1px solid rgba(15, 23, 42, 0.08)",
  boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.18)",
  backgroundColor: "rgba(255,255,255,0.96)",
  backdropFilter: "blur(8px)",
};

const TOOLTIP_DARK = {
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.08)",
  backgroundColor: "rgba(9, 9, 11, 0.92)",
  boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
  color: "#fafafa",
  fontSize: 12,
};

/** UTC calendar date — consistent on server and client for hydration. */
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

function aggregateByDay(rows: TrafficRow[]): { date: string; label: string; visits: number }[] {
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
      label: format(new Date(`${date}T12:00:00.000Z`), "MMM d", { locale: enUS }),
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

function truncateUrl(url: string, max = 42): string {
  if (url.length <= max) return url;
  return url.slice(0, max - 1) + "…";
}

function uniqueSessions(rows: TrafficRow[]): number {
  const set = new Set<string>();
  for (const r of rows) {
    if (r.sessionId && String(r.sessionId).trim()) {
      set.add(r.sessionId);
    }
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
    <div className="mt-2 h-7 w-full opacity-90">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <Line
            type="monotone"
            dataKey="v"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={1.5}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const LOCALE = "en-US" as const;

const Page = () => {
  /** Recharts ResponsiveContainer measures DOM; rendering only after mount avoids SSR/client mismatch (React #418). */
  const [chartsMounted, setChartsMounted] = useState(false);

  const [visitorData, setVisitorData] = useState<{ visitors: number } | null>(null);
  const [user, setUser] = useState<ManagementSessionUser | null>(null);
  const [range, setRange] =
    useState<(typeof RANGE_OPTIONS)[number]["value"]>("last30days");
  const [traffic, setTraffic] = useState<TrafficRow[] | null>(null);
  const [trafficMeta, setTrafficMeta] = useState<{ count: number; range: string } | null>(
    null
  );
  const [loadingTraffic, setLoadingTraffic] = useState(true);
  const [trafficError, setTrafficError] = useState<string | null>(null);
  const [visitDataError, setVisitDataError] = useState(false);

  useEffect(() => {
    setUser(readManagementSessionUser());
  }, []);

  useEffect(() => {
    setChartsMounted(true);
  }, []);

  useEffect(() => {
    const fetchVisitTotal = async () => {
      try {
        const res = await axios.get("/api/get-visit-data");
        setVisitorData(res.data);
        setVisitDataError(false);
      } catch {
        setVisitDataError(true);
      }
    };
    fetchVisitTotal();
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
    totalInRange > 0 ? Math.round((uniqueSessionCount / totalInRange) * 100) : 0;

  const rangeFullLabel = RANGE_LABELS[range] ?? range;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f4f5f7] pb-10">
      <div
        className="pointer-events-none fixed inset-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(197, 157, 79, 0.08), transparent),
            radial-gradient(ellipse 60% 40% at 100% 0%, rgba(57, 74, 89, 0.06), transparent)`,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-3 pt-4 sm:px-5 lg:px-6">
        {/* Compact header */}
        <header className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-white shadow-sm">
                <LayoutDashboard className="size-5" strokeWidth={1.5} />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                    Dashboard
                  </h1>
                  <span className="hidden items-center gap-1 rounded-md border border-[#c59d4f]/20 bg-[#c59d4f]/8 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#7a6235] sm:inline-flex">
                    <Sparkles className="size-3" aria-hidden />
                    Analytics
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">
                  Traffic and visitor metrics for the selected period.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <div className="flex gap-0.5 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {RANGE_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    title={RANGE_LABELS[o.value]}
                    onClick={() => setRange(o.value)}
                    className={cn(
                      "shrink-0 rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition-colors",
                      range === o.value
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-white hover:text-slate-900"
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => fetchTraffic()}
                disabled={loadingTraffic}
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
              >
                <RefreshCw
                  className={cn("size-3.5 text-slate-500", loadingTraffic && "animate-spin")}
                  aria-hidden
                />
                Refresh
              </button>
            </div>
          </div>
        </header>

        <div className="mt-4">
          <Breadcrumb currentPage="Dashboard" />
        </div>

        {/* KPI grid */}
        <section className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {/* User */}
          <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-3.5 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Signed in
                </p>
                {user ? (
                  <>
                    <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                      {user.name}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{user.email}</p>
                    <span className="mt-2 inline-flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                      <ShieldCheck className="size-3 text-[#394a59]" />
                      {formatRole(user.role)}
                    </span>
                  </>
                ) : (
                  <p className="mt-2 text-xs text-slate-500">Session unavailable. Re-authenticate.</p>
                )}
              </div>
              {user ? (
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#c59d4f] to-[#a67c32] text-xs font-bold text-white">
                  {initials(user.name)}
                </div>
              ) : (
                <UserCircle className="size-9 shrink-0 text-slate-300" strokeWidth={1} />
              )}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Site visitors
                </p>
                <p className="mt-1 text-2xl font-semibold tabular-nums text-slate-900 sm:text-3xl">
                  {visitDataError ? "—" : visitorData != null ? visitorData.visitors.toLocaleString(LOCALE) : "…"}
                </p>
                <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-500">
                  <BarChart3 className="size-3 text-[#c59d4f]" />
                  All time
                </p>
              </div>
              <FaUsers className="size-7 shrink-0 text-slate-200" />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-slate-800 bg-gradient-to-br from-slate-800 to-slate-950 p-3.5 text-white shadow-sm">
            <div className="relative flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Views · period
                </p>
                <p className="mt-1 text-2xl font-semibold tabular-nums sm:text-3xl">
                  {loadingTraffic ? (
                    <span className="inline-block h-8 w-20 animate-pulse rounded bg-white/15" />
                  ) : (
                    totalInRange.toLocaleString(LOCALE)
                  )}
                </p>
                <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                  <Activity className="size-3 text-[#c59d4f]" />
                  <span className="truncate">{rangeFullLabel}</span>
                </p>
                {chartsMounted && !loadingTraffic && sparkSeries.length >= 2 && (
                  <MiniSparkline data={sparkSeries} />
                )}
              </div>
              <TrendingUp className="size-5 shrink-0 text-[#c59d4f]" strokeWidth={1.5} />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-lg border border-[#e8dcc4] bg-[#fefdfb] p-3.5 shadow-sm">
            <p className="text-[10px] font-medium uppercase tracking-wide text-[#8a7a58]">
              Unique sessions
            </p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-slate-900 sm:text-3xl">
              {loadingTraffic ? (
                <span className="inline-block h-8 w-16 animate-pulse rounded bg-[#c59d4f]/15" />
              ) : (
                uniqueSessionCount.toLocaleString(LOCALE)
              )}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-0.5 rounded bg-[#c59d4f]/12 px-1.5 py-0.5 text-[10px] font-semibold text-[#7a6235]">
                <Users className="size-2.5" />
                Sessions
              </span>
              {!loadingTraffic && totalInRange > 0 && (
                <span className="text-[10px] text-slate-500">{sessionRate}% of hits</span>
              )}
            </div>
            <ArrowUpRight className="ml-auto mt-0.5 size-5 text-[#c59d4f]/70" strokeWidth={1.5} />
          </div>
        </section>

        {trafficError && (
          <div
            className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-950"
            role="alert"
          >
            <span className="flex size-5 shrink-0 items-center justify-center rounded bg-amber-100 text-[10px] font-bold">
              !
            </span>
            <p className="leading-snug">{trafficError}</p>
          </div>
        )}

        {/* Primary chart */}
        <section className="mt-5">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-3 py-2.5 sm:px-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Traffic over time</h2>
                <p className="text-[11px] text-slate-500">Daily views · {rangeFullLabel}</p>
              </div>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                Day
              </span>
            </div>
            <div className="bg-slate-50/50 px-2 pb-3 pt-1 sm:px-3">
              <div className="h-[220px] w-full min-w-0 sm:h-[240px]">
                {!chartsMounted ? (
                  <div
                    className="h-full w-full rounded-lg border border-slate-100 bg-slate-50/90"
                    aria-hidden
                  />
                ) : loadingTraffic ? (
                  <div className="flex h-full flex-col items-center justify-center gap-2">
                    <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#c59d4f] border-t-transparent" />
                    <p className="text-xs text-slate-500">Loading…</p>
                  </div>
                ) : byDay.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-slate-200 bg-white px-4 text-center">
                    <Globe className="size-7 text-slate-300" />
                    <p className="text-xs font-medium text-slate-600">No data for this range.</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={byDay} margin={{ top: 6, right: 8, left: -8, bottom: 0 }}>
                      <defs>
                        <linearGradient id="fillVisitsExec" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={CHART_GOLD} stopOpacity={0.45} />
                          <stop offset="55%" stopColor={CHART_GOLD} stopOpacity={0.08} />
                          <stop offset="100%" stopColor={CHART_GOLD} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 8" stroke="#e2e8f0" vertical={false} />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 11, fill: "#64748b", fontWeight: 500 }}
                        tickLine={false}
                        axisLine={{ stroke: "#e2e8f0" }}
                        dy={8}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#64748b", fontWeight: 500 }}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                        width={44}
                      />
                      <Tooltip
                        contentStyle={TOOLTIP_LIGHT}
                        labelStyle={{ fontWeight: 600, color: "#0f172a", marginBottom: 4 }}
                        labelFormatter={(label, payload) => {
                          const row = payload?.[0]?.payload as { date?: string } | undefined;
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
                          typeof value === "number" ? value.toLocaleString(LOCALE) : value,
                          "Views",
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="visits"
                        name="Views"
                        stroke={CHART_GOLD}
                        strokeWidth={2}
                        fill="url(#fillVisitsExec)"
                        activeDot={{ r: 4, strokeWidth: 1.5, stroke: "#fff", fill: CHART_GOLD }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Secondary charts */}
        <section className="mt-4 grid gap-3 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-3 py-2 sm:px-4">
              <h2 className="text-sm font-semibold text-slate-900">Top pages</h2>
              <p className="text-[11px] text-slate-500">Hover bar for full URL.</p>
            </div>
            <div className="h-[220px] px-2 pb-3 pt-1 sm:h-[240px] sm:px-3">
              {!chartsMounted ? (
                <div
                  className="h-full w-full rounded-lg border border-slate-100 bg-slate-50/90"
                  aria-hidden
                />
              ) : loadingTraffic ? (
                <div className="flex h-full items-center justify-center text-xs text-slate-500">
                  Loading…
                </div>
              ) : topPages.length === 0 ? (
                <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-200 text-xs text-slate-500">
                  No data.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={topPages}
                    margin={{ left: 8, right: 16, top: 8, bottom: 8 }}
                  >
                    <CartesianGrid strokeDasharray="4 8" stroke="#f1f5f9" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b" }} allowDecimals={false} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={124}
                      tick={{ fontSize: 10, fill: "#475569" }}
                    />
                    <Tooltip
                      contentStyle={TOOLTIP_LIGHT}
                      formatter={(value: number) => [value.toLocaleString(LOCALE), "Views"]}
                      labelFormatter={(_, payload) => {
                        const row = payload?.[0]?.payload as
                          | { full?: string; name?: string }
                          | undefined;
                        return row?.full ?? row?.name ?? "";
                      }}
                    />
                    <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={14}>
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
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2 sm:px-4">
              <Globe className="size-3.5 text-[#394a59]" />
              <div>
                <h2 className="text-sm font-semibold text-slate-900">By country</h2>
                <p className="text-[11px] text-slate-500">Visit distribution</p>
              </div>
            </div>
            <div className="h-[220px] px-2 pb-3 pt-1 sm:h-[240px] sm:px-3">
              {!chartsMounted ? (
                <div
                  className="h-full w-full rounded-lg border border-slate-100 bg-slate-50/90"
                  aria-hidden
                />
              ) : loadingTraffic ? (
                <div className="flex h-full items-center justify-center text-xs text-slate-500">
                  Loading…
                </div>
              ) : topCountries.length === 0 ? (
                <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-200 text-xs text-slate-500">
                  No country data.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topCountries} margin={{ top: 6, right: 6, left: 0, bottom: 2 }}>
                    <CartesianGrid strokeDasharray="4 8" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 9, fill: "#64748b" }}
                      interval={0}
                      angle={-28}
                      textAnchor="end"
                      height={64}
                    />
                    <YAxis tick={{ fontSize: 10, fill: "#64748b" }} allowDecimals={false} width={32} />
                    <Tooltip contentStyle={TOOLTIP_LIGHT} />
                    <Bar
                      dataKey="count"
                      fill={CHART_SLATE}
                      radius={[8, 8, 0, 0]}
                      maxBarSize={48}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-3 lg:grid-cols-5">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:col-span-3">
            <div className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2 sm:px-4">
              <MonitorSmartphone className="size-3.5 text-[#394a59]" />
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Devices</h2>
                <p className="text-[11px] text-slate-500">Share of visits</p>
              </div>
            </div>
            <div className="h-[200px] px-2 pb-2 pt-1 sm:px-4">
              {!chartsMounted ? (
                <div
                  className="h-full w-full rounded-lg border border-slate-100 bg-slate-50/90"
                  aria-hidden
                />
              ) : loadingTraffic || !deviceSplit.length ? (
                <div className="flex h-full items-center justify-center text-xs text-slate-500">
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
                      cy="44%"
                      innerRadius={48}
                      outerRadius={78}
                      paddingAngle={2}
                      stroke="rgba(255,255,255,0.95)"
                      strokeWidth={1.5}
                      label={false}
                    >
                      {deviceSplit.map((_, i) => (
                        <Cell key={`dev-${i}`} fill={CHART_ACCENT[i % CHART_ACCENT.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={TOOLTIP_DARK} />
                    <Legend
                      verticalAlign="bottom"
                      height={28}
                      wrapperStyle={{ fontSize: "11px" }}
                      formatter={(value) => (
                        <span className="text-slate-600">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="flex flex-col rounded-lg border border-slate-200 bg-slate-900 p-3.5 text-white lg:col-span-2">
            <h2 className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Scope
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Data is filtered server-side by your session and the selected range. Hits count
              tracked page views; unique sessions use stored session IDs when present.
            </p>
            <dl className="mt-3 space-y-2 border-t border-white/10 pt-3 text-xs">
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Range</dt>
                <dd className="font-medium text-white">{rangeFullLabel}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">Records</dt>
                <dd className="tabular-nums font-medium text-white">
                  {loadingTraffic ? "…" : totalInRange.toLocaleString(LOCALE)}
                </dd>
              </div>
            </dl>
            <p className="mt-auto pt-3 text-[10px] text-slate-600">Ritz Media World</p>
          </div>
        </section>

        <footer className="admin-footer mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
          Designed and developed by{" "}
          <strong className="font-medium text-slate-700">Ritz Media World</strong>
        </footer>
      </div>
    </div>
  );
};

export default Page;
