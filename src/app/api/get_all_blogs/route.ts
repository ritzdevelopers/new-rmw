import { getDBPool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import redisClient from "@/lib/redis_server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzBlogModel from "@/models/Blog.Schema";
import mongoose from "mongoose";
import RitzCats from "@/models/RitzCats.Schema";


export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();
        const page = Number(req.nextUrl.searchParams.get("page")) || 1;
        const limit = 10;
        // MongoDB total blogs
        let mongoTotal = Number(await redisClient.get("rest_blogs_length"));

        if (!mongoTotal || mongoTotal === 0) {
            mongoTotal = await RitzBlogModel.countDocuments({ blogStatus: true });
            await redisClient.set("rest_blogs_length", mongoTotal.toString(), { EX: 60 * 60 * 24 });
        }
        const skip = (page - 1) * limit;
        const cached_blogs = await redisClient.get(`cached_blogs_page_${page}_limit_${limit}`);

        if (cached_blogs) {
            return NextResponse.json({ blogs: JSON.parse(cached_blogs) }, { status: 200 });
        }
        let blogs: any[] = [];
        if (skip >= mongoTotal) {
            const mysqlOffset = skip - mongoTotal;
            // Fetch from MySQL
            const [mysqlBlogs] = await getDBPool().query("SELECT blog_image, title, slug, meta_description, meta_keywords, description, created_at FROM blogs WHERE category_id != 1 ORDER BY id DESC, created_at DESC LIMIT ? OFFSET ?", [limit, mysqlOffset]);
            blogs = Array.isArray(mysqlBlogs) ? mysqlBlogs : [];
        } else {
            blogs = await RitzBlogModel.find({ blogStatus: true }, {
                blogTitle: 1,
                blogBanner: 1,
                blogDescription: 1,
                blogSlug: 1,
                metaKeywords: 1,
                mtDesc: 1,
                createdAt: 1,
                _id: 0
            }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
        }

        await redisClient.set(`cached_blogs_page_${page}_limit_${limit}`, JSON.stringify(blogs), { EX: 60 * 60 * 24 });
        return NextResponse.json({ blogs }, { status: 200 });

    } catch (error) {
        console.error("Error in fetching all blogs", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET_ALL_BLOGS() {
    try {
        await connectMongoDB();
        const cached_blogs = await redisClient.get('all_cached_blogs');
        if (cached_blogs) {
            return {
                status: 200,
                message: "All blogs fetched successfully",
                data: JSON.parse(cached_blogs)
            }
        }
        const mongo_blogs = await RitzBlogModel.find({ blogStatus: true }, {
            blogTitle: 1,
            blogBanner: 1,
            blogSlug: 1,
            blogDescription: 1,
            createdAt: 1,
        }).sort({ createdAt: -1 }).lean();
        const [mysql_blogs] = await getDBPool().query<any[]>("SELECT blog_image, title, slug, description, created_at FROM blogs WHERE category_id != 1 ORDER BY id DESC, created_at DESC");
        const blogs = [...mongo_blogs, ...mysql_blogs];
        const normalized_blogs = normalizeMongoMsqlBlogs(blogs);
        await redisClient.set('all_cached_blogs', JSON.stringify(normalized_blogs), { EX: 60 * 60 * 24 });
        return {
            status: 200,
            message: "All blogs fetched successfully",
            data: normalized_blogs
        }
    } catch (error) {
        console.error("Error in fetching all blogs", error);
        return {
            status: 500,
            message: "Internal Server Error",
            data: null
        }
    }
}

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

export async function FIND_BLOGS_BY_CATEGORY(categorySlug: string) {
    try {
        if (!categorySlug) {
            return {
                status: 400,
                message: "Category Slug is required",
                data: null
            }
        }
        await connectMongoDB();
        // Fetch From Redis Cache :
        const cached_blogs = await redisClient.get(`cached_blogs_by_category_${categorySlug}`);
        const cached_category_meta_details = await redisClient.get(`cached_category_meta_details_${categorySlug}`);

        if (cached_blogs && cached_blogs.length > 0 && cached_category_meta_details) {

            return {
                status: 200,
                message: "Blogs fetched successfully",
                data: JSON.parse(cached_blogs),
                category_meta_details: JSON.parse(cached_category_meta_details)
            }
        }

        // Fetch Category By Slug 
        let category;
        category = await RitzCats.findOne({ categorySlug });

        if (!category) {
            const [mysql_category] = await getDBPool().query<any[]>("SELECT * FROM categories WHERE link = ?", [categorySlug]);
            category = mysql_category[0];
        }

        const categoryId = category?._id || category?.id || null;
        if (!categoryId) {
            return {
                status: 404,
                message: "Category not found",
                data: null,
                category_meta_details: null
            }
        }

        const meta_details = {
            title: category?.categoryName || category?.name,
            description: category?.meta_description || category?.metaDescription,
            keywords: category?.meta_keywords || category?.metaKeywords,
        }
        const isValidObjectId =
            mongoose.Types.ObjectId.isValid(categoryId) &&
            String(new mongoose.Types.ObjectId(categoryId)) === categoryId;


        if (isValidObjectId) {
            const blogs = await RitzBlogModel.find({ blogCategoryId: new mongoose.Types.ObjectId(categoryId) }, {
                blogTitle: 1,
                blogBanner: 1,
                blogSlug: 1,
                blogDescription: 1,
                createdAt: 1,
                metaKeywords: 1,
                mtDesc: 1,
            }).sort({ createdAt: -1 }).lean();
            await redisClient.set(`cached_blogs_by_category_${categorySlug}`, JSON.stringify(blogs), { EX: 60 * 60 * 24 });
            await redisClient.set(`cached_category_meta_details_${categorySlug}`, JSON.stringify(meta_details), { EX: 60 * 60 * 24 });
            return {
                status: 200,
                message: "Blogs fetched successfully",
                data: blogs,
                category_meta_details: meta_details
            }
        }
        const [mysql_blogs] = await getDBPool().query<any[]>("SELECT blog_image, title, slug, description, created_at FROM blogs WHERE category_id = ? ORDER BY id DESC, created_at DESC", [categoryId]);
        await redisClient.set(`cached_blogs_by_category_${categorySlug}`, JSON.stringify(mysql_blogs), { EX: 60 * 60 * 24 });
        await redisClient.set(`cached_category_meta_details_${categorySlug}`, JSON.stringify(meta_details), { EX: 60 * 60 * 24 });
        return {
            status: 200,
            message: "Blogs fetched successfully",
            data: mysql_blogs,
            category_meta_details: meta_details
        }
    } catch (error) {
        console.error("Error in fetching blogs by category", error);
        return {
            status: 500,
            message: "Internal Server Error",
            data: null
        }
    }
}

export async function FIND_BLOGS_BY_KEYWORD(keyword: string) {
    try {
        if (!keyword) {
            return {
                status: 400,
                message: "Keyword is required",
                data: null
            }
        }
        await connectMongoDB();
        console.log("This keyword is coming from the route", keyword);

        const [mysql_blogs] = await getDBPool().query<any[]>("SELECT blog_image, title, slug, description, created_at FROM blogs WHERE FIND_IN_SET(?, LOWER(REPLACE(meta_keywords, ', ', ','))) ORDER BY id DESC, created_at DESC", [keyword]);
        const mongo_blogs = await RitzBlogModel.find({ metaKeywords: { $regex: keyword, $options: "i" } }, {
            blogTitle: 1,
            blogBanner: 1,
            blogSlug: 1,
            blogDescription: 1,
            createdAt: 1,
            metaKeywords: 1,
            mtDesc: 1,
        }).sort({ createdAt: -1 }).lean();
        const blogs = [...mongo_blogs, ...mysql_blogs];
        const normalized_blogs = normalizeMongoMsqlBlogs(blogs);
        return {
            status: 200,
            message: "Blogs fetched successfully",
            data: normalized_blogs
        }
    } catch (error) {
        console.error("Error in fetching blogs by keyword", error);
        return {
            status: 500,
            message: "Internal Server Error",
            data: null
        }
    }
}