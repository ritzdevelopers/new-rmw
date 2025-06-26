import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { getDBPool } from "@/lib/db"; // Assuming you have a database connection setup

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();

    // Extract form values
    const category_id = formData.get("category_id") as string;
    const title = formData.get("title") as string;
    let blog_url = formData.get("blog_url") as string;
    const youtube_url = formData.get("youtube_url") as string;
    const meta_title = formData.get("meta_title") as string;
    const meta_description = formData.get("meta_description") as string;
    const metaKeywords = formData.get("metaKeywords") as string;
    const description = formData.get("description") as string;
    const blogImage = formData.get("blogImage") as File | null;
    blog_url = blog_url?.toLowerCase().replace(/\s+/g, "-") || "";
    let imagePath = "";

    // Handle image upload
    if (blogImage) {
      const bytes = await blogImage.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Define image path (saving to public/uploads folder)
      const fileName = `${Date.now()}_${blogImage.name}`;
      const uploadDir = path.join(process.cwd(), "public/blogs", fileName);
      
      await writeFile(uploadDir, buffer);
      imagePath = `${fileName}`;
    }
    const db = getDBPool();
    // Insert data into MySQL
    await db.execute(
      "INSERT INTO blogs (category_id, title, slug, youtube_url, meta_title, meta_description, meta_keywords, blog_image, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [category_id, title, blog_url, youtube_url, meta_title, meta_description, metaKeywords, imagePath, description]
    );

    return NextResponse.json({ message: "Blog added successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error adding blog:", error);
    return NextResponse.json({ message: "Failed to add blog" }, { status: 500 });
  }
}
