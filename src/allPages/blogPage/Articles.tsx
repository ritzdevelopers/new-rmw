"use client";

import Loader from "@/components/loader/Loader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { CalendarDays, Share2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useBlogContext } from "@/context/AllBlogContext";

// Define MergedBlogs2 type here to ensure it includes 'slug'
export type MergedBlogs2 = {
  id: string;
  banner: string;
  title: string;
  createdAt: string;
  meta_description: string;
  status: string;
  slug: string;
};
import Image from "next/image";

// ---------------- Types ----------------
interface Article {
  _id: string;
  blogBanner: string;
  blogTitle: string;
  createdAt: string;
  meta_description: string;
  blogDescription: string;
  blogStatus: boolean;
  blogSlug: string;
}

interface Article2 {
  slug: string;
  blog_image: string;
  title: string;
  created_at: string;
  meta_description: string;
  status: string;
}


// ---------------- Normalizers ----------------
const normalizeArticle = (blog: Article): MergedBlogs2 => ({
  id: blog._id,
  banner: blog.blogBanner,
  title: blog.blogTitle,
  createdAt: blog.createdAt,
  meta_description: blog.meta_description,
  status: blog.blogStatus ? "active" : "inactive",
  slug: blog.blogSlug,
});

const normalizeArticle2 = (blog: Article2): MergedBlogs2 => ({
  id: blog.slug,
  banner: blog.blog_image,
  title: blog.title,
  createdAt: blog.created_at,
  meta_description: blog.meta_description,
  status: blog.status,
  slug: blog.slug,
});


// ---------------- Component ----------------
const Articles: React.FC = () => {
  const { blogs, setBlogs } = useBlogContext();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const cardsPerPage = 12;
  const path = usePathname();

  // 🔹 Restore pagination from sessionStorage
  useEffect(() => {
    const savedPage = Number(sessionStorage.getItem("page-no"));
    if (savedPage > 1) setCurrentPage(savedPage);
  }, []);

  // 🔹 Animate cards on blog change
  useEffect(() => {
    if (blogs?.length) {
      gsap.from(".mnc-card", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [blogs]);

  // 🔹 Fetch blogs (with caching in sessionStorage)
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // ✅ Check cache first
        const cached = sessionStorage.getItem("all-blogs");
        if (cached) {
          setBlogs(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const [resMongo, resMySQL] = await Promise.all([
          axios.get("/api/ritz_blogs/get-all-blogs"),
          axios.get("/api/all_blogs"),
        ]);

        const mongoBlogs: Article[] = resMongo.data.allBlogs || [];
        const mysqlBlogs: Article2[] = resMySQL.data || [];

        const merged: MergedBlogs2[] = [
          ...mongoBlogs.map(normalizeArticle),
          ...mysqlBlogs.map(normalizeArticle2),
        ];

        setBlogs(merged);

        // ✅ Save to cache
        sessionStorage.setItem("all-blogs", JSON.stringify(merged));
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
  }, [setBlogs]);

  // 🔹 Guard
  if (!blogs || !Array.isArray(blogs)) return null;

  // 🔹 Search + Pagination
  const filteredBlogs = blogs
    .filter((b) => b.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((b): b is MergedBlogs2 => typeof b.status === "string" && b.status !== undefined);

  const totalPages = Math.ceil(filteredBlogs.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards: MergedBlogs2[] = filteredBlogs.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  // 🔹 Pagination handlers
  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      sessionStorage.setItem("page-no", String(newPage));
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      sessionStorage.setItem("page-no", String(newPage));
    }
  };

  // 🔹 Copy URL
  const handleCopy = (fullPath: string) => {
    const url = `${window.location.origin}${path}/${fullPath}`;
    navigator.clipboard.writeText(url);
    alert("Url Has Copied!");
  };

  // 🔹 Open blog
  const handleSingleBlogs = (slug: string) => {
    window.open(`/${slug}`, "_blank");
  };

  // ---------------- Render ----------------
  if (loading) return <Loader />;
  if (error)
    return <p className="text-center text-danger mt-4">Error: {error}</p>;

  function stripHtml(description: string) {
    if (!description) return "";
    return description
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          padding: "1rem",
        }}
      >
        {" "}
        {currentCards
          .filter((bl) => bl.status === "active")
          .map((article) => (
            <div
              className="mnc-card"
              key={article.id}
              onClick={() => handleSingleBlogs(article.slug)}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                backgroundColor: "#fff",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-5px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 8px 30px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 4px 20px rgba(0,0,0,0.08)";
              }}
            >
              {/* Image Section */}
              <div
                style={{
                  height: "200px",
                  width: "100%",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src={
                    article.banner.includes("/images")
                      ? `/api/images${article.banner.split("/images")[1]}`
                      : `/blogs/${article.banner}`
                  }
                  alt={article.title}
                  fill
                />
              </div>
              {/* Content Section */}
              <div
                style={{
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                {/* Title */}
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    marginBottom: "0.75rem",
                    color: "#333",
                  }}
                >
                  {article.title.split(" ").slice(0, 10).join(" ")}{" "}
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#555",
                    lineHeight: "1.6",
                    flexGrow: 1,
                  }}
                >
                  {(() => {
                    const description = article?.meta_description || "";
                    const plainText = stripHtml(description) || "";
                    const words = plainText.split(/\s+/);
                    const shortened = words.slice(0, 30).join(" ");
                    return words.length > 30 ? `${shortened}...` : shortened;
                  })()}
                </p>

                {/* Footer Actions */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  {/* Date */}
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#888",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <CalendarDays size={14} />
                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  {/* Share */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(article.title.split(" ").join("-"));
                    }}
                    style={{
                      background: "transparent",
                      border: "1px solid #E5B05C",
                      color: "#E5B05C",
                      borderRadius: "6px",
                      padding: "0.3rem 0.6rem",
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      cursor: "pointer",
                    }}
                  >
                    <Share2 size={15} /> Share
                  </button>
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
