"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@/components/ui/AdminTable";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Download, Trash2, Mail, Phone, User, MessageSquare, Calendar } from "lucide-react";

interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  mobile?: string;
  etype: string;
  send_date: string;
  date?: string; // formatted
}

const Page = () => {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await axios.get("/api/system-settings/contact-enquiry");

        // Cast the data to ContactEnquiry[]
        const data = res.data as ContactEnquiry[];

        const filtered = data.filter((entry) => entry.etype === "ContactUs");

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
                Contact Enquiry
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Manage and view all contact form submissions
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
                <p className="text-sm text-gray-600 mb-1">Total Enquiries</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{enquiries.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <MessageSquare className="text-blue-600" size={24} />
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
              <div className="bg-green-100 p-3 rounded-lg">
                <Mail className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">With Mobile</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {enquiries.filter((e) => e.mobile).length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Phone className="text-purple-600" size={24} />
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                    <p className="text-gray-700 line-clamp-2 text-sm">{row.message}</p>
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
            searchableFields={["name", "email", "subject", "message"]}
            actionButtons={(row) => (
              <button
                onClick={() => handleDelete(row.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium text-sm"
              >
                <Trash2 size={16} />
                <span className="hidden sm:inline">Delete</span>
              </button>
            )}
            emptyMessage="No contact enquiries found."
          />
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-600 text-sm sm:text-base py-4">
          Designed and Developed by <strong className="text-gray-900">Ritz Media World</strong>
        </footer>
      </div>
    </div>
  );
};

export default Page;
