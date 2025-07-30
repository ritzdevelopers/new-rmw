import { connectMongoDB } from "@/lib/mongo/dbConntect";
import WebStoryModel from "@/models/WebStory.Schema";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { pageId: string } }
) {
  try {
    await connectMongoDB();
    const pageId = await params.pageId;
    if (!pageId) {
      return NextResponse.json(
        { message: "Page Id Is Required!", success: false },
        { status: 404 }
      );
    }
    const deletedStoryPage = await WebStoryModel.findByIdAndDelete(pageId);
    if (!deletedStoryPage) {
      return NextResponse.json(
        {
          message:
            "Due To Internal Server We Could't Delete Your Web Story Page, Please Try Again Letter!",
          success: false,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        message: "Web Story Page Has Been Deleted Successfully!",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      "There are some errors in your delete web story page controller plz fix the bug first ",
      error
    );
    return NextResponse.json(
      { message: "Internal Server Errors!", success: false },
      {
        status: 500,
      }
    );
  }
}
