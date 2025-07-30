import saveFilesIntoDataBase from "@/lib/fileHandler";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import WebStoryModel from "@/models/WebStory.Schema";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { pageID: string } }
) {
  try {
    await connectMongoDB();
    const pageID = params.pageID;

    if (!pageID) {
      return NextResponse.json(
        { message: "Page ID is required", success: false },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    // Get all fields from FormData
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const titleAlign = formData.get("titleAlign") as "top" | "center" | "bottom";
    const descAlign = formData.get("descAlign") as "top" | "center" | "bottom";
    const metaDescription = formData.get("metaDescription") as string;
    const metaKeyWords = formData.get("metaKeyWords") as string;
    const topic = formData.get("topic") as string;
    const img = formData.get("img");

    // Parse nested buttonCTA fields
    const buttonCTA = {
      btnTxt: formData.get("buttonCTA[btnTxt]") as string,
      btnLink: formData.get("buttonCTA[btnLink]") as string,
      btnColor: formData.get("buttonCTA[btnColor]") as string,
      btnTxtColor: formData.get("buttonCTA[btnTxtColor]") as string,
    };
    let imgPath;
    if(img) {
       if (!img || !(img instanceof File)) {
      console.log("❌ topicImg is missing or not a valid img");
      return NextResponse.json(
        {
          message: "❌ topicImg is missing or not a valid img",
          success: false,
        },
        {
          status: 404,
        }
      );
    }
      imgPath = await saveFilesIntoDataBase(img, img.name);
    }
   
    // Update the web story in DB
    const updatedStoryPage = await WebStoryModel.findByIdAndUpdate(
      pageID,
      {
        title,
        description,
        titleAlign,
        descAlign,
        metaDescription,
        metaKeyWords,
        topic,
      ...(imgPath && { img: imgPath }),
      buttonCTA,
      },
      { new: true }
    );

    if (!updatedStoryPage) {
      return NextResponse.json(
        {
          message: "Web story not found or couldn't be updated.",
          success: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Web story updated successfully!",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating web story:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error!",
        success: false,
      },
      { status: 500 }
    );
  }
}
