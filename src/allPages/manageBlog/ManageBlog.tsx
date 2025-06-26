"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

type Blog = {
  id: string;
  blog_image: string;
  title: string;
  slug: string;
  category: string;
  category_name: string;
  created_at: string | Date;
  status: "active" | "inactive";
};

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteBlog, setDeleteBlog] = useState<Blog | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogsPerPage = 15;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get("/api/manage_blog/all_blog");
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  const handleDelete = async () => {
    if (!deleteBlog) return;
    try {
      await axios.delete("/api/blog/delete_blog", {
        data: { blog_slug: deleteBlog.slug },
      });
      setBlogs((prev) => prev.filter((blog) => blog.slug !== deleteBlog.slug));
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    }
    setDeleteBlog(null);
  };

  const categories = ["All", ...new Set(blogs.map((blog) => blog.category_name))];

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "All" || blog.category_name === selectedCategory)
  );

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);


  return (
    <div className="p-10 pl-20 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-black text-white p-4 rounded-md shadow-md flex justify-between items-center">
        <h2 className="text-lg font-semibold">Manage Blogs</h2>
        <Link href="/admin/add-blog">
          <button className="px-4 py-2 bg-white text-black rounded-md hover:bg-blue-700 hover:text-white transition">
            Add Blog
          </button>
        </Link>
      </div>

      {/* Search & Filter */}
      <div style={{display:"flex", justifyContent:"space-between"}} className="mt-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded-md w-full max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded-md w-full max-w-sm"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
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
                <tr className="bg-black text-white">
                  <th className="p-2">Image</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Blog URL</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Add Date</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentBlogs.map((blog) => (
                  <tr key={blog.id} className="border-b">
                    <td className="p-2">
                      <Image
                        src={`/blogs/${blog.blog_image}`}
                        alt={blog.title}
                        width={120}
                        height={120}
                        className="rounded-md"
                      />
                    </td>
                    <td className="p-2">{blog.title}</td>
                    <td className="p-2">{blog.slug}</td>
                    <td className="p-2">{blog.category_name}</td>
                    <td className="p-2">
                      {new Date(blog.created_at).toLocaleDateString("en-US")}
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
                      <Link href={`/${blog.slug}`}>
                        <button className="text-blue-600 hover:text-blue-800 pl-1 cursor-pointer">
                          <FaEye />
                        </button>
                      </Link>
                      <Link href={`/admin/update-blog/${blog.slug}`}>
                        <button className="text-green-600 hover:text-green-800 pl-1 cursor-pointer">
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800 pl-1 cursor-pointer"
                        onClick={() => setDeleteBlog(blog)}
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
            {currentBlogs.map((blog) => (
              <div key={blog.id} className="bg-gray-100 p-4 rounded-md shadow-md">
                <Image
                  src={`/blogs/${blog.blog_image}`}
                  alt={blog.title}
                  width={300}
                  height={200}
                  className="rounded-md w-full"
                />
                <h3 className="text-lg font-semibold mt-2">{blog.title}</h3>
                <p className="text-sm text-gray-600">{blog.slug}</p>
                <p className="text-sm text-gray-600">Category: {blog.category}</p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(blog.created_at).toLocaleDateString("en-US")}
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
                    <Link href={`/${blog.slug}`}>
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEye size={18} />
                      </button>
                    </Link>
                    <Link href={`/admin/update-blog/${blog.slug}`}>
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
    {/* Previous Button */}
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((prev) => prev - 1)}
      className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
    >
      Previous
    </button>

    {/* Page Numbers with Window */}
    {(() => {
      const pageNumbers = [];
      const maxVisiblePages = 5;
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      return pageNumbers.map((pageNum) => (
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
      ));
    })()}

    {/* Next Button */}
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

      {/* Delete Confirmation Modal */}
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
                Are you sure you want to delete &quot;{deleteBlog.title}&quot;?
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
                  style={{ cursor: "pointer" }}
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
