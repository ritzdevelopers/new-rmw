"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { FiFileText } from "react-icons/fi";
import styles from "../../sections/page.module.css";
import LoadingLinesAndDots from "@/components/ui/LoadingLinesAndDots";

interface Blog {
    title: string;
    slug: string;
    meta_description: string;
    meta_keywords: string;
    created_at: string;
    banner: string;
    description: string;
}

interface RelatedBlog {
    title: string;
    slug: string;
    created_at: string;
    banner: string;
}
function Section2({ slug, category, blog, all_categories, related_blogs, all_blogs }: { slug: string, category: string, blog: any, all_categories: any, related_blogs: any, all_blogs: any }) {

    const [formattedBlog, setFormattedBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [keywords, setKeywords] = useState<string[]>([]);
    function formatBlog(blog: any): Blog {
        return {
            title: blog.title || blog.blogTitle,
            slug: blog.slug || blog.blogSlug,
            meta_description: blog.meta_description || blog.mtDesc,
            meta_keywords: blog.meta_keywords || blog.metaKeywords,
            created_at: blog.created_at || blog.createdAt,
            banner: blog.banner || blog.blogBanner || blog.blog_image,
            description: blog.description || blog.blogDescription,
        }
    }

    const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([]);
    function formateRelatedBlogs(related_blogs: any[]): RelatedBlog[] {
        return related_blogs.map((blog: any) => ({
            title: blog.title || blog.blogTitle,
            slug: blog.slug || blog.blogSlug,
            created_at: blog.created_at || blog.createdAt,
            banner: blog.banner || blog.blogBanner || blog.blog_image,
        }));
    }


    useEffect(()=>{
        if (related_blogs) {
            const formatted = formateRelatedBlogs(related_blogs);
            setRelatedBlogs(formatted);
        }
    }, [related_blogs]);
    useEffect(() => {
        if (blog) {
            setLoading(true);
            setFormattedBlog(formatBlog(blog));
            setKeywords((blog.meta_keywords || blog.metaKeywords || "").split(','));
            const id = setTimeout(() => setLoading(false), 0);
            return () => clearTimeout(id);
        } else {
            setFormattedBlog(null);
            setKeywords([]);
            setLoading(false);
        }
    }, [blog]);

    const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    useEffect(() => {
        const list = all_blogs ?? [];
        const filtered = list.filter((blog: any) => (blog?.title ?? "").toLowerCase().includes((searchValue ?? "").toLowerCase()));
        setFilteredBlogs(filtered.slice(0, 5));
    }, [searchValue, all_blogs]);

    console.log("related_blogs", related_blogs);


    if (!blog) {
        return (
            <section className="w-full pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-[70px] flex justify-center items-center">
                <div className={`w-full flex flex-col items-center justify-center min-h-[280px] py-16 px-6 text-center ${styles.containerWidth}`}>
                    <div className="w-16 h-16 rounded-2xl bg-[#E8EBFF] flex items-center justify-center mb-5">
                        <FiFileText className="w-8 h-8 text-[#0F1640]/60" aria-hidden />
                    </div>
                    <h3 className="font-semibold text-[#0F1640] text-lg sm:text-xl mb-2">
                        Blog not found
                    </h3>
                    <p className="text-[#0F1640]/70 text-sm sm:text-base max-w-sm">
                        The blog you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-[70px] flex justify-center items-center ">
            {/* Centered Align Container  */}
            {loading ? (
                <div className="w-full flex justify-center items-center min-h-[280px] py-16 px-6 text-center">
                    <LoadingLinesAndDots className="text-[#0F1640]" />
                </div>
            ) : (
                <div className={`w-full  relative flex flex-col lg:flex-row xl:justify-between xl:items-start gap-8 sm:gap-10 lg:gap-12 xl:gap-14 ${styles.containerWidth}`}>

                    {/* Left Side Container  */}
                    <div className="w-full lg:w-[calc(100%-291px)] xl:w-[calc(100%-391px)] xl:min-w-0 flex flex-col gap-6 sm:gap-7 lg:gap-8">
                        {/* Top Row  */}
                        <div className="w-full flex flex-col gap-3 sm:gap-4 pb-4 border-b border-[#D9D9D9]">
                            <div className="w-full relative h-[220px] sm:h-[280px] md:h-[360px] lg:h-[420px] xl:h-[480px] overflow-hidden rounded-[5px]">
                                <Image src={formattedBlog?.banner?.includes("/images")
                                    ? `https://ritzmediaworld.com/api/images${formattedBlog.banner.split("/images")[1]}`
                                    : `https://ritzmediaworld.com/blogs/${formattedBlog?.banner}`
                                } alt="Blog Image" fill className="w-full h-full" />
                            </div>

                            <div className="flex gap-3 sm:gap-4 w-full items-center flex-wrap">
                                <p className={`font-[400] text-[14px] sm:text-[15px] xl:text-[16px] ${styles.fontopensans}`}>{new Date(formattedBlog?.created_at || "").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                                <div className="w-[5px] h-[5px] bg-[#0F1640] rounded-full"></div>
                                <p className={`font-[400] text-[12px] sm:text-[13px] xl:text-[14px] ${styles.fontopensans}`}>{category.split('"').join('') || "Case Study"}</p>
                            </div>
                        </div>

                        {/* Bottom Row  */}
                        <div className="[&_table]:w-full [&_th]:border [&_th]:border-[#ccc] [&_th]:p-2.5 [&_td]:border [&_td]:border-[#ccc] [&_td]:p-2.5 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_h1]:text-2xl sm:[&_h1]:text-3xl [&_h2]:text-xl sm:[&_h2]:text-2xl overflow-x-auto" dangerouslySetInnerHTML={{ __html: formattedBlog?.description || "" }} />
                    </div>

                    {/* Right Side Container  */}
                    <div className="w-full lg:max-w-[291px] xl:max-w-[391px] xl:w-full lg:sticky lg:top-28 flex flex-col gap-8 sm:gap-10 lg:gap-12 xl:gap-14 shrink-0">
                        {/* Row 1 */}
                        <div className="w-full bg-[#F5F5F5] rounded-[8px] xl:rounded-[10px] flex flex-col justify-center items-center text-center gap-3 sm:gap-4 py-5 sm:py-6 xl:py-8 px-3 sm:px-4">
                            <p className={`font-[600] text-[16px] sm:text-[18px] xl:text-[20px] ${styles.fontmontserrat}`}>Search</p>
                            <div className="w-full h-[1px] bg-[#E5E4E3]"></div>
                            <div className="w-full bg-white h-[42px] xl:h-[46px] border border-[#ffffff] rounded-full flex items-center gap-3 px-3 focus-within:border-[#0F1640]/40 focus-within:ring-2 focus-within:ring-[#0F1640]/10 transition-shadow">
                                <CiSearch className="w-[20px] h-[20px] xl:w-[22px] xl:h-[22px] text-[#484848] shrink-0" />
                                <input
                                    type="text"
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    placeholder="Search blogs ..."
                                    className="flex-1 h-full outline-none bg-transparent text-[13px] xl:text-[14px] font-[400] text-[#484848] placeholder:text-[#484848]"
                                />
                            </div>
                            {
                                searchValue && filteredBlogs && filteredBlogs.length > 0 && filteredBlogs.map((blog: Blog, idx: number) => {
                                    return (
                                        <div onClick={() => window.open(`/blogs2/${blog.slug}`, "_blank")} key={idx} className="w-full flex gap-3 sm:gap-4 justify-start items-start cursor-pointer rounded-lg p-2 -m-2 hover:bg-gray-50/80 transition-colors duration-200 group">
                                            {/* Left Side Image Container  */}
                                            <div className="w-[80px] h-[52px] sm:w-[92px] sm:h-[60px] xl:w-[108px] xl:h-[69px] relative rounded-[2px] overflow-hidden shrink-0 group-hover:opacity-95 transition-opacity">
                                                <Image src={(blog?.banner ?? "").includes("/images")
                                                    ? `https://ritzmediaworld.com/api/images${(blog?.banner ?? "").split("/images")[1]}`
                                                    : blog?.banner ? `https://ritzmediaworld.com/blogs/${blog.banner}` : "/inner-demo-img.jpg"
                                                } alt="Blog Image" fill className="object-cover w-full h-full" />
                                            </div>

                                            {/* Right Side Image Container  */}
                                            <div className="flex flex-col gap-1 sm:gap-2 justify-center text-left items-start min-w-0 flex-1">
                                                <h3 className={`font-[600] text-[13px] sm:text-[14px] xl:text-[16px] text-[#000000] ${styles.fontopensans} line-clamp-2 hover:underline cursor-pointer group-hover:text-[#0F1640] transition-colors`}>{blog.title}</h3>
                                                <p className={`font-[400] text-[11px] sm:text-[12px] text-[#535353] ${styles.fontopensans}`}>{new Date(blog.created_at || "").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {/* Row 2 */}
                        <div className="w-full rounded-[8px] xl:rounded-[10px] relative border border-[#E3E0E0] pt-0">
                            {/* Abs Div  */}
                            <div className="w-[140px] sm:w-[170px] bg-white flex justify-center items-center text-center absolute -top-5 xl:-top-6 left-[50%] translate-x-[-50%]">
                                <p className={`font-[600] text-[16px] sm:text-[18px] xl:text-[20px] ${styles.fontmontserrat}`}>Categories</p>
                            </div>

                            <div className="w-full flex flex-col gap-3 sm:gap-4 p-5 sm:p-7 xl:p-10">
                                {/* Card 1  */}
                                {
                                    all_categories && all_categories.length > 0 && all_categories.map((category: any, idx: number) => {
                                        return [...(category?.mongo_categories ?? []), ...(category?.mysql_categories ?? [])].map((cat: any, idx: number) => {
                                            return (
                                                <div onClick={() => window.open(`/category2/${cat.link}`, "_blank")} key={idx} className="w-full flex justify-between pb-4 border-b border-[#F0F0F0] cursor-pointer rounded px-2 py-1 -mx-2 -my-1 hover:bg-gray-50/80 transition-colors duration-200">
                                                    {/* Left Side div  */}
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-[7px] h-[7px] rounded-full border border-[#5E5E5E]"></div>
                                                        <h3 className="font-[400] text-[12px] sm:text-[13px] xl:text-[14px] text-[#484848]">{cat.name}</h3>
                                                    </div>

                                                    {/* Right  Side Div  */}
                                                    <div>
                                                        <p className="font-[400] text-[12px] sm:text-[13px] xl:text-[14px] text-[#969696]">({cat.total_blogs})</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    })
                                }
                            </div>
                        </div>

                        {/* Row 3 */}
                        <div className="w-full rounded-[8px] xl:rounded-[10px] relative border border-[#E3E0E0] pt-0">
                            {/* Abs Div  */}
                            <div className="w-[100px] sm:w-[140px] xl:w-[170px] bg-white flex justify-center items-center text-center absolute -top-5 xl:-top-6 left-[50%] translate-x-[-50%]">
                                <p className={`font-[600] text-[16px] sm:text-[18px] xl:text-[20px] ${styles.fontmontserrat}`}>Tags</p>
                            </div>

                            <div className="w-full flex flex-wrap gap-2 sm:gap-3 xl:gap-4 p-4 sm:p-5 xl:p-7">
                                {
                                    keywords && keywords.length > 0 && keywords.map((keyword: string, idx: number) => {
                                        return keyword && keyword.trim() !== "" && <div
                                            onClick={() => {
                                                let keywordSlug = keyword.toLowerCase().trim().replace(/ /g, "-");
                                                window.open(`/tags2/${keywordSlug}`, "_blank");
                                            }}
                                            key={idx} className="px-4 sm:px-5 xl:px-5 py-1.5 sm:py-2 rounded-[50px] flex justify-center items-center text-center border-[1px] border-[#F0F0F0] cursor-pointer hover:border-[#0F1640]/40 hover:bg-[#0F1640]/5 transition-colors duration-200">
                                            <p className="font-[400] text-[12px] sm:text-[13px] xl:text-[14px] text-[#484848]">{keyword}</p>
                                        </div>
                                    })
                                }
                            </div>
                        </div>

                        {/* Row 4 */}
                        <div className="w-full rounded-[8px] xl:rounded-[10px] relative border border-[#E3E0E0] pt-0">
                            {/* Abs Div  */}
                            <div className="w-[140px] sm:w-[170px] bg-white flex justify-center items-center text-center absolute -top-5 xl:-top-6 left-[50%] translate-x-[-50%]">
                                <p className={`font-[600] text-[16px] sm:text-[18px] xl:text-[20px] ${styles.fontmontserrat}`}>Related Blogs</p>
                            </div>

                            <div className="w-full flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 xl:p-7">
                                {
                                    relatedBlogs && relatedBlogs.length > 0 && relatedBlogs.map((blog: RelatedBlog, idx: number) => {
                                        return (
                                            <div key={idx} className="w-full flex gap-3 sm:gap-4 justify-start items-start cursor-pointer rounded-lg p-2 -m-2 hover:bg-gray-50/80 transition-colors duration-200 group">
                                                {/* Left Side Image Container  */}
                                                <div className="w-[80px] h-[52px] sm:w-[92px] sm:h-[60px] xl:w-[108px] xl:h-[69px] relative rounded-[2px] overflow-hidden shrink-0 group-hover:opacity-95 transition-opacity">
                                                    <Image priority={false} loading="lazy"
                                                        quality={75}
                                                            src={blog?.banner?.includes("/images")
                                                            ? `https://ritzmediaworld.com/api/images${blog?.banner?.split("/images")[1]}`
                                                            : `https://ritzmediaworld.com/blogs/${blog?.banner}`
                                                        } alt="Blog Image" fill className="object-cover w-full h-full" />
                                                </div>

                                                {/* Right Side Image Container  */}
                                                <div className="flex flex-col gap-1 sm:gap-2 justify-center items-start min-w-0 flex-1">
                                                    <h3 className={`font-[600] text-[13px] sm:text-[14px] xl:text-[16px] text-[#000000] ${styles.fontopensans} line-clamp-2 group-hover:text-[#0F1640] transition-colors`}>{blog.title}</h3>
                                                    <p className={`font-[400] text-[11px] sm:text-[12px] text-[#535353] ${styles.fontopensans}`}>{new Date(blog.created_at || "").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Section2;