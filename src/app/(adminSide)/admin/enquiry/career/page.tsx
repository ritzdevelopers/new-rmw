"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@/components/ui/AdminTable";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { FaFileAlt } from "react-icons/fa";

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
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">Career Enquiry</h1>
      <Breadcrumb currentPage="Contact-Enquiry" />

      <Table
        columns={[
          { key: "etype", label: "EType" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "category", label: "Category" },
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
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaFileAlt size={20} />
                </a>
              ) : (
                <span className="text-gray-400">—</span>
              ),
          },
          { key: "mobile", label: "Mobile" },
          { key: "message", label: "Message" },
          { key: "date", label: "Send Date" },
        ]}
        data={enquiries}
        leftHeaderButtons={
          <button
            onClick={exportToExcel}
            className="border border-black p-2 rounded-xl cursor-pointer hover:bg-black hover:text-white"
          >
            Export to excel
          </button>
        }
        searchableFields={["name", "email", "category", "message"]}
        actionButtons={(row) => (
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        )}
        emptyMessage="No contact enquiries found."
      />
      <footer className="admin-footer">
        Designed and Developed by <strong>Ritz Media World</strong>
      </footer>
    </div>
  );
};

export default Page;
