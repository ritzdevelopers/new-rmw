"use client";

function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, " ");
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, " ");
}

import Loader from "@/components/loader/Loader";
import axios from "axios";
// import Link from "next/link";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
// import { CalendarDays } from "lucide-react";
import { CalendarDays, Share2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useBlogContext } from "@/context/AllBlogContext";
import Image from "next/image";
interface Article {
  _id: string;
  blogBanner: string;
  blogTitle: string;
  createdAt: string;
  meta_description: string;
  blogDescription: string;
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
  const { blogs, setBlogs } = useBlogContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const cardsPerPage = 12;

  const navigation = useRouter();
  const handleSingleBlogs = (slug: string) => {
    const url = slug.split(" ").join("-").toLowerCase();
    navigation.push(`/${url}`);
  };

  // useEffect(() => {
  //   // const handlePagination = () => {
  //     const pageNum = sessionStorage.getItem("page-no");
  //     if(!pageNum) {
  //       // setCurrentPage(1)
  //       sessionStorage.setItem("page-no", String(currentPage));
  //     } else  {
  //       sessionStorage.setItem("page-no", String(currentPage));
  //     }

  //   };
  //   handlePagination();
  // }, [currentPage]);

  // useEffect(() => {
  //   const pageNum = sessionStorage.getItem("page-no");
  //   console.log('this is page num ', pageNum);

  //   if (pageNum) {
  //     setCurrentPage(Number(pageNum));
  //   }
  // }, []);
  useEffect(() => {
    const call = () => {
      const pageNum = sessionStorage.getItem("page-no");
      if (Number(pageNum) > 1) {
        setCurrentPage(Number(pageNum));
      }
    };
    call();
  }, []);

  useEffect(() => {
    gsap.from(".mnc-card", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [blogs]);

  const path = usePathname();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const [resMongo, resMySQL] = await Promise.all([
          axios.get("/api/ritz_blogs/get-all-blogs"),
          axios.get("/api/all_blogs"),
        ]);
        console.log("====================================");
        console.log(resMongo.data.allBlogs);
        console.log("====================================");
        console.log("====================================");
        console.log(resMongo.data.allBlogs);
        console.log("====================================");
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
  useEffect(() => {}, [blogs]);

  if (!blogs || !Array.isArray(blogs)) return null;
  const filteredBlogs: MergedBlogs[] = blogs.filter((blog: MergedBlogs) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / cardsPerPage);
  const indexOfLastCard = (currentPage ?? 1) * cardsPerPage;
  const indexOfLastCard = (currentPage ?? 1) * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredBlogs.slice(indexOfFirstCard, indexOfLastCard);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      sessionStorage.setItem("page-no", String(currentPage + 1));
    }
  };

  const handlePrev = () => {
    if (currentPage ?? 1) {
      setCurrentPage(currentPage - 1);
      sessionStorage.setItem("page-no", String(currentPage - 1));
      // handlePagination();
    }
  };

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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          padding: "1rem",
        }}
      >
        {" "}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          padding: "1rem",
        }}
      >
        {" "}
        {currentCards.map((article: MergedBlogs) => (
          <div
            key={article.id}
            onClick={() => handleSingleBlogs(article.id)}
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
                      ? `/api/images${article.banner.split("/images")[1]}`
                      : `/blogs/${article.banner}`
                  }
                  alt={
                    article.banner.includes("/images")
                      ? `${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/${
                          article.banner.split("/images")[1]
                        }`
                      : `/blogs/${article.banner}`
                  }
                  className="card-img-top"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                    borderRadius: "10px",
                  }}
                  onMouseOver={(e: React.MouseEvent<HTMLImageElement>) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e: React.MouseEvent<HTMLImageElement>) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>

              {/* Content */}
              <div className="card-body d-flex flex-column justify-between">
                {/* Title */}
                <h5 className="card-title fw-semibold">
                  {article.title.split(/\s+/).slice(0, 10).join(" ")}
                </h5>
                <h5 className="card-title fw-semibold">
                  {article.title.split(/\s+/).slice(0, 10).join(" ")}
                </h5>

                {/* Paragraph */}
                <p
                  // style={{fontWeight:'lighter'}}
                  className="card-text text-muted"
                  dangerouslySetInnerHTML={{
                    __html: article.meta_description
                      .split(/\s+/)
                      .slice(0, 30)
                      .join(" "),
                  }}
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
                    onClick={(): void =>
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
