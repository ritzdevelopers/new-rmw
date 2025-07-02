import { connectMongoDB } from "@/lib/mongo/dbConntect";
import { NextResponse } from "next/server";
import NewBlogModel from "@/models/Blog.Schema";
import fs from "fs";
import path from "path";

async function saveFileToUploads(file, filename) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, filename);
  fs.writeFileSync(filePath, buffer);
  return `/uploads/${filename}`;
}

export async function POST(request) {
  try {
    await connectMongoDB();

    const formData = await request.formData();
    const blogTitle = formData.get("blogTitle");
    const metaKeywords = formData.get("metaKeywords");
    const blogBodyRaw = formData.get("blogBody");
    const blogCategory = formData.get("blogCategory");
    const blogStatus = formData.get("blogStatus");
    let blogBannerPath = "";
    const innerImgMap = {};

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        const filename = `${Date.now()}-${value.name}`;
        const savedPath = await saveFileToUploads(value, filename);

        if (key === "blogBanner") {
          blogBannerPath = savedPath;
        } else if (key.startsWith("innerImg-")) {
          const index = key.split("-")[1];
          innerImgMap[index] = savedPath;
        }
      }
    }

    const blogBodyParsed = JSON.parse(blogBodyRaw || "[]");
    const blogBody = blogBodyParsed.map((item, index) => ({
      ...item,
      innerImg: innerImgMap[index] || "",
    }));

    const newBlog = await NewBlogModel.create({
      blogTitle,
      blogBanner: blogBannerPath,
      blogBody,
      metaKeywords,
      blogCategory,
      blogStatus
    });

    return NextResponse.json(
      { message: "Blog Created", blog: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error uploading blog:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
