import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import NewBlogModel from "@/models/Blog.Schema";

export async function PUT(
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

    const body = await request.json();

    // Remove `imgs` from the body if it exists
    if ("imgs" in body) {
      delete body.imgs;
    }

    const updatedBlog = await NewBlogModel.findByIdAndUpdate(
      blogId,
      { ...body },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { message: "Blog not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Blog updated successfully",
        blog: updatedBlog,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("❌ Error in PUT update blog controller:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
