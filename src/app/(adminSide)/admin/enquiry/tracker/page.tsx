"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { format } from "date-fns";
import {
  Calendar,
  Download,
  Eye,
  Filter,
  Globe,
  Home,
  MapPin,
  MessageSquare,
  Network,
  RefreshCw,
  Search,
  User,
  Wifi,
  X,
} from "lucide-react";

interface EnquiryTrackerItem {
  _id: string;
  name: string;
  email: string;
  message: string;
  etype?: string;
  mobile?: string | null;
  ip: string;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  timezone?: string | null;
  isp?: string | null;
  connectionType?: string | null;
  organisation?: string | null;
  asn?: string | null;
  ipv4?: string | null;
  ipv6?: string | null;
  createdAt: string;
}

interface Filters {
  q: string;
  etype: string;
  country: string;
  state: string;
  city: string;
  connectionType: string;
  isp: string;
  from: string;
  to: string;
}

const EMPTY_FILTERS: Filters = {
  q: "",
  etype: "",
  country: "",
  state: "",
  city: "",
  connectionType: "",
  isp: "",
  from: "",
  to: "",
};

const CONNECTION_TYPES = ["mobile", "broadband", "hosting", "VPN", "unknown"];

function connectionBadgeClass(type?: string | null) {
  switch ((type || "").toLowerCase()) {
    case "vpn":
      return "bg-red-100 text-red-800";
    case "hosting":
      return "bg-orange-100 text-orange-800";
    case "mobile":
      return "bg-blue-100 text-blue-800";
    case "broadband":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

const Page = () => {
  const [items, setItems] = useState<EnquiryTrackerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [connectionTypeCounts, setConnectionTypeCounts] = useState<
    Record<string, number>
  >({});
  const [selected, setSelected] = useState<EnquiryTrackerItem | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(limit));

      Object.entries(appliedFilters).forEach(([key, value]) => {
        if (value.trim()) params.set(key, value.trim());
      });

      const res = await axios.get(
        `/api/system-settings/enquiry-tracker?${params.toString()}`
      );

      setItems(res.data.data || []);
      setTotal(res.data.pagination?.total || 0);
      setTotalPages(res.data.pagination?.totalPages || 1);
      setConnectionTypeCounts(res.data.stats?.connectionTypeCounts || {});
    } catch (err) {
      console.error("Error fetching enquiry tracker:", err);
      setItems([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [appliedFilters, page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const applyFilters = () => {
    setPage(1);
    setAppliedFilters({ ...filters });
  };

  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setAppliedFilters(EMPTY_FILTERS);
    setPage(1);
  };

  const exportToExcel = async () => {
    try {
      const XLSX = await import("xlsx");
      const saveAs = (await import("file-saver")).default;

      const params = new URLSearchParams();
      params.set("page", "1");
      params.set("limit", "100");
      Object.entries(appliedFilters).forEach(([key, value]) => {
        if (value.trim()) params.set(key, value.trim());
      });

      const res = await axios.get(
        `/api/system-settings/enquiry-tracker?${params.toString()}`
      );
      const rows = (res.data.data || []) as EnquiryTrackerItem[];

      const exportData = rows.map((row) => ({
        Name: row.name,
        Email: row.email,
        Mobile: row.mobile || "",
        Type: row.etype || "",
        Message: row.message,
        IP: row.ip,
        IPv4: row.ipv4 || "",
        IPv6: row.ipv6 || "",
        Country: row.country || "",
        State: row.state || "",
        City: row.city || "",
        Timezone: row.timezone || "",
        ISP: row.isp || "",
        ConnectionType: row.connectionType || "",
        Organisation: row.organisation || "",
        ASN: row.asn || "",
        CreatedAt: row.createdAt
          ? format(new Date(row.createdAt), "dd/MM/yyyy HH:mm")
          : "",
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "EnquiryTracker");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(data, `EnquiryTracker_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
    } catch (err) {
      console.error("Error exporting enquiry tracker:", err);
    }
  };

  const locationLabel = (item: EnquiryTrackerItem) =>
    [item.city, item.state, item.country].filter(Boolean).join(", ") || "—";

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg sm:rounded-xl shadow-lg">
              <Network className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <span>Enquiry Tracker</span>
          </h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={fetchData}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl shadow-sm hover:bg-gray-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={exportToExcel}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl shadow-lg"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Enquiry Tracker</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-blue-600">
          <p className="text-xs font-semibold text-gray-600 uppercase">Total Matches</p>
          <p className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">{total}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-green-600">
          <p className="text-xs font-semibold text-gray-600 uppercase">Broadband</p>
          <p className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
            {connectionTypeCounts.broadband || 0}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-red-600">
          <p className="text-xs font-semibold text-gray-600 uppercase">VPN</p>
          <p className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
            {connectionTypeCounts.VPN || 0}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-orange-600">
          <p className="text-xs font-semibold text-gray-600 uppercase">Hosting / Mobile</p>
          <p className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
            {(connectionTypeCounts.hosting || 0) + (connectionTypeCounts.mobile || 0)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-gray-800">Filters</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={filters.q}
              onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
              placeholder="Search name, email, IP, city, ISP..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            value={filters.etype}
            onChange={(e) => setFilters((f) => ({ ...f, etype: e.target.value }))}
            placeholder="Enquiry type"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={filters.connectionType}
            onChange={(e) =>
              setFilters((f) => ({ ...f, connectionType: e.target.value }))
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All connection types</option>
            {CONNECTION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <input
            value={filters.country}
            onChange={(e) => setFilters((f) => ({ ...f, country: e.target.value }))}
            placeholder="Country"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={filters.state}
            onChange={(e) => setFilters((f) => ({ ...f, state: e.target.value }))}
            placeholder="State"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={filters.city}
            onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}
            placeholder="City"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={filters.isp}
            onChange={(e) => setFilters((f) => ({ ...f, isp: e.target.value }))}
            placeholder="ISP"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={filters.from}
            onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={filters.to}
            onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg"
          >
            Apply Filters
          </button>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-3">
          <h2 className="text-white text-lg font-bold flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Tracked Enquiries
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">Show:</span>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold text-blue-700"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : (
          <>
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Name",
                      "Contact",
                      "Location",
                      "IP / ISP",
                      "Connection",
                      "Date",
                      "Actions",
                    ].map((label) => (
                      <th
                        key={label}
                        className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.length > 0 ? (
                    items.map((item, idx) => (
                      <tr
                        key={item._id}
                        className={`hover:bg-blue-50 ${
                          idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.etype || "contact"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          <p className="truncate max-w-[180px]">{item.email}</p>
                          <p className="text-xs">{item.mobile || "—"}</p>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          <div className="flex items-start gap-1">
                            <MapPin className="w-3.5 h-3.5 mt-0.5 text-gray-400" />
                            <span>{locationLabel(item)}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {item.timezone || "—"}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          <p className="font-mono text-xs">{item.ip}</p>
                          <p className="text-xs truncate max-w-[160px]">
                            {item.isp || "—"}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${connectionBadgeClass(
                              item.connectionType
                            )}`}
                          >
                            {item.connectionType || "unknown"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                          {item.createdAt
                            ? format(new Date(item.createdAt), "dd MMM yyyy, HH:mm")
                            : "—"}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setSelected(item)}
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-16 text-center text-gray-500">
                        No tracked enquiries found for these filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden divide-y">
              {items.map((item) => (
                <div key={item._id} className="p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-gray-900">{item.name}</p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${connectionBadgeClass(
                        item.connectionType
                      )}`}
                    >
                      {item.connectionType || "unknown"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{item.email}</p>
                  <p className="text-xs text-gray-500">{locationLabel(item)}</p>
                  <p className="text-xs font-mono text-gray-500">{item.ip}</p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-gray-400">
                      {item.createdAt
                        ? format(new Date(item.createdAt), "dd MMM yyyy")
                        : "—"}
                    </span>
                    <button
                      onClick={() => setSelected(item)}
                      className="p-2 bg-blue-100 text-blue-700 rounded-lg"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="p-10 text-center text-gray-500">
                  No tracked enquiries found.
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="bg-gray-50 px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-t">
                <p className="text-sm text-gray-600">
                  Page <span className="font-bold text-blue-600">{page}</span> of{" "}
                  <span className="font-bold text-blue-600">{totalPages}</span> ·{" "}
                  {total} total
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-800 p-4 sm:p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Eye className="w-6 h-6" />
                Tracker Details
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="p-2 hover:bg-white/20 rounded-lg"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-90px)] space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { label: "Name", value: selected.name, icon: User },
                  { label: "Email", value: selected.email, icon: MessageSquare },
                  { label: "Mobile", value: selected.mobile || "—", icon: Wifi },
                  { label: "Type", value: selected.etype || "contact", icon: Filter },
                  { label: "IP", value: selected.ip, icon: Network },
                  { label: "IPv4", value: selected.ipv4 || "—", icon: Network },
                  { label: "IPv6", value: selected.ipv6 || "—", icon: Network },
                  {
                    label: "Connection",
                    value: selected.connectionType || "unknown",
                    icon: Wifi,
                  },
                  {
                    label: "Location",
                    value: locationLabel(selected),
                    icon: MapPin,
                  },
                  {
                    label: "Timezone",
                    value: selected.timezone || "—",
                    icon: Globe,
                  },
                  { label: "ISP", value: selected.isp || "—", icon: Wifi },
                  {
                    label: "Organisation",
                    value: selected.organisation || "—",
                    icon: Globe,
                  },
                  { label: "ASN", value: selected.asn || "—", icon: Network },
                  {
                    label: "Submitted",
                    value: selected.createdAt
                      ? format(new Date(selected.createdAt), "dd MMM yyyy, HH:mm")
                      : "—",
                    icon: Calendar,
                  },
                ].map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-3"
                  >
                    <div className="flex items-center gap-2 mb-1 text-xs font-semibold uppercase text-gray-500">
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </div>
                    <p className="text-sm font-semibold text-gray-900 break-all">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase text-gray-500 mb-2">
                  Message
                </p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-6 sm:mt-8 text-center text-gray-600 text-xs sm:text-sm">
        Designed and Developed by{" "}
        <strong className="text-blue-600">Ritz Media World</strong>
      </footer>
    </div>
  );
};

export default Page;
