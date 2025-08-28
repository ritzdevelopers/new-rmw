import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

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
