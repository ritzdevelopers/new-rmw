"use client";

import Loader from "@/components/loader/Loader";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Article {
  blog_image: string;
  slug: string;
  title: string;
  description: string;
  created_at: string;
}

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/all_blogs");
        setBlogs(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs by search query (case-insensitive title match)
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const cardsPerPage = 12;

  const totalPages = Math.ceil(filteredBlogs.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredBlogs.slice(indexOfFirstCard, indexOfLastCard);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4 mb-50">
      {/* Search Input */}
      <div className="text-center mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // reset to first page on new search
          }}
          className="form-control w-100 w-md-50 mx-auto p-2 rounded shadow"
          style={{ maxWidth: "400px" }}
        />
      </div>

      {/* Blog Cards */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3  g-4">
        {currentCards.map((article, index) => (
          <Link href={article.slug} className="col" key={index}>
            <div
              style={{ background: "white", color: "black" }}
              className="card h-100"
            >
              <div style={{ overflow: "hidden", height: "200px" }}>
                <img
                  src={`/blogs/${article.blog_image}`}
                  className="card-img-top"
                  alt={`ritz-media-world/${article.blog_image}`}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "fill",
                    transition: "all 0.3s ease-in-out",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <small className="text-muted">
                    {new Date(article.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </small>
                </div>
                <h5 className="card-title mt-2">{article.title}</h5>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {filteredBlogs.length > 0 && (
        <div className="text-center mt-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            style={{
              color: "#000",
              background: "var(--tp-primary-blue)",
              padding: "10px 20px",
              borderRadius: "30px",
              fontWeight: "bold",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              opacity: currentPage === 1 ? 0.5 : 1,
              transition: "all 0.3s ease-in-out",
              boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
            }}
            className="mx-2"
          >
            ⬅ Prev
          </button>

          <span
            style={{
              fontSize: "16px",
              padding: "5px 15px",
              color: "#0c0c0c",
              borderRadius: "20px",
            }}
          >
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            style={{
              color: "#000",
              background: "var(--tp-primary-blue)",
              padding: "10px 20px",
              borderRadius: "30px",
              fontWeight: "bold",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              opacity: currentPage === totalPages ? 0.5 : 1,
              transition: "all 0.3s ease-in-out",
              boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
            }}
            className="mx-2"
          >
            Next ➡
          </button>
        </div>
      )}

      {/* No Results Message */}
      {filteredBlogs.length === 0 && (
        <p className="text-center text-muted mt-4">
          No blogs found for your search.
        </p>
      )}
    </div>
  );
};

export default Blogs;
