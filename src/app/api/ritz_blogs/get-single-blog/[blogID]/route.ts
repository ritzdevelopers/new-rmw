// app/api/blog/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import NewBlogModel from "@/models/Blog.Schema";

// GET single blog by ID
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

    const blog = await NewBlogModel.findById(blogId);

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Blog fetched successfully", blog, success: true },
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
