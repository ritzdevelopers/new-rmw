import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import NewBlogModel from "@/models/Blog.Schema";

export async function DELETE(
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

    const deletedBlog = await NewBlogModel.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return NextResponse.json(
        { message: "Blog not found or already deleted", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Blog deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("❌ Error in DELETE blog controller:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
