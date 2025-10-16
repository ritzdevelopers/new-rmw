import { connectMongoDB } from "@/lib/mongo/dbConntect";
import TopicModel from "@/models/Story.Topic";
import { NextRequest, NextResponse } from "next/server";
import saveFilesIntoDataBase from "@/lib/fileHandler";
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const formData = await req.formData();
    const topicTitle = formData.get("topicTitle");
    const description = formData.get("description");
    const metaDescription = formData.get("metaDescription");
    const metaKeyWords = formData.get("metaKeyWords");
    const topicImg = formData.get("topicImg"); // This will be a File object
    const isActive = formData.get("isActive");

    if (!topicImg || !(topicImg instanceof File)) {
      console.log("❌ topicImg is missing or not a valid file");
      return NextResponse.json(
        {
          message: "❌ topicImg is missing or not a valid file",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    if (!topicTitle || !description || !metaDescription || !metaKeyWords) {
      return NextResponse.json(
        {
          message: "All fields are required!",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const alreadyExist = await TopicModel.findOne({ topicTitle });
    if (alreadyExist) {
      return NextResponse.json(
        { message: "Topic Title Must Be Unique!", success: false },
        { status: 404 }
      );
    }
    const slug = topicTitle
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // remove special characters
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-"); // remove multiple hyphens

    const imgPath = await saveFilesIntoDataBase(topicImg, topicImg.name);
    const createdTopic = await TopicModel.create({
      topicTitle,
      description,
      metaDescription,
      metaKeyWords,
      topicImg: imgPath,
      isActive,
      slug
    });
    if (!createdTopic) {
      return NextResponse.json(
        { message: "Internal Server Errors!", success: false },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Topic Created Succesfully!", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log(
      "There are some errors in add web story controller plz fix the bug first ",
      error
    );
    return NextResponse.json(
      {
        message: "Internal Server Errors!",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
