import { getDBPool } from "@/lib/db";
import redisClient from "@/lib/redis_server";
import RitzBlogModel from "@/models/Blog.Schema";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import { RowDataPacket } from "mysql2";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    try {
        const { slug } =  await params;
        console.log("Slug", slug);
        if (!slug) {
            return NextResponse.json({ message: "Slug is required", error: null }, { status: 400 });
        }
        const cached_blog = await redisClient.get(`cached_blog_${slug}`);
        if (cached_blog) {
            console.log("Cached Blog", JSON.parse(cached_blog));
            return NextResponse.json({ blog: JSON.parse(cached_blog) }, { status: 200 });
        }
        const blog = await getBlogBySlug(slug);
        console.log(" Blog Fetched", blog);
        if (blog.status === 200) {
            await redisClient.set(`cached_blog_${slug}`, JSON.stringify(blog.data), { EX: 60 * 60 * 24 });
            return NextResponse.json({ blog: blog.data }, { status: 200 });
        }
        return NextResponse.json({ message: blog.message, error: null }, { status: blog.status });
    } catch (error) {
        console.error("Error in fetching blog by slug", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: null },
            { status: 500 }
        );
    }
}
async function getBlogBySlug(slug: string) {
    try {
        await connectMongoDB();
        let blog;

        // Fetch Blog From MongoDB 
        blog = await RitzBlogModel.findOne({ blogSlug: slug }).lean();
        console.log("MongoDB Blog", blog);
        if (!blog) {
            const db = getDBPool();
            const [rows] = await db.execute<RowDataPacket[]>(
                "SELECT * FROM blogs WHERE slug = ?",
                [slug]
              );  
              blog = rows[0];
        }
        console.log("Blog", blog);
        if (blog) {
            return {
                status: 200,
                message: "Blog fetched successfully",
                data: blog
            }
        } else {
            return {
                status: 404,
                message: "Blog not found",
                data: null
            }
        }
    } catch (error) {
        console.error("Error in fetching blog by slug", error);
        return {
            status: 500,
            message: "Internal Server Error", 
        }
    }

}