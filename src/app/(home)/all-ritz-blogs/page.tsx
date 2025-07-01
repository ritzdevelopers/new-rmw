"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
// import BlogCard from "@/components/new-blog/nb-card1/BlogCard1";
import BlogCard1 from "@/components/new-blog/nb-card1/BlogCard1";

type BlogType = {
  _id: string;
  blogTitle: string;
  blogBanner: string;
};

const BlogPage: React.FC = () => {
  const [allBlogs, setAllBlogs] = useState<BlogType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/ritz_blogs/get-all-blogs"
      );
      setAllBlogs(data.allBlogs);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setError("Unable to load blogs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <main className="px-4 md:px-8 py-10  bg-red-500 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Explore All Blogs
        </h1>
        <p className="text-lg text-gray-100 dark:text-gray-300">
          Discover articles by creators at Ritz Media — Stay updated with the
          latest in tech, trends, and tutorials.
        </p>
      </section>

      {/* Blog List */}
      <section className="flex flex-wrap justify-center gap-6">
        {loading && (
          <p className="text-center text-lg w-full">Loading blogs...</p>
        )}

        {error && <p className="text-red-500 text-center w-full">{error}</p>}

        {!loading && !error && allBlogs && allBlogs.length === 0 && (
          <p className="text-center text-lg w-full">No blogs found.</p>
        )}

        {!loading &&
          !error &&
          allBlogs &&
          allBlogs.map((blog) => <BlogCard1 key={blog._id} data={blog} />)}
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-gray-100 dark:text-gray-400">
        Designed & Developed by{" "}
        <span className="font-semibold">@Ritz Media</span>
      </footer>
    </main>
  );
};

export default BlogPage;
