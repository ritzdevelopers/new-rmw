"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import axios from "axios";
import { FiEdit, FiTrash } from "react-icons/fi";
import Link from "next/link";

interface Faq {
  id: number;
  title: string;
  description: string;
  status: string;
}

const Page = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<Faq[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/system-settings/manage-faq");
        setFaqs(response.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
    fetchData();
  }, []);

  // Search filter
  useEffect(() => {
    const filtered = faqs.filter((faq) =>
      faq.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFaqs(filtered);
  }, [searchQuery, faqs]);

  const totalPages = Math.ceil(filteredFaqs.length / entriesPerPage);
  const currentData = filteredFaqs.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(`/api/system-settings/manage-faq/${id}`);
      if (res.status === 200) {
        setFaqs((prev) => prev.filter((faq) => faq.id !== id));
      } else {
        console.error("Failed to delete FAQ", res.data);
      }
    } catch (err) {
      console.error("Error deleting FAQ:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-2">Manage FAQs</h1>
      <Breadcrumb currentPage="FAQ" />

      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 mt-4 gap-2">
        <div>
          <label className="text-sm mr-2">Show</label>
          <select
            className="border rounded px-2 py-1"
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className="ml-2 text-sm">entries</span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search title..."
            className="border rounded px-3 py-1 w-full md:w-64"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Link
            href="/admin/howitworks/add"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
          >
            Add FAQ
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded bg-white shadow-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border-b">Title</th>
              <th className="p-3 border-b">Description</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{entry.title}</td>
                <td className="p-3 border-b line-clamp-2 max-w-sm">
                  {entry.description}
                </td>
                <td className="p-3 border-b capitalize">{entry.status}</td>
                <td className="p-3 border-b space-x-2">
                  <a
                    href={`/admin/howitworks/edit/${entry.id}`}
                    className="inline-flex items-center justify-center text-blue-600 hover:text-blue-800 transition"
                    title="Edit"
                  >
                    <FiEdit size={18} />
                  </a>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="inline-flex items-center justify-center text-red-600 hover:text-red-800 transition"
                    title="Delete"
                  >
                    <FiTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  No entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <footer className="admin-footer mt-6">
        Designed and Developed by <strong>Ritz Media World</strong>
      </footer>
    </div>
  );
};

export default Page;
