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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Career Enquiry
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Manage and view all career application submissions
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportToExcel}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium text-sm sm:text-base"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Export to Excel</span>
                <span className="sm:hidden">Export</span>
              </button>
            </div>
          </div>
          <div className="mt-4">
            <Breadcrumb currentPage="Contact-Enquiry" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Applications</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{enquiries.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Briefcase className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">With Resume</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {enquiries.filter((e) => e.resume).length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FileText className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">With Email</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {enquiries.filter((e) => e.email).length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Mail className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">This Month</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
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
              <div className="bg-orange-100 p-3 rounded-lg">
                <Calendar className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <Table
            columns={[
              { 
                key: "name", 
                label: "Name",
                render: (row) => (
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400 flex-shrink-0" />
                    <span className="font-medium text-gray-900 truncate">{row.name}</span>
                  </div>
                )
              },
              { 
                key: "email", 
                label: "Email",
                render: (row) => (
                  <div className="flex items-center gap-2 min-w-0">
                    <Mail size={16} className="text-gray-400 flex-shrink-0" />
                    <a 
                      href={`mailto:${row.email}`} 
                      className="text-blue-600 hover:text-blue-800 hover:underline truncate"
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
                  <span className="px-2 sm:px-3 py-1 inline-flex items-center text-xs sm:text-sm font-semibold rounded-full bg-purple-100 text-purple-800 shadow-sm whitespace-nowrap">
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
                      href={row.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open Resume"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      <FileText size={16} className="flex-shrink-0" />
                      <span className="hidden sm:inline text-sm">View Resume</span>
                      <span className="sm:hidden text-sm">View</span>
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">—</span>
                  ),
              },
              { 
                key: "mobile", 
                label: "Mobile",
                render: (row) => (
                  row.mobile ? (
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-400 flex-shrink-0" />
                      <a 
                        href={`tel:${row.mobile}`} 
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {row.mobile}
                      </a>
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )
                )
              },
              { 
                key: "message", 
                label: "Message",
                render: (row) => (
                  <div className="flex items-start gap-2 max-w-xs">
                    <MessageSquare size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 line-clamp-2 text-sm">{row.message || "—"}</p>
                  </div>
                )
              },
              { 
                key: "date", 
                label: "Date",
                render: (row) => (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700 whitespace-nowrap">{row.date}</span>
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
                  className="flex items-center gap-1.5 px-3 py-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium text-sm"
                  title="View Details"
                >
                  <Eye size={16} />
                  <span className="hidden sm:inline">View</span>
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium text-sm"
                  title="Delete"
                >
                  <Trash2 size={16} />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            )}
            emptyMessage="No career enquiries found."
          />
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-600 text-sm sm:text-base py-4">
          Designed and Developed by <strong className="text-gray-900">Ritz Media World</strong>
      </footer>
      </div>

      {/* View Details Modal */}
      {viewDetailsModal && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] my-auto overflow-hidden border border-gray-200 relative mx-2 sm:mx-0">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-4 sm:p-6 flex justify-between items-center sticky top-0 z-10">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="p-1.5 sm:p-2 bg-white bg-opacity-20 rounded-lg flex-shrink-0">
                  <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                  Career Application Details
                </h2>
              </div>
              <button
                onClick={() => {
                  setViewDetailsModal(false);
                  setSelectedEnquiry(null);
                }}
                className="p-1.5 sm:p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-200 text-white flex-shrink-0"
                aria-label="Close modal"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-140px)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {/* Name */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 sm:p-4 border border-blue-200 shadow-sm min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      Name
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-gray-900 break-words">
                    {selectedEnquiry.name}
                  </p>
                </div>

                {/* Email */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 sm:p-4 border border-green-200 shadow-sm min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">
                      Email
                    </span>
                  </div>
                  <a 
                    href={`mailto:${selectedEnquiry.email}`}
                    className="text-base sm:text-lg font-bold text-gray-900 break-all hover:text-blue-600 hover:underline block"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>

                {/* Phone */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 sm:p-4 border border-purple-200 shadow-sm min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
                      Phone
                    </span>
                  </div>
                  {selectedEnquiry.mobile ? (
                    <a 
                      href={`tel:${selectedEnquiry.mobile}`}
                      className="text-base sm:text-lg font-bold text-gray-900 hover:text-blue-600 hover:underline break-all block"
                    >
                      {selectedEnquiry.mobile}
                    </a>
                  ) : (
                    <p className="text-base sm:text-lg font-bold text-gray-900">N/A</p>
                  )}
                </div>

                {/* Category */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3 sm:p-4 border border-orange-200 shadow-sm min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-orange-700 uppercase tracking-wider">
                      Category
                    </span>
                  </div>
                  <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-orange-200 text-orange-800 border border-orange-300 break-words">
                    {selectedEnquiry.category || selectedEnquiry.etype || "General"}
                  </span>
                </div>
              </div>

              {/* Date */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-indigo-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                    Application Date
                  </span>
                </div>
                <p className="text-base sm:text-lg font-bold text-gray-900 break-words">
                  {selectedEnquiry.date}
                </p>
              </div>

              {/* Resume */}
              {selectedEnquiry.resume && (
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-teal-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                      Resume
                    </span>
                  </div>
                  <a
                    href={selectedEnquiry.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 font-medium text-sm sm:text-base"
                  >
                    <FileText size={16} className="sm:w-[18px] sm:h-[18px]" />
                    View Resume
                  </a>
                </div>
              )}

              {/* Message */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6 border border-gray-300 shadow-sm">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Message
                  </span>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">
                    {selectedEnquiry.message || "No message provided."}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 sm:p-6 flex justify-end gap-3 border-t border-gray-200">
              <button
                onClick={() => {
                  setViewDetailsModal(false);
                  setSelectedEnquiry(null);
                }}
                className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
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
