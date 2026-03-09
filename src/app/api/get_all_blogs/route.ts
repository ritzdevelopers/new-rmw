import { getDBPool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import redisClient from "@/lib/redis_server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzBlogModel from "@/models/Blog.Schema";


export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();
        const page = Number(req.nextUrl.searchParams.get("page")) || 1;
        const limit = 10;

        // MongoDB total blogs
        let mongoTotal = Number(await redisClient.get("rest_blogs_length"));
        console.log("Page", page);
        console.log("MongoTotal", mongoTotal);
        if (!mongoTotal || mongoTotal === 0) {
            mongoTotal = await RitzBlogModel.countDocuments({ blogStatus: true });
            console.log("MongoTotal Feched", mongoTotal);
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
            blogs = await RitzBlogModel.find({blogStatus: true}, {
                blogTitle: 1,
                blogBanner: 1,
                blogDescription: 1,
                blogSlug: 1,
                metaKeywords:1,
                mtDesc:1,
                createdAt:1,
                _id:0
            }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
        }

        await redisClient.set(`cached_blogs_page_${page}_limit_${limit}`, JSON.stringify(blogs), { EX: 60 * 60 * 24 });
        return NextResponse.json({ blogs }, { status: 200 });

    } catch (error) {
        console.error("Error in fetching all blogs", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}