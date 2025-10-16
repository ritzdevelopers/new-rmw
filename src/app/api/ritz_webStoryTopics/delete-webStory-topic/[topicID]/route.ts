import { connectMongoDB } from "@/lib/mongo/dbConntect";
import TopicModel from "@/models/Story.Topic";
import WebStoryModel from "@/models/WebStory.Schema";
import {  NextRequest, NextResponse } from "next/server";

export async function DELETE(  req: NextRequest, { params }: { params: { topicID: string } }) {
  try {
    await connectMongoDB();
    const { topicID } = params;
    // const topicID = await params.topicID;
   
    
    if (!topicID) {
      return NextResponse.json(
        { message: "Topic Id Is Missing!", success: false },
        {
          status: 404,
        }
      );
    }
    const deletedTopic = await TopicModel.findByIdAndDelete(topicID);
    console.log("This is deleted topic ", deletedTopic);
    
    if (!deletedTopic) {
      return NextResponse.json(
        { message: "Internal Server Errros!", success: false },
        { status: 500 }
      );
    }
    const topicPages = await WebStoryModel.find({ topic: topicID });
    if (topicPages && topicPages.length > 0) {
      await Promise.all(
        topicPages.map((page) => WebStoryModel.findByIdAndDelete(page._id))
      );
    }
    return NextResponse.json(
      { message: "Topic Deleted Sucessfully!", success: false },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      "There are some errors in your delete web story controller plz fix all the bugs first!",
      error
    );
    return NextResponse.json(
      { message: "Internal Server Errors !", success: false },
      {
        status: 500,
      }
    );
  }
}
