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

import { useParams, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
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
  // Loader2,
} from "lucide-react";
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
  // const [searchedBlog, setSearchedBlog] = useState<boolean>(false);
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
          console.log("URL copied to clipboard!");
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
                    ? `/static/${singleBlog.blogBanner}`
                    : `/blogs/${singleBlog.blog_image}`
                }
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
                      src={`/static/${page.innerImg}`}
                      alt={`Inner ${idx}`}
                      className={styles.innerImg}
                    />
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

            {/* <button
              onClick={() => {
                if (singleBlog?.blogCategoryId) {
                  readMorRelated(singleBlog.blogCategoryId);
                }
              }}
              className={styles.readMore}
            >
              Read More Related Blogs
            </button> */}
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
                      // console.log(blog);

                      return (
                        <div
                          onClick={() => router.push(`/${blog.id}`)}
                          className={styles.resultCard}
                          key={`${blog.id}-${idx}`}
                        >
                          <img
                            src={
                              blog.banner.includes("/images")
                                ? `/static/${blog.banner}`
                                : `/blogs/${blog.banner}`
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
            {/* )} */}

            {/* Related Blogs */}
            {/* {searchedBlog && ( */}
            <div className={styles.relatedBlogs}>
              {latestRBlogs &&
                latestRBlogs.map((blog, idx) => {
                  return (
                    <div className={styles.resultCard} key={idx}>
                      <img
                        src={
                          isMongo
                            ? `/static/${blog.blogBanner}`
                            : `/blogs/${blog.blog_image}`
                        }
                        alt={isMongo ? blog.blogTitle : blog.title}
                      />
                      <b>{isMongo ? blog.blogTitle : blog.title}</b>
                    </div>
                  );
                })}
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
