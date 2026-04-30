"use client";
import { CiSearch } from "react-icons/ci";
import S2Card from "./cards/S2Card";
import LoadingLinesAndDots from "@/components/ui/LoadingLinesAndDots";
import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiFileText } from "react-icons/fi";

function Section2({ all_blogs }: { all_blogs: any[] }) {
    const [page, setPage] = useState<number>(0);
    const [loadingState, setLoadingState] = useState<boolean>(true);
    const [blogs, setBlogs] = useState<any[]>([]);

    const getBlogTime = (blog: any) => {
        const rawDate = blog?.created_at || blog?.createdAt;
        const parsed = new Date(rawDate).getTime();
        return Number.isNaN(parsed) ? 0 : parsed;
    };

    const sortBlogsByDateDesc = (list: any[]) => {
        return [...list].sort((a, b) => getBlogTime(b) - getBlogTime(a));
    };

    function normalizeMongoMsqlBlogs(blogs: any[]): any[] {
        return blogs.map((blog) => ({
            title: blog.title || blog.blogTitle,
            slug: blog.slug || blog.blogSlug,
            meta_description: blog.meta_description || blog.mtDesc,
            meta_keywords: blog.meta_keywords || blog.metaKeywords,
            created_at: blog.created_at || blog.createdAt,
            banner: blog.blog_image || blog.blogBanner,
            description: blog.description || blog.blogDescription,
        }));
    }

    const fetchBlogs = async () => {
        try {
            setLoadingState(true);
            const nextPage = page + 1;
            const response = await axios.get(`/api/get_all_blogs?page=${nextPage}`);
            setPage(nextPage);
            const normalizedBlogs = normalizeMongoMsqlBlogs(response.data.blogs);
            setBlogs((prevBlogs) => sortBlogsByDateDesc([...prevBlogs, ...normalizedBlogs]));
        } catch (error) {
            console.error("Error in fetching blogs", error);
        } finally {
            setLoadingState(false);
        }
    }
    useEffect(() => {
        fetchBlogs();
    }, []);


    const [searchValue, setSearchValue] = useState<string>("");
    const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
    useEffect(() => {
        const list = all_blogs ?? [];
        const filtered = list.filter((blog: any) => (blog?.title ?? "").toLowerCase().includes((searchValue ?? "").toLowerCase()));
        setFilteredBlogs(sortBlogsByDateDesc(filtered).slice(0, 10));
    }, [searchValue, all_blogs]);
    
    return (
        <section className="w-full flex justify-center items-center   py-[35px] lg:py-[70px]">

            {/* Centered Align Container  */}
            <div className={`w-full flex ${styles.containerWidth} flex-col items-center justify-center gap-10 md:gap-12`}>

                {/* Row 1 For Search Filter  */}
                <div className="w-full flex justify-center items-center">
                    <div className="w-full max-w-[342px] h-[46px] border border-[#D0CFCF] rounded-full flex items-center gap-3 px-5 focus-within:border-[#0F1640]/40 focus-within:ring-2 focus-within:ring-[#0F1640]/10 transition-shadow">
                        <CiSearch className="w-[22px] h-[22px] text-[#484848] shrink-0" />
                        <input
                            type="text"
                            placeholder="Search by title ..."
                            className="flex-1 h-full outline-none bg-transparent text-[14px] font-[400] text-[#484848] placeholder:text-[#484848]"
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>

                {/* Row 2 For Cards - 1 col below sm, 2 cols from sm  */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-2">
                    {loadingState && blogs.length === 0 ? (
                        <div className="col-span-1 sm:col-span-2 flex justify-center items-center min-h-[280px] py-12">
                            <LoadingLinesAndDots className="text-[#0F1640]" />
                        </div>
                    ) : (
                        <>
                            {

                                searchValue && filteredBlogs && filteredBlogs.length > 0 && filteredBlogs.map((blog: any) => (
                                    <S2Card key={blog.slug || blog.blogSlug} blog={blog} />
                                ))
                            }
                            {
                                !searchValue && blogs && blogs.length > 0 && blogs.map((blog: any) => (
                                    <S2Card key={blog.slug} blog={blog} />
                                ))
                            }
                            <div
                                onClick={fetchBlogs}
                                className={`col-span-1 sm:col-span-2 flex justify-center items-center py-4 text-center border-t border-b border-[#D3D9FF] cursor-pointer mt-6 sm:mt-10 ${
                                    (blogs.length === 0 || !blogs || filteredBlogs.length == 0) ? "hidden" : "block"
                                }`}>
                                {loadingState ? (
                                    <div className="flex justify-center">
                                        <LoadingLinesAndDots className="text-[#0F1640] w-[6em] h-[6em]" />
                                    </div>
                                ) : (
                                    <p className="font-[600] text-[16px] sm:text-[18px] text-[#0F1640]">Load more</p>
                                )}
                            </div>
                        </>
                    )}

                    {
                       !loadingState && filteredBlogs.length === 0 && (
                            <div className="col-span-1 sm:col-span-2 flex flex-col items-center justify-center min-h-[280px] py-16 px-6 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-[#E8EBFF] flex items-center justify-center mb-5">
                                    <FiFileText className="w-8 h-8 text-[#0F1640]/60" aria-hidden />
                                </div>
                                <h3 className="font-semibold text-[#0F1640] text-lg sm:text-xl mb-2">
                                    No blogs found
                                </h3>
                                <p className="text-[#0F1640]/70 text-sm sm:text-base max-w-sm">
                                    There are no blogs found. Check back later for new content.
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>

        </section>
    )
}


export default Section2;