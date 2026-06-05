import { connectMongoDB } from "@/lib/mongo/dbConntect";
import { NextResponse } from "next/server";
// import RitzBlogModel from "@/models/Blog.Schema";
import fs from "fs";
import path from "path";
import RitzCats from "@/models/RitzCats.Schema";
import RitzBlogModel from "@/models/Blog.Schema";
import ManagementActivitiesModel from "@/models/ManagementActivities";
import jwt from "jsonwebtoken";
import ManagementModel from "@/models/Management";
import { revalidateBlogListingPages } from "@/lib/revalidateBlogs";
import {
  generateSlugFromTitle,
  isValidSlugInput,
  normalizeSlug,
} from "@/lib/slugify";

export function generateSlug(title) {
  return generateSlugFromTitle(title);
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
    // Only super_admin and editor Can Add A New Blog 
    const token = request.headers.get("Authorization")?.split(" ")[1];
    console.log("Token:", request.headers);
    if (!token) {
      return NextResponse.json({ message: "Token is required" }, { status: 400 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (decoded.role !== "super_admin" && decoded.role !== "editor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const actor = await ManagementModel.findById(decoded.id);
    if (!actor || !actor.isActive) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const formData = await request.formData();
    const blogTitle = formData.get("blogTitle");
    const blogSlugInput = formData.get("blogSlug");
    const metaKeywords = formData.get("metaKeywords");
    const blogBodyRaw = formData.get("blogBody");
    const blogCategory = formData.get("blogCategory"); //mtDesc
    const mtDesc = formData.get("mtDesc");
    let blogBannerPath = "";
    const innerImgMap = {};

    // Handle Category ID Blog Description & Blog Slug :
    let blogDescription;
    const blogSlug = blogSlugInput
      ? normalizeSlug(String(blogSlugInput))
      : generateSlug(blogTitle);

    if (!blogSlug || !isValidSlugInput(blogSlug)) {
      return NextResponse.json(
        { message: "A valid slug URL is required (letters, numbers, and hyphens only)" },
        { status: 400 }
      );
    }

    const existingSlug = await RitzBlogModel.findOne({ blogSlug });
    if (existingSlug) {
      return NextResponse.json(
        { message: "This slug URL is already in use. Please choose a different one." },
        { status: 409 }
      );
    }
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
    // Create A New Management Activity
    const newManagementActivity = new ManagementActivitiesModel({ managementId: actor._id, activity: `User ${actor.name} (${actor.email}) added a new blog: ${blogTitle}`, activityTime: new Date() });
    await newManagementActivity.save();

    revalidateBlogListingPages();

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
