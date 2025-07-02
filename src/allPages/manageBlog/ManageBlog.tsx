"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Home, Monitor } from "lucide-react";

type Blog = {
  _id: string;
  blogBanner: string;
  blogTitle: string;
  // _id: string;
  blogCategory: string;
  categoryName: string;
  createdAt: string | Date;
  status: "active" | "inactive";
};

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteBlog, setDeleteBlog] = useState<Blog | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [totalBlogs, setTotalBlogs] = useState(0);
  const blogsPerPage = 15;

  // Fetch blogs whenever filters or page changes
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", currentPage.toString());
        params.append("limit", blogsPerPage.toString());
        if (searchQuery.trim() !== "") {
          params.append("search", searchQuery.trim());
        }
        if (selectedCategory !== "All") {
          params.append("category", selectedCategory);
        }

        const { data } = await axios.get(`/api/ritz_blogs/get-all-blogs`);

        setBlogs(data.allBlogs);
        setTotalBlogs(data.allBlogs.length);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, searchQuery, selectedCategory]);

  const handleDelete = async () => {
    if (!deleteBlog) return;
    try {
      await axios.delete("/api/blog/delete_blog", {
        data: { blog__id: deleteBlog._id },
      });
      // After deletion, refetch current page (or adjust page if last blog deleted)
      const newTotal = totalBlogs - 1;
      const maxPage = Math.ceil(newTotal / blogsPerPage);
      if (currentPage > maxPage) setCurrentPage(maxPage > 0 ? maxPage : 1);
      else setCurrentPage(currentPage);
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    }
    setDeleteBlog(null);
  };

  const categories = [
    "All",
    ...new Set(
      blogs &&
        blogs.map((blog) =>
          blog.categoryName ? blog.categoryName : "For Demo"
        )
    ),
  ];

  const totalPages = Math.ceil(totalBlogs / blogsPerPage);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [deleteKey, setDeleteKey] = useState("");

  const deleteBlogNow = async () => {
    try {
      if (!deleteKey) {
        alert("Internal Key Error Please Try Again!");
        return;
      } else {
        const res = await axios.delete(
          `/api/ritz_blogs/delete-blog/${deleteKey}`
        );
        if (res.status === 200) {
          alert("Your Blog Has Been Deleted Successfully!");
          window.location.reload();
          setDeleteConfirmModal(false);
        }
      }
    } catch (error) {
      alert("Internal Server Err.");
      setDeleteConfirmModal(false);
      console.log("====================================");
      console.log(
        "There are some errors in your delete blog now controller plz fix the bug first ",
        error
      );
      console.log("====================================");
    }
  };

  const handleDataDeleteModal = (key: string) => {
    setDeleteKey(" ");
    setDeleteConfirmModal(true);
    setDeleteKey(key);
  };
  return (
    <div className="bg-[#EEEEEE] flex flex-col gap-6 sm:gap-8 md:gap-12 p-4 md:p-8 min-h-screen">
      {deleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 w-full max-w-md shadow-lg text-center relative">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <AlertTriangle className="text-red-600 w-12 h-12" />
            </div>

            {/* Text */}
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Are you sure?
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              This action cannot be undone. The data will be permanently
              deleted.
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-md transition"
                onClick={() => setDeleteConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                // onClick={deleteData}
                onClick={deleteBlogNow}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Title Section */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-[#ACACAC] flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-light uppercase">
          <Monitor className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
          Manage Blogs
        </h1>
      </div>

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 bg-white p-3 rounded-md shadow-sm">
        <h1 className="text-[#2955B3] flex items-center gap-2">
          <Home className="w-4 h-4" />
          Home
        </h1>
        <span className="text-[#ACACAC] font-bold">/</span>
        <h1 className="text-[#838383] flex items-center gap-2">
          <Monitor className="w-4 h-4" />
          Manage Blogs
        </h1>
      </div>

      {/* Main Section */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        {/* Header */}
        <div className="bg-[#9CA9B4] p-4">
          <p className="text-white font-medium text-base sm:text-lg">
            Manage Page
          </p>
        </div>

        {/* Sorting Section */}
        <div className="flex flex-col gap-6 p-4">
          <div className="flex justify-end">
            <Link
              href={"/admin/add-blog"}
              className="px-6 py-2 rounded-md font-semibold text-white bg-[#688A7E] hover:bg-[#365248] cursor-pointer transition duration-200"
            >
              Add New Blog
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 flex-wrap">
            {/* Show Entries */}
            <div className="flex items-center gap-2">
              <p className="font-semibold text-[#688A7E] whitespace-nowrap">
                Show Entries
              </p>
              <select
                // onChange={(E) => getEntriesManually(E)}
                className="border border-[#365248] rounded-md px-3 py-1.5 text-[#365248] outline-none cursor-pointer"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 border border-[#1a6249] rounded-md px-3 py-2 w-full md:w-auto">
              <p className="text-[#717272] font-medium whitespace-nowrap">
                Search Now
              </p>
              <input
                type="text"
                placeholder="Search here..."
                // onChange={(e) => getDataWithSearch(e)}
                className="bg-transparent outline-none placeholder:text-[#365248] text-[#365248] w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Blogs Table */}
      {loading ? (
        <p className="text-center mt-6">Loading blogs...</p>
      ) : (
        <div className="mt-4 bg-white p-4 rounded-md shadow-md">
          {/* Desktop View */}
          <div className="hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#9CA9B4] text-white">
                  <th className="p-2">Image</th>
                  <th className="p-2">blogTitle</th>
                  {/* <th className="p-2">Blog URL</th> */}
                  <th className="p-2">Category</th>
                  <th className="p-2">Add Date</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id} className="border-b">
                    <td className="p-2">
                      <Image
                        src={`${blog.blogBanner}`}
                        alt={blog.blogTitle}
                        width={120}
                        height={120}
                        className="rounded-md"
                      />
                    </td>
                    <td className="p-2">{blog.blogTitle}</td>
                    {/* <td className="p-2 text-sm">{`/ritz_blogs/get-single-blog/${blog._id}`}</td> */}
                    <td className="p-2">{blog.categoryName}</td>
                    <td className="p-2">
                      {new Date(blog.createdAt).toLocaleDateString("en-US")}
                    </td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-md text-white ${
                          blog.status === "active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td>
                      <Link
                        href={`http://localhost:3000/all-ritz-blogs/read-single-blog/${blog._id}`}
                      >
                        <button className="text-blue-600 hover:text-blue-800 pl-1 cursor-pointer">
                          <FaEye />
                        </button>
                      </Link>
                      <Link href={`/admin/update/step-1/${blog._id}`}>
                        <button className="text-green-600 hover:text-green-800 pl-1 cursor-pointer">
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800 pl-1 cursor-pointer"
                        onClick={() => handleDataDeleteModal(blog._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-gray-100 p-4 rounded-md shadow-md"
              >
                <Image
                  src={`/blogs/${blog.blogBanner}`}
                  alt={blog.blogTitle}
                  width={300}
                  height={200}
                  className="rounded-md w-full"
                />
                <h3 className="text-lg font-semibold mt-2">{blog.blogTitle}</h3>
                <p className="text-sm text-gray-600">{blog._id}</p>
                <p className="text-sm text-gray-600">
                  Category: {blog.categoryName}
                </p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(blog.createdAt).toLocaleDateString("en-US")}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span
                    className={`px-2 py-1 rounded-md text-white ${
                      blog.status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {blog.status}
                  </span>
                  <div className="flex gap-2">
                    <Link href={`/${blog._id}`}>
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEye size={18} />
                      </button>
                    </Link>
                    <Link href={`/admin/update-blog/${blog._id}`}>
                      <button className="text-green-600 hover:text-green-800">
                        <FaEdit size={18} />
                      </button>
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => setDeleteBlog(blog)}
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2 flex-wrap">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-4 py-2 rounded ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-black hover:bg-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {deleteBlog && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-md shadow-md"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p>
                Are you sure you want to delete &quot;{deleteBlog.blogTitle}
                &quot;?
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setDeleteBlog(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded"
                  onClick={handleDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
