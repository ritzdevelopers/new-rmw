"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  FilePen,
  Home,
  Monitor,
  Reply,
  Trash2,
  Download,
  Search,
  Calendar,
  Mail,
  Phone,
  User,
  MessageSquare,
  AlertTriangle,
  RefreshCw,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface Enquiry {
  id: string;
  etype: string;
  name: string;
  email: string;
  mobile?: string;
  message: string;
  category?: string;
  send_date: string;
  formattedDate?: string;
}

const Page = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<string | null>(null);
  const [selectedEnquiryData, setSelectedEnquiryData] =
    useState<Enquiry | null>(null);

  // Fetch enquiries from API
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/system-settings/contact-enquiry");

        const formatted = (res.data as Enquiry[]).map((entry) => ({
          ...entry,
          formattedDate: format(new Date(entry.send_date), "dd MMM, yyyy"),
        }));

        setEnquiries(formatted);
      } catch (err) {
        console.error("Error fetching enquiries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  // Filter and paginate data
  const filteredData = useMemo(() => {
    return enquiries.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [enquiries, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    return filteredData.slice(startIndex, startIndex + entriesPerPage);
  }, [filteredData, currentPage, entriesPerPage]);

  // Delete handler
  const handleDelete = async () => {
    if (!selectedEnquiry) return;

    try {
      await axios.delete(
        `/api/system-settings/contact-enquiry/${selectedEnquiry}`
      );
      setEnquiries((prev) => prev.filter((e) => e.id !== selectedEnquiry));
      setDeleteConfirmModal(false);
      setSelectedEnquiry(null);
    } catch (err) {
      console.error("Error deleting enquiry:", err);
    }
  };

  // Export to Excel
  const exportToExcel = async () => {
    try {
      const XLSX = await import("xlsx");
      const saveAs = (await import("file-saver")).default;

      const exportData = enquiries.map(({ id, formattedDate, ...rest }) => ({
        ...rest,
        send_date: format(new Date(rest.send_date), "dd/MM/yyyy"),
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(data, `Enquiries_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
    } catch (err) {
      console.error("Error exporting to Excel:", err);
    }
  };

  const handleDeleteModal = (id: string) => {
    setSelectedEnquiry(id);
    setDeleteConfirmModal(true);
  };

  const handleViewDetails = (enquiry: Enquiry) => {
    setSelectedEnquiryData(enquiry);
    setViewDetailsModal(true);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg sm:rounded-xl shadow-lg">
              <Monitor className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <span className="break-words">Enquiry Management</span>
          </h1>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto justify-center"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">Export to Excel</span>
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Link
            title="Home"
            href="/admin"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600 flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            Enquiries
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-blue-600 bg-gradient-to-br from-white to-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Total Enquiries
              </p>
              <p className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                {enquiries.length}
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-blue-100 rounded-full shadow-md">
              <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-green-600 bg-gradient-to-br from-white to-green-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                This Month
              </p>
              <p className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                {
                  enquiries.filter((e) => {
                    const date = new Date(e.send_date);
                    const now = new Date();
                    return (
                      date.getMonth() === now.getMonth() &&
                      date.getFullYear() === now.getFullYear()
                    );
                  }).length
                }
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-green-100 rounded-full shadow-md">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-purple-600 bg-gradient-to-br from-white to-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Filtered
              </p>
              <p className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                {filteredData.length}
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-purple-100 rounded-full shadow-md">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 border-l-4 border-orange-600 bg-gradient-to-br from-white to-orange-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Showing
              </p>
              <p className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                {paginatedData.length}
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-orange-100 rounded-full shadow-md">
              <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden backdrop-blur-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-4 sm:p-6 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4">
            <h2 className="text-white text-lg sm:text-xl font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
              All Enquiries
            </h2>

            {/* Search and Entries Per Page */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
              {/* Show Entries */}
              <div className="flex items-center gap-2">
                <span className="text-white text-sm sm:text-base font-medium">
                  Show:
                </span>
                <select
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-2 sm:px-3 py-1.5 sm:py-2 border border-blue-400 rounded-lg bg-white text-blue-700 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>

              {/* Search */}
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search enquiries..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item, idx) => (
                      <tr
                        key={item.id}
                        className={`hover:bg-blue-50 transition-all duration-200 border-l-4 border-transparent hover:border-blue-500 ${
                          idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="p-2 bg-blue-100 rounded-full shadow-sm">
                              <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                            </div>
                            <span className="font-semibold text-gray-900 text-sm sm:text-base">
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="text-xs sm:text-sm truncate max-w-[150px]">
                              {item.email}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600">
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm">
                              {item.mobile || "N/A"}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <span className="px-2 sm:px-3 py-1 inline-flex items-center text-xs sm:text-sm font-semibold rounded-full bg-purple-100 text-purple-800 shadow-sm">
                            {item.category || item.etype || "General"}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 max-w-xs">
                          <p className="text-xs sm:text-sm text-gray-600 truncate">
                            {item.message}
                          </p>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-center text-gray-600">
                          <span className="text-xs sm:text-sm">
                            {item.formattedDate}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleViewDetails(item)}
                              className="p-2 bg-blue-100 hover:bg-blue-200 hover:shadow-md text-blue-700 rounded-lg transition-all duration-200"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>

                            <button
                              onClick={() => handleDeleteModal(item.id)}
                              className="p-2 bg-red-100 hover:bg-red-200 hover:shadow-md text-red-700 rounded-lg transition-all duration-200"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 sm:px-6 py-16 sm:py-20 text-center"
                      >
                        <div className="flex flex-col items-center gap-4">
                          <div className="p-4 bg-gray-100 rounded-full">
                            <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300" />
                          </div>
                          <p className="text-base sm:text-lg font-semibold text-gray-500">
                            No enquiries found
                          </p>
                          <p className="text-sm text-gray-400 px-4 text-center">
                            {searchTerm
                              ? "Try adjusting your search"
                              : "Check back later for new enquiries"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y">
              {paginatedData.map((item) => (
                <div
                  key={item.id}
                  className="p-4 space-y-3 hover:bg-blue-50 transition-colors border-l-4 border-blue-500"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-base">
                        {item.name}
                      </h3>
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 shadow-sm">
                      {item.category || item.etype}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{item.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{item.mobile || "N/A"}</span>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    {item.message}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{item.formattedDate}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(item)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-all shadow-sm"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-all shadow-sm">
                        <Reply className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteModal(item.id)}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-200">
                <p className="text-xs sm:text-sm text-gray-700 font-medium">
                  Showing{" "}
                  <span className="font-bold text-blue-600">
                    {(currentPage - 1) * entriesPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-bold text-blue-600">
                    {Math.min(
                      currentPage * entriesPerPage,
                      filteredData.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-blue-600">
                    {filteredData.length}
                  </span>{" "}
                  entries
                </p>
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 hover:border-blue-300 transition-all"
                  >
                    Previous
                  </button>
                  <div className="flex gap-1 sm:gap-2">
                    {(() => {
                      const buttons: React.ReactElement[] = [];
                      const showCount = Math.min(5, totalPages);

                      for (let i = 0; i < showCount; i++) {
                        let pageNum: number;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        buttons.push(
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg font-bold transition-all ${
                              currentPage === pageNum
                                ? "bg-blue-600 text-white shadow-md"
                                : "border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                      return buttons;
                    })()}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 hover:border-blue-300 transition-all"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* View Details Modal */}
      {viewDetailsModal && selectedEnquiryData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-700 animate-scale-in">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-4 sm:p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Enquiry Details
                </h2>
              </div>
              <button
                onClick={() => {
                  setViewDetailsModal(false);
                  setSelectedEnquiryData(null);
                }}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-200"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Name */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      Name
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-gray-900">
                    {selectedEnquiryData.name}
                  </p>
                </div>

                {/* Email */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-green-600" />
                    <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">
                      Email
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-gray-900 break-all">
                    {selectedEnquiryData.email}
                  </p>
                </div>

                {/* Phone */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-5 h-5 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
                      Phone
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-gray-900">
                    {selectedEnquiryData.mobile || "N/A"}
                  </p>
                </div>

                {/* Category */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="w-5 h-5 text-orange-600" />
                    <span className="text-xs font-semibold text-orange-700 uppercase tracking-wider">
                      Category
                    </span>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-orange-200 text-orange-800 border border-orange-300">
                    {selectedEnquiryData.category ||
                      selectedEnquiryData.etype ||
                      "General"}
                  </span>
                </div>
              </div>

              {/* Date */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 mb-6 border border-indigo-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                    Date Submitted
                  </span>
                </div>
                <p className="text-base sm:text-lg font-bold text-gray-900">
                  {selectedEnquiryData.formattedDate}
                </p>
              </div>

              {/* Message */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6 border border-gray-300 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Message
                  </span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedEnquiryData.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 sm:p-6 flex justify-end gap-3 border-t border-gray-200">
              <button
                onClick={() => {
                  setViewDetailsModal(false);
                  setSelectedEnquiryData(null);
                }}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md mx-4 shadow-2xl transform transition-all animate-scale-in">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-100 rounded-full shadow-lg">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2">
              Are you sure?
            </h2>
            <p className="text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              This action cannot be undone. The enquiry will be permanently
              deleted.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <button
                onClick={() => setDeleteConfirmModal(false)}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-all text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all transform hover:scale-105 text-sm sm:text-base shadow-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-6 sm:mt-8 text-center text-gray-600 text-xs sm:text-sm">
        Designed and Developed by{" "}
        <strong className="text-blue-600">Ritz Media World</strong>
      </footer>
    </div>
  );
};

export default Page;
