import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzBlogModel from "@/models/Blog.Schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB({});

    const allBlogs = await RitzBlogModel.find().sort({ createdAt: -1 });
    if (allBlogs.length < 1) {
      return NextResponse.json(
        { message: "There are no blogs" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { allBlogs, message: "All blogs fetched successfully!" },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
          'CDN-Cache-Control': 'public, s-maxage=600',
          'Vercel-CDN-Cache-Control': 'public, s-maxage=600'
        }
      }
    );
  } catch (error) {
    console.log(
      "There are some errors in fetching the all blogs plz fix the bug first ",
      error
    );
    return NextResponse.json(
      { message: "Internal Server Err" },
      {
        status: 500,
      }
    );
  }
}