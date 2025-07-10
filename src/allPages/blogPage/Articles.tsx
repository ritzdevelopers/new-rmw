"use client";

import Loader from "@/components/loader/Loader";
import axios from "axios";
// import Link from "next/link";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
// import { CalendarDays } from "lucide-react";
import { CalendarDays, Share2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
interface Article {
  _id: string;
  blogBanner: string;
  blogTitle: string;
  createdAt: string;
  meta_description: string;
  blogDescription:string
}

interface Article2 {
  slug: string;
  blog_image: string;
  title: string;
  created_at: string;
  meta_description: string;
}

interface MergedBlogs {
  id: string;
  banner: string;
  title: string;
  createdAt: string;
  meta_description: string;
}

const normalizeArticle = (blog: Article): MergedBlogs => ({
  id: blog.blogTitle,
  banner: blog.blogBanner,
  title: blog.blogTitle,
  createdAt: blog.createdAt,
  meta_description: blog.blogDescription,
});

const normalizeArticle2 = (blog: Article2): MergedBlogs => ({
  id: blog.slug,
  banner: blog.blog_image,
  title: blog.title,
  createdAt: blog.created_at,
  meta_description: blog.meta_description,
});

const Articles: React.FC = () => {
  const [blogs, setBlogs] = useState<MergedBlogs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  const navigation = useRouter();
  const handleSingleBlogs = (slug: string) => {
    const url = slug.split(" ").join("-").toLowerCase();
    navigation.push(`/${url}`);
  };
  useEffect(() => {
    gsap.from(".mnc-card", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [blogs]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const [resMongo, resMySQL] = await Promise.all([
          axios.get("/api/ritz_blogs/get-all-blogs"),
          axios.get("/api/all_blogs"),
        ]);

        const mongoBlogs: Article[] = resMongo.data.allBlogs || [];
        const mysqlBlogs: Article2[] = resMySQL.data || [];

        const merged: MergedBlogs[] = [
          ...mongoBlogs.map(normalizeArticle),
          ...mysqlBlogs.map(normalizeArticle2),
        ];

        setBlogs(merged);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
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
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const path = usePathname();
  const handleCopy = (fullPath: string) => {
    const url = `${window.location.origin}${path}/${fullPath}`;
    navigator.clipboard.writeText(url);
    alert("Url Has Copied!");
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
          <div
            className="col"
            key={article.id}
            onClick={() => handleSingleBlogs(article.id)}
          >
            <div
              className="card h-100 shadow-sm border-0"
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                background: "#ffffff",
              }}
            >
              {/* Image */}
              <div
                style={{
                  height: "220px",
                  overflow: "hidden",
                  position: "relative",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={
                    article.banner.includes("/images")
                      ? `/static/${article.banner}`
                      : `/blogs/${article.banner}`
                  }
                  alt={`Banner of ${article.banner}`}
                  className="card-img-top"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    transition: "transform 0.4s ease",
                    borderRadius: "10px",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>

              {/* Content */}
              <div className="card-body d-flex flex-column justify-between">
                {/* Title */}
                <h5 className="card-title fw-semibold">{article.title}</h5>

                {/* Paragraph */}
                <p
                // style={{fontWeight:'lighter'}}
                  className="card-text text-muted"
                  dangerouslySetInnerHTML={{ __html: article.meta_description }}
                ></p>

                {/* Buttons */}
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  {/* Published Date */}
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                    disabled
                  >
                    <CalendarDays size={16} />
                    <span>
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() =>
                      handleCopy(article.title.split(" ").join("-"))
                    }
                    // type="button"
                    style={{
                      // backgroundColor: "blue",
                      color: "#E5B05C",
                      fontSize: "0.875rem",
                      padding: "0.25rem 0.5rem",
                      border: "none",
                      borderRadius: "0.375rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      cursor: "pointer",
                      borderWidth: "1px",
                      borderColor: "#E5B05C",
                      borderStyle: "solid",
                    }}
                  >
                    <Share2 size={16} />
                    Share Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredBlogs.length > 0 && (
        <div className="text-center mt-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="mx-2"
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
            className="mx-2"
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

export default Articles;
