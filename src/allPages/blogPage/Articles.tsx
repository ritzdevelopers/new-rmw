"use client";

import Loader from "@/components/loader/Loader";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import Link from 'next/link';
import gsap from "gsap";
import { CalendarDays } from "lucide-react";
interface Article {
  _id: string;
  blogBanner: string;
  blogTitle: string;
  createdAt: string;
}

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  useEffect(() => {
    gsap.from(".mnc-card", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/ritz_blogs/get-all-blogs"
        );
        setBlogs(response.data.allBlogs);
        console.log(response.data.allBlogs);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
          console.log(err.message);
        } else if (err instanceof Error) {
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

  const filteredBlogs = blogs.filter((blog) =>
    blog.blogTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const cardsPerPage = 12;

  const totalPages = Math.ceil(filteredBlogs.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredBlogs.slice(indexOfFirstCard, indexOfLastCard);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <Loader />;
  if (error)
    return <p className="text-center text-danger mt-4">Error: {error}</p>;

  return (
    <div className="container mt-4 mb-5">
      {/* Search Input */}
      <div className="text-center mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="form-control w-100 w-md-50 mx-auto p-2 rounded shadow"
          style={{ maxWidth: "400px" }}
        />
      </div>
      {/* Blog Cards */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {currentCards.map((article) => (
          <div className="col" key={article._id}>
            <Link
              href={`/all-ritz-blogs/read-single-blog/${article._id}`}
              passHref
            >
              <div
                className="card h-100 mnc-card shadow-sm border-0"
                style={{
                  borderRadius: "1rem",
                  transition: "box-shadow 0.3s ease",
                  background: "#ffffff",
                }}
              >
                {/* Image Container */}
                <div
                  style={{
                    overflow: "hidden",
                    height: "220px",
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                    position: "relative",
                  }}
                >
                  <img
                    src={article.blogBanner}
                    alt={`ritz-media-world/${article.blogTitle}`}
                    className="card-img-top"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>

                {/* Card Body */}
                <div className="card-body d-flex flex-column justify-content-between">
                  <div className="flex justify-center items-center">
                    <small className="text-muted d-flex align-items-center">
                      <CalendarDays size={16} className="me-1" />
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </small>
                  </div>

                  <h5 className="card-title mt-1">{article.blogTitle}</h5>
                </div>
              </div>
            </Link>
          </div>
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
      {/* No Results */}
      {filteredBlogs.length === 0 && (
        <p className="text-center text-muted mt-4">
          No blogs found for your search.
        </p>
      )}
    </div>
  );
};

export default Blogs;
