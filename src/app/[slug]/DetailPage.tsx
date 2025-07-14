"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/core-css.css";
import "../styles/unit-css.css";
import "../styles/spacing.css";
import "../styles/magnific-popup-css.css";
import "../styles/elementor-css.css";
import "../styles/animation-css.css";
// import Head from "next/head";

import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./page.module.css";
import ServiceThirdHero from "@/allPages/serviceThirdPage/ServiceThirdHero";
import ServiceThirdQuality from "@/allPages/serviceThirdPage/ServiceThirdQuality";
import ServiceThirdColorMarque from "@/allPages/serviceThirdPage/ServiceThirdColorMarque";
import ServiceThirdAward from "@/allPages/serviceThirdPage/ServiceThirdAward";
import ServiceMainTestimonial from "@/allPages/serviceMainpage/ServiceMainTestimonial";
import ProjectSwiper from "@/allPages/Homepage/ProjectSwiper";
import ServiceThirdSlowMarque from "@/allPages/serviceThirdPage/ServiceThirdSlowMarque";
import ServiceEndTag from "@/components/endTag/serviceEndTag";
import Footer from "@/components/footer/Footer";
import Loader from "@/components/loader/Loader";
import Form from "@/allPages/Contactpage/Form";
import Header from "@/components/header/Header";
import {
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  X,
  Share2,
  Search,
  ExternalLink,
  CalendarDays,
  // Loader2,
} from "lucide-react";
import Image from "next/image";
// import { useBlogContext } from "@/context/AllBlogContext";
// import { title } from "process";
// import styles from "./page.module.css"
// Blog interface
export interface BlogBodyPage {
  metaTitle: string;
  metaDescription: string;
  innerImg: string;
}

export interface Blog {
  // MySQL Fields
  id?: number;
  title?: string;
  slug?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  blog_image?: string;
  description?: string;
  created_at?: string;
  status?: string;
  category_id?: string;
  // MongoDB Fields
  _id?: string;
  blogTitle?: string;
  blogSlug?: string;
  blogCategoryId?: string;
  blogDescription?: string;
  metaKeywords?: string;
  blogBanner?: string;
  blogBody?: BlogBodyPage[]; // updated to an array
  createdAt?: string;
  blogStatus?: string;
}

// Service interface
interface CardData {
  title: string;
  description: string;
  image_url?: string;
}
interface CategoryData {
  _id?: string;
  categoryName?: string;
  categoryMetaDescription?: string;
  categoryMetaTitle?: string;
  categoryMetaKeywords?: string;
  categorySlug?: string;
  name?: string;
  id?: string;
}

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
interface RecentBlogs {
  _id: string;
  blogBanner: string;
  blogTitle: string;
  createdAt: string;
  meta_description: string;
  blogDescription: string;
  blogSlug: string;
}
// app/blog/[slug]/page.tsx

const DetailPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  // const newSl = slug;
  const [loading, setLoading] = useState(true);
  const [searchB, setSearchB] = useState<string>("");
  const [singleBlog, setSingleBlog] = useState<Blog | null>(null);
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [head, setHead] = useState<string | null>(null);
  const [endTag, setEndTag] = useState<string | null>(null);
  const [cats, setRitzCats] = useState<CategoryData[]>([]);
  const [latestRBlogs, setLatestRBlogs] = useState<Blog[]>([]);
  const [blogs, setBlogs] = useState<MergedBlogs[]>([]);
  const [clickedPlatform, setClickedPlatform] = useState<string | null>(null);
  const router = useRouter();
  const [recentB, setRecentB] = useState<RecentBlogs[]>([]);
  // const [searchedBlog, setSearchedBlog] = useState<boolean>(false);
  // NEXT_PUBLIC_SERVER_IMG_PATHs
  const staticAPI = process.env.NEXT_PUBLIC_SERVER_IMG_PATH ||  `http://localhost:5000/images`;
  useEffect(() => {
    // setSearchedBlog(false);
    const fetchData = async () => {
      setLoading(true);
      try {
        const cleanSlug = slug?.replace(/\.html$/, "");

        // Fetch categories
        // const { data } = await axios.get(`/api/ritzCats/getAllCats`);
        const catData2 = await axios.get(`/api/blog/categories`);

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

        setRitzCats([...catData2.data]);
        // Attempt to resolve slug
        const response = await axios.get(`/api/resolve/${cleanSlug}`);

        if (response.data.type === "blog") {
          setSingleBlog(response.data.blog);
        } else if (response.data.type === "service") {
          const { secondLayer, thirdLayer } = response.data;

          const serviceResponse = await axios.get(
            `/api/services/${secondLayer}/${thirdLayer}`
          );
          const res = await axios.get(
            `/api/ritz_blogs/get-single-blog/${cleanSlug}`
          );
          setRecentB(res.data.recentBlogs);
          if (res) {
            setMBC(res?.data.categoryN);
            // console.log(mBC);
          }

          setCardData(serviceResponse.data.cards || []);
          setHead(serviceResponse.data.s3heading1 || null);
          setEndTag(serviceResponse.data.s3endtag || null);
        } else {
          throw new Error("Not a blog or service, fallback to MongoDB");
        }
      } catch (error) {
        console.log("Error resolving via MySQL. Fallback to MongoDB.", error);
        try {
          const cleanSlug = slug?.replace(/\.html$/, "");
          const res = await axios.get(
            `/api/ritz_blogs/get-single-blog/${cleanSlug}`
          );
          setRecentB(res.data.recentBlogs);
          if (res) {
            setMBC(res?.data.categoryN);
            // console.log(mBC);
          }
          setLatestRBlogs(res.data.latestRBlogs);
          setSingleBlog(res.data.blog);
        } catch (err) {
          console.error("Fallback MongoDB fetch failed:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  useEffect(() => {
    if (clickedPlatform) {
      const timeout = setTimeout(() => setClickedPlatform(null), 1000);
      return () => clearTimeout(timeout);
    }
  }, [clickedPlatform]);

  function getShareUrl(
    platform: string,
    title: string,
    url: string
  ): string | undefined {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);

    switch (platform) {
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      case "twitter":
        return `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      case "whatsapp":
        return `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
      default:
        return undefined;
    }
  }
  const path = usePathname();
  const handleCopy2 = (fullPath: string) => {
    const url = `${window.location.origin}${path}/${fullPath}`;
    navigator.clipboard.writeText(url);
    alert("Url Has Copied!");
  };

  const handleCopy = (platform: string) => {
    setClickedPlatform(platform);

    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const fullUrl = `${baseUrl}/blog/${slug}`;
    const title = singleBlog?.title ?? "";

    if (platform === "copy") {
      navigator.clipboard
        .writeText(fullUrl)
        .then(() => {
          // optional toast or alert
          // console.log("URL copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
      return; // ✅ Don't continue
    }

    const shareUrl = getShareUrl(platform, title, fullUrl);
    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (loading) return <Loader />;

  // ✅ Render Blog if found
  if (singleBlog) {
    const isMongo = !!singleBlog.blogTitle;

    // const [isClick, setIsClick] = useState<boolean>();

    return (
      <>
        <Header />

        <div className={styles.wrapper}>
          {/* Left Side Blog Content */}
          <div className={styles.leftSide}>
            <div className={styles.bannerImage}>
              <img
                src={
                  isMongo
                    ? `${staticAPI}/${
                       singleBlog.blogBanner.split("/images/")[1]
                     }`
                    : `/blogs/${singleBlog.blog_image}`
                }

                //  ? `${staticAPI}/${
                //           article.banner.split("/images/")[1]
                //         }`
                //       : `/blogs/${article.banner}`
                alt={isMongo ? singleBlog.blogTitle : singleBlog.title}
                className={styles.imgD}
              />
            </div>

            {/* Date + Category + Share */}
            <div className={styles.blogMeta}>
              <div>
                <span>
                  {new Date(
                    isMongo ? singleBlog.createdAt! : singleBlog.created_at!
                  ).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className={styles.category}>
                  {isMongo
                    ? singleBlog.blogCategoryId
                    : cats.find((id) => id.id === singleBlog.category_id)
                        ?.name || "Unknown Category"}
                </span>
              </div>
              <Share2
                className={styles.shareIcon}
                onClick={() => setShowModal(true)}
              />
            </div>

            {/* Blog Title */}
            <h1 className={styles.blogTitle}>
              {isMongo ? singleBlog.blogTitle : singleBlog.title}
            </h1>

            {/* Blog Content */}
            <div className={styles.contentBody}>
              {isMongo ? (
                singleBlog.blogBody?.map((page, idx) => (
                  <div key={idx}>
                    <h2>{page.metaTitle}</h2>
                    <img
                     src={
                  isMongo
                    ? `${staticAPI}/${
                       page.innerImg.split("/images/")[1]
                     }`
                    : `/static/${page.innerImg}`
                }
                      alt={`Inner ${idx}`}
                      className={styles.innerImg}
                    />}
                    <div className={styles.tableWrapper}>
                      {" "}
                      <div
                        className={styles.contentBody}
                        dangerouslySetInnerHTML={{
                          __html: page.metaDescription,
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.tableWrapper}>
                  <div
                    className={styles.contentBody}
                    dangerouslySetInnerHTML={{
                      __html: singleBlog.description!,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Tags */}
            <div className={styles.keywords}>
              {(isMongo ? singleBlog.metaKeywords : singleBlog.meta_keywords)
                ?.split(",")
                .map((word, idx) => (
                  <span style={{ cursor: "pointer" }} key={idx}>
                    {word.trim()}
                  </span>
                ))}
            </div>

            <div className="container py-4">
              <h1 className="mb-4 text-center text-lg-start">Latest Blogs</h1>

              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                {recentB && recentB.length > 0 ? (
                  recentB.map((data) => (
                    <div
                      className="col"
                      key={data._id}
                      onClick={() => handleSingleBlogs(data.blogSlug)}
                    >
                      <div
                        className="card h-100 border-0 shadow-sm"
                        style={{
                          borderRadius: "1rem",
                          overflow: "hidden",
                          background: "#fff",
                          transition: "transform 0.3s ease-in-out",
                        }}
                      >
                        {/* Image */}
                        <div className={styles.recentImgDiv}>
                          <Image
                            src={
                              data.blogBanner.includes("/images")
                                ? `/api/images${
                                    data.blogBanner.split("/images")[1]
                                  }`
                                : `/blogs/${data.blogBanner}`
                            }
                            alt={data.blogTitle}
                            fill
                            priority
                            className={styles.recentInnerImg}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.transform = "scale(1.05)")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.transform = "scale(1)")
                            }
                          />
                        </div>

                        {/* Content */}
                        <div className="card-body d-flex flex-column justify-content-between p-3">
                          {/* Title */}
                          <h5
                            className="card-title fw-semibold text-truncate"
                            title={data.blogTitle}
                          >
                            {data.blogTitle.split(/\s+/).slice(0, 12).join(" ")}
                          </h5>

                          {/* Description */}
                          {data.meta_description && (
                            <p
                              className="card-text text-muted small mt-2 mb-3"
                              dangerouslySetInnerHTML={{
                                __html:
                                  data.meta_description
                                    .split(/\s+/)
                                    .slice(0, 30)
                                    .join(" ") + "...",
                              }}
                            ></p>
                          )}

                          {/* Footer Buttons */}
                          <div className="d-flex justify-content-between align-items-center mt-auto">
                            {/* Date */}
                            <span className="d-flex align-items-center gap-1 text-muted small">
                              <CalendarDays size={16} />
                              <span>
                                {new Date(data.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </span>

                            {/* Share Button */}
                            <button
                              type="button"
                              className="btn d-flex align-items-center gap-1"
                              style={{
                                color: "#E5B05C",
                                // borderColor: "#E5B05C",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy2(
                                  data?.blogTitle?.split(" ").join("-")
                                );
                              }}
                            >
                              <Share2 size={16} />
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center">No Recent Blog Posted</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Side Panel */}
          <div className={styles.rightSide}>
            {/* Search Bar */}
            <div className={styles.searchWrap}>
              <Search />
              <input
                onChange={(e) => setSearchB(e.target.value)}
                type="text"
                placeholder="Search blogs..."
              />
            </div>

            {/* Search Results */}
            {searchB && (
              <div className={styles.searchResults}>
                {blogs.filter((blog) =>
                  blog.title.toLowerCase().includes(searchB.toLowerCase())
                ).length === 0 ? (
                  <p className={styles.noResultText}>
                    No matching blogs found.
                  </p>
                ) : (
                  blogs
                    .filter((blog) =>
                      blog.title.toLowerCase().includes(searchB.toLowerCase())
                    )
                    .map((blog, idx) => {
                      console.log(blog);

                      return (
                        <div
                          onClick={() => router.push(`/${blog.id}`)}
                          className={styles.resultCard}
                          key={`${blog.id}-${idx}`}
                        >
                          <img
                             src={
                  isMongo
                    ? `${staticAPI}/${
                       blog.banner.split("/images/")[1]
                     }`
                    : `/static/${blog.banner}`
                }
                            alt={blog.title}
                            title={blog.title}
                            loading="lazy"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/default-image.jpg";
                            }}
                            className={styles.resultCardImage}
                          />
                          <b className={styles.resultCardTitle}>{blog.title}</b>
                        </div>
                      );
                    })
                )}
              </div>
            )}
            {/* Blog Categories */}
            {/* {cats && ( */}
            <div className={styles.categories}>
              {cats &&
                // const isMG = data.id;
                cats.map((data) => {
                  return (
                    <div
                      onClick={() =>
                        router.push(
                          `/category/${
                            data.name?.toLowerCase().split(" ").join("-") ||
                            data.categorySlug
                          }`
                        )
                      }
                      key={data._id || data.id}
                      className={styles.categoryCard}
                    >
                      {data.categoryName || data.name}
                    </div>
                  );
                })}
            </div>

            {/* Related Blogs */}
            <div className={styles.relatedBlogs}>
              {latestRBlogs &&
                latestRBlogs.map((blog, idx) => {
                  return (
                    <div className={styles.resultCard} key={idx}>
                      <img
                        src={
                  isMongo
                    ? `${staticAPI}/${
                       blog.blogBanner.split("/images/")[1]
                     }`
                    : `/blogs/${blog.blog_image}`
                }
                        alt={isMongo ? blog.blogTitle : blog.title}
                      />
                      <b>{isMongo ? blog.blogTitle : blog.title}</b>
                    </div>
                  ))}
            </div>
            {/* )} */}
          </div>

          {/* Share Modal */}
          {showModal && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalBox}>
                <X
                  className={styles.modalClose}
                  onClick={() => setShowModal(false)}
                />
                <button
                  style={{
                    backgroundColor:
                      clickedPlatform === "copy" ? "yellowgreen" : undefined,
                    color: clickedPlatform === "copy" ? "white" : undefined,
                    fontWeight: clickedPlatform === "copy" ? "bold" : undefined,
                  }}
                  onClick={() => handleCopy("copy")}
                >
                  <Copy /> Copy URL
                </button>
                <button
                  style={{
                    backgroundColor:
                      clickedPlatform === "facebook"
                        ? "yellowgreen"
                        : undefined,
                    color: clickedPlatform === "facebook" ? "white" : undefined,
                    fontWeight:
                      clickedPlatform === "facebook" ? "bold" : undefined,
                  }}
                  onClick={() => handleCopy("facebook")}
                >
                  <Facebook /> Facebook
                </button>
                <button
                  style={{
                    backgroundColor:
                      clickedPlatform === "twitter" ? "yellowgreen" : undefined,
                    color: clickedPlatform === "twitter" ? "white" : undefined,
                    fontWeight:
                      clickedPlatform === "twitter" ? "bold" : undefined,
                  }}
                  onClick={() => handleCopy("twitter")}
                >
                  <Twitter /> X
                </button>
                <button
                  style={{
                    backgroundColor:
                      clickedPlatform === "linkedin"
                        ? "yellowgreen"
                        : undefined,
                    color: clickedPlatform === "linkedin" ? "white" : undefined,
                    fontWeight:
                      clickedPlatform === "linkedin" ? "bold" : undefined,
                  }}
                  onClick={() => handleCopy("linkedin")}
                >
                  <Linkedin /> LinkedIn
                </button>
                <button
                  style={{
                    backgroundColor:
                      clickedPlatform === "whatsapp"
                        ? "yellowgreen"
                        : undefined,
                    color: clickedPlatform === "whatsapp" ? "white" : undefined,
                    fontWeight:
                      clickedPlatform === "whatsapp" ? "bold" : undefined,
                  }}
                  onClick={() => handleCopy("whatsapp")}
                >
                  <ExternalLink /> WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </>
    );
  }

  // ✅ Else render service_third content
  return (
    <>
      <Header />
      {head && <ServiceThirdHero heading={head} />}
      <ServiceThirdQuality cardData={cardData} />
      <ServiceThirdColorMarque />
      <ServiceThirdAward />
      <ServiceMainTestimonial />
      <ProjectSwiper />
      <Form />
      <ServiceThirdSlowMarque />
      <ServiceEndTag endtag={endTag} />
      <Footer />
    </>
  );
};

export default DetailPage;
