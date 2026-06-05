import React from "react";
import type { Metadata } from "next";
import BlogInner from "@/components/blogs/inner/BlogInner";
import { get_single_blog } from "@/app/api/get_all_blogs/[slug]/route";
import { GET_ALL_BLOGS } from "@/app/api/get_all_blogs/route";
import { toPlainObject } from "@/lib/toPlainObject";

type BlogLayoutData = { blog: any; categoryName: string; all_categories: any; latest_3_blogs: any; related_blogs: any };

const SITE_ORIGIN = "https://ritzmediaworld.com";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const canonicalUrl = `${SITE_ORIGIN}/${slug}`;
    const result = await get_single_blog(slug);
    const data: BlogLayoutData | null = Array.isArray(result) && (result[1] as { status?: number })?.status === 200
        ? (result[0] as BlogLayoutData)
        : null;
    const blog = data?.blog;
    const title = blog?.title ?? blog?.blogTitle ?? "Blog";
    const meta_description = blog?.meta_description ?? blog?.mtDesc ?? "";
    const meta_keywords = blog?.meta_keywords ?? blog?.metaKeywords ?? "";
    const keywords = (typeof meta_keywords === "string" ? meta_keywords.split(",").map((k: string) => k.trim()).filter(Boolean) : []) as string[];

    return {
        title,
        description: meta_description || undefined,
        keywords: keywords.length > 0 ? keywords : undefined,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description: meta_description || undefined,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: meta_description || undefined,
        },
    };
}

async function BlogPageContent({ slug }: { slug: string }) {
    const result = await get_single_blog(slug);
    const data: BlogLayoutData | null = Array.isArray(result) && (result[1] as { status?: number })?.status === 200
        ? (result[0] as BlogLayoutData)
        : null;
    const { blog, categoryName, all_categories, latest_3_blogs, related_blogs } = data ?? { blog: null, categoryName: "", all_categories: null, latest_3_blogs: null, related_blogs: null };
    const all_blogs = await GET_ALL_BLOGS();

    return (
        <BlogInner
            slug={slug}
            category={categoryName}
            blog={toPlainObject(blog)}
            categoryName={categoryName}
            all_categories={toPlainObject(all_categories)}
            latest_3_blogs={toPlainObject(latest_3_blogs)}
            related_blogs={toPlainObject(related_blogs)}
            all_blogs={toPlainObject(all_blogs?.data ?? null)}
        />
    );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <BlogPageContent slug={slug} />;
}
