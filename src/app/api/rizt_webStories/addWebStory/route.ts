import saveFilesIntoDataBase from "@/lib/fileHandler";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import TopicModel from "@/models/Story.Topic";
import WebStoryModel from "@/models/WebStory.Schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const titleAlign = formData.get("titleAlign");
    const buttonCTA = formData.get("buttonCTA");
    const descAlign = formData.get("descAlign");
    const img = formData.get("img"); // File object
    const metaDescription = formData.get("metaDescription");
    const metaKeyWords = formData.get("metaKeyWords");
    // const categoryId = formData.get("categoryId");
    const topicID = formData.get("topicID");

    if (!img || !(img instanceof File)) {
      console.log("❌ img is missing or not a valid file");
      return NextResponse.json(
        {
          message: "❌ img is missing or not a valid file",
          success: false,
        },
        {
          status: 404,
        }
      );
    }
   

    if (
      !metaDescription ||
      !metaKeyWords ||
      !topicID
    ) {
      return NextResponse.json(
        { message: "All fields are required!", success: false },
        { status: 404 }
      );
    }
    const imgPath = await saveFilesIntoDataBase(img, img.name);
    const btnCTA = JSON.parse(buttonCTA as string);
    const storyPage = await WebStoryModel.create({
      title,
      description,
      titleAlign,
      buttonCTA:btnCTA,
      descAlign,
      img: imgPath,
      metaDescription,
      metaKeyWords,
      topic: topicID,
    });
    if (!storyPage) {
      return NextResponse.json(
        { message: "Internal Server Error!", success: false },
        { status: 500 }
      );
    }
    await TopicModel.findByIdAndUpdate(topicID, {
      $inc: { pages: +1 },
    });
    return NextResponse.json(
      { message: "Story Page Addedd Successfully.", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log(
      "There are some errors in you add web story controller plz fix the bug first ",
      error
    );
    return NextResponse.json(
      { message: "Internal Server Error.", success: false },
      { status: 500 }
    );
  }
}
