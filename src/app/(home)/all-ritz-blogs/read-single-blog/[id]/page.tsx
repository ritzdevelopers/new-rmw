"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { CalendarDays } from "lucide-react";
// import gsap from "gsap";
import styles from "./page.module.css";

interface BlogBody {
  metaTitle: string;
  metaDescription: string;
  innerImg?: string;
}

interface BlogInfo {
  blogTitle: string;
  blogBanner: string;
  blogBody: BlogBody[];
  createdAt: string;
}

const BlogPage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const [blogInfo, setSingleBlog] = useState<BlogInfo | null>(null);
  const articleRef = useRef(null);

  useEffect(() => {
    if (id) fetchSingleBlog();
  }, [id]);



  const fetchSingleBlog = async () => {
    try {
      const res = await axios.get<{ blog: BlogInfo }>(
        `http://localhost:3000/api/ritz_blogs/get-single-blog/${id}`
      );
      setSingleBlog(res.data.blog);
    } catch (error) {
      console.error("Error fetching single blog:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      {!blogInfo ? (
        <p className={styles.loadingText}>Loading your blog...</p>
      ) : (
        <article ref={articleRef} className={styles.article}>
          {/* Header */}
          <header className={styles.blogHeader}>
            <img
              src={blogInfo.blogBanner}
              alt="Blog banner"
              className={styles.blogBanner}
            />
            <h1 className={styles.blogTitle}>{blogInfo.blogTitle}</h1>
            <p className={styles.publishedDate}>
              <CalendarDays
                size={16}
                style={{ marginRight: 6, display: "inline-block" }}
              />
              Published on {new Date(blogInfo.createdAt).toLocaleDateString()}
            </p>
            <hr className={styles.hr} />
          </header>
          {/* Blog Sections */}
          {blogInfo.blogBody.map((section, idx) => (
            <section key={idx} className={styles.blogSection}>
              <h2 className={styles.metaTitle}>{section.metaTitle}</h2>

              <div
                className={styles.metaDescription}
                dangerouslySetInnerHTML={{ __html: section.metaDescription }}
              />

              {section.innerImg && (
                <img
                  src={section.innerImg}
                  alt={`Section image ${idx + 1}`}
                  className={styles.innerImg}
                />
              )}
            </section>
          ))}
        </article>
      )}
    </div>
  );
};

export default BlogPage;
