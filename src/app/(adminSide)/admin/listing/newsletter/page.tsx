"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb"; // Optional
import axios from "axios";

interface Newsletter {
  id: string;
  email: string;
  addDate: string;
}

const NewslettersPage = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [filteredNewsletters, setFilteredNewsletters] = useState<Newsletter[]>(
    []
  );

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString();
  };

  // Fetch newsletters from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/system-settings/manage-newsletter"
        );
        // const data = await response.data;

        // const formattedData = data.map((item: any) => ({
        //   ...item,
        //   addDate: formatDate(item.addDate),
        // }));
        const data = response.data as Newsletter[];

        const formattedData = data.map((item) => ({
          ...item,
          addDate: formatDate(item.addDate),
        }));

        setNewsletters(formattedData);
      } catch (error) {
        console.error("Error fetching newsletters:", error);
      }
    };
    fetchData();
  }, []);

  // Filter newsletters based on search
  useEffect(() => {
    const filtered = newsletters.filter((n) =>
      n.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNewsletters(filtered);
  }, [searchQuery, newsletters]);

  const totalPages = Math.ceil(filteredNewsletters.length / entriesPerPage);
  const currentData = filteredNewsletters.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(
        `/api/system-settings/manage-newsletter/${id}`
      );

      console.log("Deleting newsletter with ID:", id);

      // Check if the deletion was successful based on the response status
      if (res.status === 200) {
        // Delete was successful, so filter out the deleted item from the state
        setNewsletters((prev) => prev.filter((n) => n.id !== id));
      } else {
        console.error("Failed to delete newsletter", res.data);
      }
    } catch (err) {
      console.error("Error deleting newsletter:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-2">Manage Newsletter</h1>
      <Breadcrumb currentPage="Manage-Newsletter" />

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

        <div>
          <input
            type="text"
            placeholder="Search email..."
            className="border rounded px-3 py-1 w-full md:w-64"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded bg-white shadow-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Add Date</th>
              <th className="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{entry.email}</td>
                <td className="p-3 border-b">{entry.addDate}</td>
                <td className="p-3 border-b">
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan={3} className="p-3 text-center text-gray-500">
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
    </div>
  );
};

export default NewslettersPage;
