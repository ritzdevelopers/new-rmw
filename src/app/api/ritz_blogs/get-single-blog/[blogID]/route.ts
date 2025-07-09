// app/api/blog/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzBlogModel from "@/models/Blog.Schema";
import RitzCats from "@/models/RitzCats.Schema";

// GET single blog by ID | Slug
export async function GET(
  request: NextRequest,
  { params }: { params: { blogID: string } }
) {
  try {
    await connectMongoDB();

    const blogId = params.blogID;

    if (!blogId) {
      return NextResponse.json(
        { message: "Blog ID is required", success: false },
        { status: 400 }
      );
    }

    const blog = await RitzBlogModel.findOne({
      blogSlug: blogId
    });

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found", success: false },
        { status: 404 }
      );
    }
    const blogCat = await RitzCats.findById({
      _id: blog.blogCategoryId
    });
    const catRelatedBlogs = await RitzBlogModel.find({
      blogCategoryId: blogCat,
    }).sort({ createdAt: -1 })
      .limit(3);

    return NextResponse.json(
      { message: "Blog fetched successfully", blog, latestRBlogs: catRelatedBlogs, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("❌ Error in GET single blog controller:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
