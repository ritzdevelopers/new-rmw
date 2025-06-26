import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { writeFile, unlink } from "fs/promises";
import path from "path";

// GET blog by slug
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ blog_slug: string }> }
) {
  try {
    const { blog_slug } = await context.params;

    if (!blog_slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const db = getDBPool();
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT * FROM blogs WHERE slug = ? LIMIT 1",
      [decodeURIComponent(blog_slug)]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const isBlog = true;
    return NextResponse.json({ blog: rows[0], isBlog }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT (Update blog by slug)
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ blog_slug: string }> }
) {
  try {
    const { blog_slug } = await context.params;

    if (!blog_slug) {
      return NextResponse.json(
        { error: "Blog slug is required" },
        { status: 400 }
      );
    }

    const db = getDBPool();

    const [existingRows] = await db.execute<RowDataPacket[]>(
      "SELECT blog_image FROM blogs WHERE slug = ?",
      [decodeURIComponent(blog_slug)]
    );

    if (!existingRows || existingRows.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const existingImage = existingRows[0].blog_image;

    const formData = await req.formData();

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
    let imagePath = existingImage;

    if (blogImage) {
      const bytes = await blogImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}_${blogImage.name}`;
      const uploadDir = path.join(process.cwd(), "public/blogs", fileName);

      await writeFile(uploadDir, buffer);
      imagePath = fileName;

      if (existingImage) {
        const oldImagePath = path.join(process.cwd(), "public", existingImage);
        try {
          await unlink(oldImagePath);
        } catch (err) {
          console.warn("Failed to delete old image:", err);
        }
      }
    }

    await db.execute(
      `UPDATE blogs 
       SET category_id = ?, title = ?, slug = ?, youtube_url = ?, 
           meta_title = ?, meta_description = ?, meta_keywords = ?, 
           blog_image = ?, description = ? 
       WHERE slug = ?`,
      [
        category_id,
        title,
        blog_url,
        youtube_url,
        meta_title,
        meta_description,
        metaKeywords,
        imagePath,
        description,
        decodeURIComponent(blog_slug),
      ]
    );

    return NextResponse.json(
      { message: "Blog updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}
