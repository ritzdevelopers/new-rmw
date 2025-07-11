export const dynamic = "force-dynamic";
import React from "react";
import DetailPage from "./DetailPage";
import { Metadata } from "next";
import axios from "axios";
// import { stripHtml } from "../../utils/stripHtml"
interface Article {
  _id: string;
  blogBanner: string;
  blogTitle: string;
  createdAt: string;
  meta_description: string;
  blogDescription: string;
}

// interface Article2 {
//   slug: string;
//   blog_image: string;
//   title: string;
//   created_at: string;
//   meta_description: string;
// }

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

// const normalizeArticle2 = (blog: Article2): MergedBlogs => ({
//   id: blog.slug,
//   banner: blog.blog_image,
//   title: blog.title,
//   createdAt: blog.created_at,
//   meta_description: blog.meta_description,
// });
function stripHtmlTags(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, " ") // remove tags
    .replace(/\s+/g, " ") // normalize whitespace
    .replace(/&nbsp;/g, " ") // decode common entity
    .replace(/&[#A-Za-z0-9]+;/g, "") // remove other entities
    .trim();
}
interface Blog {
  // Shared
  id?: string | number;
  title?: string;
  banner?: string;
  createdAt?: string;
  meta_description?: string;
  description?: string;
  blog_image?: string;
  blogBanner?: string;
  blogTitle?: string;
  blogDescription?: string; // Meta

  meta_title?: string;
  meta_keywords?: string;
  metaKeywords?: string; // MongoDB-specific

  blogBody?: {
    metaTitle?: string;
    metaDescription?: string;
    innerImg?: string;
  }[];
}

// Types (customize if needed)
type Props = {
  params: {
    slug: string;
  };
};

// Safe HTML stripper (better than regex-only)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const baseURL = "http://localhost:3000"; // Or process.env.API_BASE_URL

  try {
    let blog: Blog | null = null;

    let isMongo = false;

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
    // Title & Keywords
    const title =
      blog.meta_title || blog.title || blog.blogTitle || "Untitled Blog";
    const keywords = blog.meta_keywords || blog.metaKeywords || "";

    // Description (cleaned)
    const baseDescription = stripHtmlTags(
      blog.description || blog.blogDescription || ""
    );

    // Mongo: Combine all page-level metaDescriptions
    let dsc = "";
    if (isMongo && Array.isArray(blog.blogBody)) {
      dsc = blog.blogBody
        .map((item) => stripHtmlTags(item?.metaDescription || ""))
        .join(" ")
        .trim();
    }

    console.log("====================================");
    console.log("this is base desc ", baseDescription);
    console.log("====================================");

    const ogDescription = (isMongo && dsc) || baseDescription;

    return {
      title,
      description: blog.meta_description || baseDescription,
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
  return (
    <>
      <DetailPage />
    </>
  );
}

export default page;
