import { connectMongoDB } from "@/lib/mongo/dbConntect";
import { NextResponse } from "next/server";
// import RitzBlogModel from "@/models/Blog.Schema";
import fs from "fs";
import path from "path";
import RitzCats from "@/models/RitzCats.Schema";
import RitzBlogModel from "@/models/Blog.Schema";

export function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

async function saveFileToUploads(file, filename) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadDir = path.join(`${process.env.SERVER_IMG_PATH}`, "images");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, filename);
  fs.writeFileSync(filePath, buffer);
  return `/images/${filename}`;
}

export async function POST(request) {
  try {
    await connectMongoDB();

    const formData = await request.formData();
    const blogTitle = formData.get("blogTitle");
    const metaKeywords = formData.get("metaKeywords");
    const blogBodyRaw = formData.get("blogBody");
    const blogCategory = formData.get("blogCategory"); //mtDesc
    const mtDesc = formData.get("mtDesc");
    let blogBannerPath = "";
    const innerImgMap = {};

    // Handle Category ID Blog Description & Blog Slug :
    let blogDescription;
    const blogSlug = generateSlug(blogTitle);
    const fetchCat = await RitzCats.findOne({ categorySlug: blogCategory });

    if (!fetchCat) {
      console.log("CAt Not Found");
      return NextResponse.json(
        { message: "Category not found" },
        {
          status: 404,
        }
      );
    }

    const categoryId = fetchCat._id;

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

    blogDescription = blogBody[0].metaDescription;

    const newBlog = await RitzBlogModel.create({
      blogTitle,
      blogBanner: blogBannerPath,
      blogBody,
      metaKeywords,
      blogCategoryId: categoryId,
      blogStatus: true,
      blogSlug,
      blogDescription,
      mtDesc,
    });
    console.log("this is new blog ", newBlog);
    console.log("also this is des ", mtDesc);

    return NextResponse.json(
      { message: "Blog Created", blog: newBlog },
      { status: 201 }
    );
  } catch (error) {
    // console.log("Error uploading blog:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
