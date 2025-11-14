import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import fs from "fs";
// saveFileToUploads(file: File, filename: string): Promise<string> {
// GET blog by slug
export async function GET(
  req: NextRequest,
  context: { params: { blog_slug: string } }
) {
  try {
    const { blog_slug } = await context.params;
    // console.log("Slug received:", blog_slug);

    if (!blog_slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // Normalize slug by collapsing multiple dashes to single dash
    const normalizedSlug = decodeURIComponent(blog_slug).replace(/-+/g, "-");

    const db = getDBPool();
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT * FROM blogs WHERE slug = ? LIMIT 1",
      [normalizedSlug]
    );

    // console.log("DB rows:", rows);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog: rows[0], isBlog: true }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function deleteFileFromUploads(url: string) {
  try {
    const filePath = path.join(process.cwd(), "public", url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.warn("Failed to delete previous image:", err);
  }
}

async function saveFileToUploads(
  file: File,
  filename: string
): Promise<string> {
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

// PUT (Update blog by slug)
export async function PUT(
  req: NextRequest,
  context: { params: { blog_slug: string } }
) {
  try {
    const { blog_slug } = context.params;

    if (!blog_slug) {
      return NextResponse.json(
        { error: "Blog slug is required" },
        { status: 400 }
      );
    }

    const db = getDBPool();

    // Normalize slug by collapsing multiple dashes to single dash
    const normalizedSlug = decodeURIComponent(blog_slug).replace(/-+/g, "-");

    const [existingRows] = await db.execute<RowDataPacket[]>(
      "SELECT blog_image FROM blogs WHERE slug = ?",
      [normalizedSlug]
    );

    if (!existingRows || existingRows.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const existingImage = existingRows[0].blog_image;

    const formData = await req.formData();

    const category_id = formData.get("category_id") as string;
    const title = formData.get("title") as string;
    const meta_title = formData.get("meta_title") as string;
    const meta_description = formData.get("meta_description") as string;
    const meta_keywords = formData.get("meta_keywords") as string;
    const description = formData.get("description") as string;
    const blogImage = formData.get("blog_image") as File | null;

    let imagePath = "";
    if (blogImage) {
      imagePath = await saveFileToUploads(
        blogImage,
        `${Date.now()}_${blogImage.name}`
      );
    }

    if (existingImage) {
      deleteFileFromUploads(existingImage);
    }
    console.log("imagePath", imagePath);
    console.log("existingImage", existingImage);

    await db.execute(
      `UPDATE blogs 
       SET category_id = ?, title = ?,
           meta_title = ?, meta_description = ?, meta_keywords = ?, 
           blog_image = ?, description = ? 
       WHERE slug = ?`,
      [
        category_id,
        title,
        meta_title,
        meta_description,
        meta_keywords,
        imagePath,
        description,
        normalizedSlug,
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
