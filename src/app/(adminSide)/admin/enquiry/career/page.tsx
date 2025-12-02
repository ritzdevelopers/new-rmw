"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@/components/ui/AdminTable";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { FaFileAlt } from "react-icons/fa";
import { Download, Trash2, Mail, Phone, User, MessageSquare, Calendar, Briefcase, FileText, Eye, X } from "lucide-react";

interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  resume: string;
  category: string;
  message: string;
  mobile?: string;
  etype: string;
  send_date: string;
  date?: string; // formatted
}

// Helper function to properly encode file paths with spaces and special characters
const encodeFilePath = (filePath: string): string => {
  if (!filePath) return filePath;
  // Split the path and encode each segment separately to preserve path separators
  const parts = filePath.split('/');
  return parts.map(part => encodeURIComponent(part)).join('/');
};

const Page = () => {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await axios.get("/api/system-settings/contact-enquiry");

        // Cast the data to ContactEnquiry[]
        const data = res.data as ContactEnquiry[];

        const filtered = data.filter((entry) => entry.etype === "career");

        const formatted = filtered.map((entry) => ({
          ...entry,
          date: format(new Date(entry.send_date), "dd MM, yyyy"),
        }));

        setEnquiries(formatted);
      } catch (err) {
        console.error("Error fetching contact enquiries:", err);
      }
    };

    fetchEnquiries();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(
        `/api/system-settings/contact-enquiry/${id}`
      );
      if (res.status === 200) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
      } else {
        console.error("Failed to delete enquiry", res);
      }
    } catch (err) {
      console.error("Error deleting enquiry:", err);
    }
  };

  const exportToExcel = () => {
    const exportData = enquiries.map(({ ...rest }) => rest); // Rename `id` to `_id` to avoid ESLint warning

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ContactEnquiries");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "ContactEnquiries.xlsx");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-5 sm:p-6 md:p-8 mb-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md">
                  <Briefcase className="text-white" size={24} />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                  Career Enquiry
                </h1>
              </div>
              <p className="text-sm sm:text-base text-gray-600 ml-14 sm:ml-0">
                Manage and view all career application submissions
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportToExcel}
                className="group flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold text-sm sm:text-base active:scale-95"
              >
                <Download size={18} className="group-hover:animate-bounce" />
                <span className="hidden sm:inline">Export to Excel</span>
                <span className="sm:hidden">Export</span>
              </button>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <Breadcrumb currentPage="Contact-Enquiry" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 md:mb-8">
          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200/50 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-300/50">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Total Applications</p>
                <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">{enquiries.length}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3.5 sm:p-4 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="text-blue-600" size={26} />
              </div>
            </div>
          </div>
          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200/50 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-green-300/50">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">With Resume</p>
                <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                  {enquiries.filter((e) => e.resume).length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-3.5 sm:p-4 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                <FileText className="text-green-600" size={26} />
              </div>
            </div>
          </div>
          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200/50 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-purple-300/50">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">With Email</p>
                <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-700 bg-clip-text text-transparent">
                  {enquiries.filter((e) => e.email).length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-pink-200 p-3.5 sm:p-4 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Mail className="text-purple-600" size={26} />
              </div>
            </div>
          </div>
          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200/50 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-orange-300/50">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">This Month</p>
                <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent">
                  {enquiries.filter((e) => {
                    const enquiryDate = new Date(e.send_date);
                    const now = new Date();
                    return (
                      enquiryDate.getMonth() === now.getMonth() &&
                      enquiryDate.getFullYear() === now.getFullYear()
                    );
                  }).length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-amber-200 p-3.5 sm:p-4 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Calendar className="text-orange-600" size={26} />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 transition-all duration-300 hover:shadow-xl">
          <Table
            columns={[
              { 
                key: "name",  
                label: "Name",
                render: (row) => (
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-blue-50 rounded-lg">
                      <User size={16} className="text-blue-600 flex-shrink-0" />
                    </div>
                    <span className="font-semibold text-gray-900 truncate">{row.name}</span>
                  </div>
                )
              },
              { 
                key: "email", 
                label: "Email",
                render: (row) => (
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 bg-green-50 rounded-lg">
                      <Mail size={16} className="text-green-600 flex-shrink-0" />
                    </div>
                    <a 
                      href={`mailto:${row.email}`} 
                      className="text-blue-600 hover:text-blue-800 hover:underline truncate font-medium transition-colors duration-200"
                    >
                      {row.email}
                    </a>
                  </div>
                )
              },
              { 
                key: "category", 
                label: "Category",
                render: (row) => (
                  <span className="px-3 sm:px-4 py-1.5 inline-flex items-center text-xs sm:text-sm font-bold rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200 shadow-sm whitespace-nowrap">
                    {row.category || row.etype || "General"}
                  </span>
                )
              },
              {
                key: "resume",
                label: "Resume",
                render: (row) =>
                  row.resume ? (
                    <a
                      href={encodeFilePath(row.resume)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open Resume"
                      className="group flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 rounded-lg transition-all duration-200 font-medium text-sm border border-blue-200 hover:border-blue-300 hover:shadow-md"
                    >
                      <FileText size={16} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="hidden sm:inline">View Resume</span>
                      <span className="sm:hidden">View</span>
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm font-medium">—</span>
                  ),
              },
              { 
                key: "mobile", 
                label: "Mobile",
                render: (row) => (
                  row.mobile ? (
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-purple-50 rounded-lg">
                        <Phone size={16} className="text-purple-600 flex-shrink-0" />
                      </div>
                      <a 
                        href={`tel:${row.mobile}`} 
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors duration-200"
                      >
                        {row.mobile}
                      </a>
                    </div>
                  ) : (
                    <span className="text-gray-400 font-medium">-</span>
                  )
                )
              },
              { 
                key: "message", 
                label: "Message",
                render: (row) => (
                  <div className="flex items-start gap-2.5 max-w-xs">
                    <div className="p-1.5 bg-amber-50 rounded-lg mt-0.5">
                      <MessageSquare size={16} className="text-amber-600 flex-shrink-0" />
                    </div>
                    <p className="text-gray-700 line-clamp-2 text-sm font-medium">{row.message || "—"}</p>
                  </div>
                )
              },
              { 
                key: "date", 
                label: "Date",
                render: (row) => (
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-indigo-50 rounded-lg">
                      <Calendar size={16} className="text-indigo-600 flex-shrink-0" />
                    </div>
                    <span className="text-gray-700 whitespace-nowrap font-medium">{row.date}</span>
                  </div>
                )
              },
            ]}
            data={enquiries}
            searchableFields={["name", "email", "category", "message"]}
            actionButtons={(row) => (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedEnquiry(row);
                    setViewDetailsModal(true);
                  }}
                  className="group flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 rounded-lg transition-all duration-200 font-semibold text-sm border border-blue-200 hover:border-blue-300 hover:shadow-md active:scale-95"
                  title="View Details"
                >
                  <Eye size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">View</span>
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="group flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-50 to-pink-50 text-red-700 hover:from-red-100 hover:to-pink-100 rounded-lg transition-all duration-200 font-semibold text-sm border border-red-200 hover:border-red-300 hover:shadow-md active:scale-95"
                  title="Delete"
                >
                  <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            )}
            emptyMessage="No career enquiries found."
          />
        </div>

        {/* Footer */}
        <footer className="mt-8 md:mt-10 text-center text-gray-500 text-sm sm:text-base py-6">
          Designed and Developed by <strong className="text-gray-700 font-semibold">Ritz Media World</strong>
        </footer>
      </div>

      {/* View Details Modal */}
      {viewDetailsModal && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] my-auto overflow-hidden border border-gray-200/50 relative mx-2 sm:mx-0 animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 p-5 sm:p-6 md:p-7 flex justify-between items-center sticky top-0 z-10 shadow-lg">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <div className="p-2 sm:p-2.5 bg-white/20 backdrop-blur-sm rounded-xl flex-shrink-0 shadow-lg">
                  <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white truncate">
                  Career Application Details
                </h2>
              </div>
              <button
                onClick={() => {
                  setViewDetailsModal(false);
                  setSelectedEnquiry(null);
                }}
                className="p-2 sm:p-2.5 hover:bg-white/20 rounded-xl transition-all duration-200 text-white flex-shrink-0 hover:scale-110 active:scale-95"
                aria-label="Close modal"
              >
                <X size={22} className="sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 md:p-8 overflow-y-auto max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-160px)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5 sm:mb-6">
                {/* Name */}
                <div className="group bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50 rounded-2xl p-4 sm:p-5 border border-blue-200/50 shadow-md hover:shadow-lg transition-all duration-300 min-w-0 hover:scale-[1.02]">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="p-2 bg-blue-200 rounded-xl">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700 flex-shrink-0" />
                    </div>
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                      Name
                    </span>
                  </div>
                  <p className="text-base sm:text-lg md:text-xl font-extrabold text-gray-900 break-words">
                    {selectedEnquiry.name}
                  </p>
                </div>

                {/* Email */}
                <div className="group bg-gradient-to-br from-green-50 via-emerald-100 to-teal-50 rounded-2xl p-4 sm:p-5 border border-green-200/50 shadow-md hover:shadow-lg transition-all duration-300 min-w-0 hover:scale-[1.02]">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="p-2 bg-green-200 rounded-xl">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-green-700 flex-shrink-0" />
                    </div>
                    <span className="text-xs font-bold text-green-700 uppercase tracking-wider">
                      Email
                    </span>
                  </div>
                  <a 
                    href={`mailto:${selectedEnquiry.email}`}
                    className="text-base sm:text-lg md:text-xl font-extrabold text-gray-900 break-all hover:text-blue-600 hover:underline block transition-colors duration-200"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>

                {/* Phone */}
                <div className="group bg-gradient-to-br from-purple-50 via-pink-100 to-rose-50 rounded-2xl p-4 sm:p-5 border border-purple-200/50 shadow-md hover:shadow-lg transition-all duration-300 min-w-0 hover:scale-[1.02]">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="p-2 bg-purple-200 rounded-xl">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-purple-700 flex-shrink-0" />
                    </div>
                    <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                      Phone
                    </span>
                  </div>
                  {selectedEnquiry.mobile ? (
                    <a 
                      href={`tel:${selectedEnquiry.mobile}`}
                      className="text-base sm:text-lg md:text-xl font-extrabold text-gray-900 hover:text-blue-600 hover:underline break-all block transition-colors duration-200"
                    >
                      {selectedEnquiry.mobile}
                    </a>
                  ) : (
                    <p className="text-base sm:text-lg md:text-xl font-extrabold text-gray-500">N/A</p>
                  )}
                </div>

                {/* Category */}
                <div className="group bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-50 rounded-2xl p-4 sm:p-5 border border-orange-200/50 shadow-md hover:shadow-lg transition-all duration-300 min-w-0 hover:scale-[1.02]">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="p-2 bg-orange-200 rounded-xl">
                      <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-orange-700 flex-shrink-0" />
                    </div>
                    <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">
                      Category
                    </span>
                  </div>
                  <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-200 to-amber-200 text-orange-800 border border-orange-300 break-words shadow-sm">
                    {selectedEnquiry.category || selectedEnquiry.etype || "General"}
                  </span>
                </div>
              </div>

              {/* Date */}
              <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-4 sm:p-5 mb-5 sm:mb-6 border border-indigo-200/50 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2 bg-indigo-200 rounded-xl">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-700 flex-shrink-0" />
                  </div>
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                    Application Date
                  </span>
                </div>
                <p className="text-base sm:text-lg md:text-xl font-extrabold text-gray-900 break-words">
                  {selectedEnquiry.date}
                </p>
              </div>

              {/* Resume */}
              {selectedEnquiry.resume && (
                <div className="bg-gradient-to-br from-teal-50 via-cyan-100 to-blue-50 rounded-2xl p-4 sm:p-5 mb-5 sm:mb-6 border border-teal-200/50 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-2 bg-teal-200 rounded-xl">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-teal-700 flex-shrink-0" />
                    </div>
                    <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                      Resume
                    </span>
                  </div>
                  <a
                    href={encodeFilePath(selectedEnquiry.resume)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white rounded-xl hover:from-teal-700 hover:via-cyan-700 hover:to-blue-700 transition-all duration-300 font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
                  >
                    <FileText size={18} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    View Resume
                  </a>
                </div>
              )}

              {/* Message */}
              <div className="bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 rounded-2xl p-5 sm:p-6 border border-gray-300/50 shadow-md">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-2 bg-gray-200 rounded-xl">
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 flex-shrink-0" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Message
                  </span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-gray-200/50 shadow-sm">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">
                    {selectedEnquiry.message || "No message provided."}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 p-5 sm:p-6 flex justify-end gap-3 border-t border-gray-200/50">
              <button
                onClick={() => {
                  setViewDetailsModal(false);
                  setSelectedEnquiry(null);
                }}
                className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
