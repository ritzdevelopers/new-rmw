import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import EImagesModels from "@/models/EImages";

export async function GET(req, context) {
  const { imageName } = await context.params;
  const imagePath = path.join(`${process.env.EIMAGES}/eImages`, imageName);

  try {
    if (!fs.existsSync(imagePath)) {
      return new NextResponse("Image not found", { status: 404 });
    }
    const imageBuffer = fs.readFileSync(imagePath);
    const extension = path.extname(imageName).toLowerCase();

    const mimeTypeMap = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp",
    };

    const contentType = mimeTypeMap[extension] || "application/octet-stream";

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    console.log(error);
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

export async function DELETE(req, context) {
  try {
    const id = await context.params.imageName;
    if (!id) {
      return NextResponse.json(
        { message: "Id Is Required To Delete A Message!", success: false },
        { status: 404 }
      );
    }
    await EImagesModels.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Image has been deleted successfully!", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("Internal Server Errors!", error);
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
