"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import gsap from "gsap";
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

const Page: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { slug } = useParams() as { slug: string };
  // const newSl = slug;
  const [loading, setLoading] = useState(true);

  const [singleBlog, setSingleBlog] = useState<Blog | null>(null);
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [head, setHead] = useState<string | null>(null);
  const [endTag, setEndTag] = useState<string | null>(null);
  const [latestRBlogs, setLatestRBlogs] = useState<Blog[]>([]);

  const getSingleBlog = async () => {
      try {
        const cleanSlug = slug?.replace(/\.html$/, "");

        // Step 1: Try resolving from MySQL
        const response = await axios.get(`/api/resolve/${cleanSlug}`);

        if (response?.data?.type === "blog") {
          setSingleBlog(response.data.blog);
        } else if (response?.data?.type === "service") {
          const { secondLayer, thirdLayer } = response.data;

          const serviceResponse = await axios.get(
            `/api/services/${secondLayer}/${thirdLayer}`
          );

          setCardData(serviceResponse.data.cards || []);
          setHead(serviceResponse.data.s3heading1 || null);
          setEndTag(serviceResponse.data.s3endtag || null);
        } else {
          // If no `type` found in response, assume fallback to MongoDB
          throw new Error("Not a blog or service, fallback to MongoDB");
        }
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        // If MySQL API fails (404 or anything), fallback to MongoDB
        try {
          const cleanSlug = slug?.replace(/\.html$/, "");
          const res = await axios.get(
            `/api/ritz_blogs/get-single-blog/${cleanSlug}`
          );
          console.log("====================================");
          setLatestRBlogs(res.data.latestRBlogs);
          console.log("====================================");
          setSingleBlog(res.data.blog);
          // alert("Fetched from MongoDB!");
        } catch (err) {
          console.error("Fallback MongoDB fetch failed:", err);
        }
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (slug) getSingleBlog();
  }, [slug]);

  useEffect(() => {
    if (metaRef.current && activeMeta !== null) {
      gsap.fromTo(
        metaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeMeta]);
  // ✅ Render Blog if found
  if (singleBlog) {
    const isMongo = !!singleBlog.blogTitle;

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
                  {isMongo ? singleBlog.blogCategoryId : "Uncategorized"}
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
                  <span key={idx}>{word.trim()}</span>
                ))}
            </div>

            <button className={styles.readMore}>Read More Related Blogs</button>
          </div>

          {/* Right Side Panel */}
          <div className={styles.rightSide}>
            {/* Search Bar */}
            <div className={styles.searchWrap}>
              <Search />
              <input type="text" placeholder="Search blogs..." />
            </div>

            {/* Search Results */}
            <div className={styles.searchResults}>
              <div className={styles.resultCard}>
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
            </div>

            {/* Blog Categories */}
            <div className={styles.categories}>
              <div className={styles.categoryCard}>Technology</div>
              <div className={styles.categoryCard}>Design</div>
              <div className={styles.categoryCard}>Marketing</div>
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
          </div>

          {/* Share Modal */}
          {showModal && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalBox}>
                <X
                  className={styles.modalClose}
                  onClick={() => setShowModal(false)}
                />
                <button>
                  <Copy /> Copy URL
                </button>
                <button>
                  <Facebook /> Facebook
                </button>
                <button>
                  <Twitter /> X
                </button>
                <button>
                  <Linkedin /> LinkedIn
                </button>
                <button>
                  <ExternalLink /> WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>

        {singleBlog.blogBody && (
          <div className={styles.metaTitles}>
            <h3>Blog Sections</h3>
            <ul>
              {singleBlog.blogBody.map((section, index) => (
                <li
                  key={index}
                  className={styles.metaTitleItem}
                  onClick={() => setActiveMeta(index)}
                >
                  {section.pageTitle || `Section ${index + 1}`}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.latestBlogs}>
          <h3>Latest Blogs</h3>
          <div className={styles.latestBlogCard}>
            <img
              src="/images/1752051887399-cover.jpg"
              alt="Latest Blog"
              className={styles.latestImage}
            />
            <p>This is testing 1 for mongo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
