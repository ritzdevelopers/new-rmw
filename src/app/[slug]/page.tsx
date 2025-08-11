export const dynamic = "force-dynamic";
import React from "react";
import DetailPage from "./DetailPage";
import { Metadata } from "next";
import axios from "axios";

interface Article {
  _id: string;
  blogBanner: string;
  blogTitle: string;
  createdAt: string;
  meta_description: string;
  blogDescription: string;
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

function stripHtmlTags(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, " ")         // remove HTML tags
    .replace(/\s+/g, " ")             // normalize whitespace
    .replace(/&nbsp;/g, " ")          // decode &nbsp;
    .replace(/&[#A-Za-z0-9]+;/g, "")  // remove other entities
    .trim();
}

function getCleanDescription(input: string, maxWords: number = 160): string {
  return stripHtmlTags(input).split(/\s+/).slice(0, maxWords).join(" ");
}

interface Blog {
  id?: string | number;
  title?: string;
  banner?: string;
  createdAt?: string;
  meta_description?: string;
  description?: string;
  blog_image?: string;
  blogBanner?: string;
  blogTitle?: string;
  blogDescription?: string;
  meta_title?: string;
  meta_keywords?: string;
  metaKeywords?: string;
  blogBody?: {
    metaTitle?: string;
    metaDescription?: string;
    innerImg?: string;
  }[];
}

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const baseURL = process.env.NEXT_PUBLIC_SERVER_IMG_PATH;
  let blog: Blog | null = null;
  let isMongo = false;

  try {
    // Try MySQL
    try {
      const mysqlRes = await axios.get(`${baseURL}/api/resolve/${slug}`);
      if (mysqlRes?.data?.blog) {
        blog = mysqlRes.data.blog;
      }
    } catch {
      // Fallback to MongoDB
      try {
        const mongoRes = await axios.get(
          `${baseURL}/api/ritz_blogs/get-single-blog/${slug}`
        );
        if (mongoRes?.data?.blog) {
          blog = normalizeArticle(mongoRes.data.blog);
          isMongo = true;
        }
      } catch (err) {
        console.error("MongoDB fetch failed:", err);
      }
    }

    if (!blog) {
      return {
        title: "Blog Not Found",
        description: "This blog post does not exist or has been deleted.",
      };
    }

    // Prepare Metadata
    const title =
      blog.meta_title || blog.title || blog.blogTitle || "Untitled Blog";
    const keywords =
      blog.meta_keywords || blog.metaKeywords || "ritz media";

    const baseDescription = getCleanDescription(
      blog.description || blog.blogDescription || "",
      160
    );

    let dsc = "";
    if (isMongo && Array.isArray(blog.blogBody)) {
      dsc = blog.blogBody
        .map((item) => getCleanDescription(item?.metaDescription || ""))
        .join(" ")
        .split(/\s+/)
        .slice(0, 160)
        .join(" ");
    }

    const ogDescription = (isMongo && dsc) || baseDescription;

    return {
      title,
      description: blog.meta_description
        ? getCleanDescription(blog.meta_description, 160)
        : baseDescription,
      keywords: keywords.split(",").map((k: string) => k.trim()),
      openGraph: {
        title,
        description: ogDescription,
        type: "article",
        url: `${baseURL}/blog/${slug}`,
        images: [
          {
            url: `${baseURL}/uploads/${blog.blog_image || blog.blogBanner}`,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: ogDescription,
        images: [`${baseURL}/uploads/${blog.blog_image || blog.blogBanner}`],
      },
    };
  } catch (err) {
    console.error("Metadata generation error:", err);
    return {
      title: "Error Loading Blog",
      description: "There was an issue generating metadata for this blog.",
    };
  }
}

function page() {
  return <DetailPage />;
}

export default page;