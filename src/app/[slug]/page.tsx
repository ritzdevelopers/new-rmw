"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./page.module.css";

interface Blog {
  id: number;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  blog_image: string;
  description: string;
  created_at: string;
  status: string;
}

const Page: React.FC = () => {
  const params = useParams();
  const { slug } = params as { slug: string };
  const [singleBlog, setSingleBlog] = useState<Blog | null>(null);

  const getSingleBlog = async () => {
    try {
      const response = await axios.get(`/api/blog/${slug}`);
      setSingleBlog(response.data.blog);
    } catch (error) {
      console.error("Error fetching blog: ", error);
      alert("Internal Server Error!");
    }
  };

  useEffect(() => {
    if (slug) getSingleBlog();
  }, [slug]);

  if (!singleBlog) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>Loading blog...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          src={`/blogs/${singleBlog.blog_image}`}
          alt={singleBlog.title}
          className={styles.image}
        />

        <div className={styles.content}>
          <h1 className={styles.title}>{singleBlog.title}</h1>
          <p className={styles.date}>
            Published on:
            {new Date(singleBlog.created_at).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: singleBlog.description }}
          />

          <div className={styles.tags}>
            {singleBlog.meta_keywords?.split(",").map((keyword, index) => (
              <span key={index} className={styles.tag}>
                #{keyword.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
