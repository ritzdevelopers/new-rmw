import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzBlogModel from "@/models/Blog.Schema";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import path from "path";
import fs from "fs";
import archiver from "archiver";
import axios from "axios";

interface BlogImageRow extends RowDataPacket {
  blog_image: string;
  title: string;
}

export async function GET() {
  try {
    await connectMongoDB();
    const db = getDBPool();
    const mongoImages = await RitzBlogModel.find(
      {},
      { blogBanner: 1, blogTitle: 1 }
    );
    if (mongoImages.length === 0) {
      return NextResponse.json(
        {
          message: "No Images Found In MongoDB",
          success: false,
        },
        { status: 404 }
      );
    }
    const [sqlImages] = await db.query<BlogImageRow[]>(
      "SELECT blog_image, title FROM blogs"
    );
    const sqlImagesArray = sqlImages as BlogImageRow[];
    if (sqlImagesArray.length === 0) {
      return NextResponse.json(
        {
          message: "No Images Found In MySQL",
          success: false,
        },
        { status: 404 }
      );
    }

    const allImages = [...mongoImages, ...sqlImagesArray];

    const zipFileName = "all_images.zip";
    const zipPath = path.join(process.cwd(), "public", zipFileName);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(output);

    // Process images with error handling
    for (const image of allImages) {
      try {
        let imageUrl = image.blogBanner || image.blog_image;
        if (!imageUrl) {
          continue;
        }

        // Convert to absolute URL if needed
        // Check if already a valid URL (starts with http:// or https://)
        if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
          // Get base URL, ensure it doesn't have trailing slash
          let baseUrl = process.env.NEXT_PUBLIC_SERVER_IMG_PATH || "http://localhost:3000";
          baseUrl = baseUrl.replace(/\/$/, ""); // Remove trailing slash if present
          
          if (imageUrl.startsWith("/")) {
            // Relative path starting with / (MongoDB format: /images/filename)
            if (imageUrl.includes("/images")) {
              imageUrl = `${baseUrl}/api/images${imageUrl.split("/images")[1]}`;
            } else if (imageUrl.startsWith("/blogs/")) {
              imageUrl = `${baseUrl}${imageUrl}`;
            } else {
              imageUrl = `${baseUrl}${imageUrl}`;
            }
          } else {
            // Just a filename without leading slash (MySQL format)
            // MySQL stores as just filename, so we need to add /blogs/ prefix
            imageUrl = `${baseUrl}/blogs/${imageUrl}`;
          }
        }

        // Validate URL before making request
        try {
          new URL(imageUrl); // This will throw if URL is invalid
        } catch (urlError) {
          console.error(`Invalid URL constructed for blog: ${image.blogTitle || image.title}`, {
            originalUrl: image.blogBanner || image.blog_image,
            constructedUrl: imageUrl,
          });
          continue; // Skip this image
        }
        const response = await axios.get(imageUrl, {
          responseType: "arraybuffer",
          timeout: 10000, // 10 second timeout
        });
        const nodeBuffer = Buffer.from(response.data, "binary");

        // Sanitize folder name (remove invalid characters)
        const blogTitle = image.blogTitle || image.title || "image";
        const sanitizedTitle = blogTitle
          .replace(/[<>:"/\\|?*]/g, "_")
          .trim()
          .substring(0, 100); // Limit length

        // Get image extension
        const imageExtension = imageUrl.split(".").pop()?.toLowerCase() || "jpg";
        const imageName = `rmw-blogs/${sanitizedTitle}/image.${imageExtension}`;

        archive.append(nodeBuffer, { name: imageName });
      } catch (error) {
        console.error(`Error downloading image for blog: ${image.blogTitle || image.title}`, error);
        // Continue with next image instead of failing entire process
        continue;
      }
    }

    // Finalize archive
    await archive.finalize();

    // Wait until file is written
    await new Promise<void>((resolve, reject) => {
      output.on("close", () => resolve());
      archive.on("error", (err: Error) => reject(err));
      output.on("error", (err: Error) => reject(err));
    });

    // Return ZIP file URL
    return NextResponse.json({ url: `/${zipFileName}`, success: true });
  } catch (err) {
    console.log(
      "Internal Server Errors In Download All Images As Zip => ",
      err
    );
    return NextResponse.json(
      {
        message: "Internal Server Errors In Download All Images As Zip => ",
        success: false,
        error: err,
      },
      { status: 500 }
    );
  }
}
