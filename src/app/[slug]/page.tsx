"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import gsap from "gsap";
import styles from "./page.module.css";
import { Sun, Moon } from "lucide-react";

export interface Blog {
  _id?: string;
  blogTitle?: string;
  blogSlug?: string;
  blogStatus?: string | null;
  blogDescription?: string;
  blogBanner?: string;
  blogBody?: {
    pageTitle?: string;
    pageContent?: string;
  }[];
  blogCategoryId?: string;
  metaKeywords?: string;
  title?: string;
  slug?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  blog_image?: string;
  description?: string;
  created_at?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

const Page: React.FC = () => {
  const params = useParams();
  const { slug } = params as { slug: string };
  const [singleBlog, setSingleBlog] = useState<Blog | null>(null);
  const [activeMeta, setActiveMeta] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const metaRef = useRef<HTMLDivElement>(null);

  const getSingleBlog = async () => {
      try {
        let response;
      try {
        response = await axios.get(`/api/blog/${slug}`);
          } catch {
        response = await axios.get(`/api/ritz_blogs/get-single-blog/${slug}`);
      }
      setSingleBlog(response?.data.blog);
      } catch (error) {
      console.error("Error fetching blog: ", error);
      alert("Internal Server Error!");
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

  if (!singleBlog) {
    return <div className={styles.loading}>Loading blog...</div>;
  }

  return (
    <div className={`${styles.blogWrapper} ${darkMode ? styles.dark : styles.light}`}>
      <div className={styles.themeToggle} onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </div>

      <div className={styles.leftContent}>
        <img
         src={singleBlog.blogBanner ? `/static/${singleBlog.blogBanner}` : `/blogs/${singleBlog.blog_image}`}
          alt={singleBlog.blogTitle}
          className={styles.blogBanner}
        />

        <h1 className={styles.blogTitle}>{singleBlog.blogTitle}</h1>
        <p className={styles.blogDate}>
          {new Date(
            singleBlog.createdAt || singleBlog.created_at || ""
          ).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div
          className={styles.blogDescription}
          dangerouslySetInnerHTML={{
            __html: singleBlog.blogDescription || singleBlog.description || "",
          }}
        />

        {activeMeta !== null && singleBlog.blogBody?.[activeMeta]?.pageContent && (
          <div ref={metaRef} className={styles.metaContent}>
            <div
              dangerouslySetInnerHTML={{
                __html: singleBlog.blogBody[activeMeta].pageContent || "",
              }}
            />
          </div>
        )}

        <div className={styles.tags}>
          {singleBlog.metaKeywords?.split(",").map((tag, i) => (
            <span key={i} className={styles.tag}>#{tag.trim()}</span>
          ))}
        </div>
      </div>

      <div className={styles.rightSidebar}>
        <input className={styles.searchBar} placeholder="Search blog..." />

        <div className={styles.categories}>
          <h3>Categories</h3>
          <ul>
            <li>Creative Services</li>
            <li>Digital Marketing</li>
            <li>Web Development</li>
          </ul>
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
