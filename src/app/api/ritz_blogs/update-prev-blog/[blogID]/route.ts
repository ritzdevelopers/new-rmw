import { connectMongoDB } from "@/lib/mongo/dbConntect";
import { NextRequest, NextResponse } from "next/server";
import NewBlogModel from "@/models/Blog.Schema";
import fs from "fs";
import path from "path";

async function saveFileToUploads(file: File, filename: string): Promise<string> {
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

export async function PUT(req: NextRequest,
    { params }: { params: { blogID: string } }
) {
    try {
        await connectMongoDB();

        const formData = await req.formData();
       const blogId = params.blogID;
        const blogTitle = formData.get("blogTitle");
        const metaKeywords = formData.get("metaKeywords");
        const blogBodyRaw = formData.get("blogBody");
        const blogCategory = formData.get("blogCategory");
        const blogStatus = formData.get("blogStatus");

        let blogBannerPath = "";
        const innerImgMap: Record<string, string> = {};

        // Upload new files (if any)
        for (const [key, value] of formData.entries()) {
            if (value instanceof File && value.size > 0) {
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
        const updatedBlogBody = blogBodyParsed.map((item: any, index: number) => ({
            ...item,
            innerImg: innerImgMap[index] || item.innerImg || "",
        }));

        // Build update object
        const updateData: Record<string, any> = {
            blogTitle,
            blogBody: updatedBlogBody,
            metaKeywords,
            blogCategory,
            blogStatus,
        };

        if (blogBannerPath) {
            updateData.blogBanner = blogBannerPath;
        }

        // Update in DB
        const updatedBlog = await NewBlogModel.findByIdAndUpdate(
            blogId,
            { $set: updateData },
            { new: true }
        );

        if (!updatedBlog) {
            return NextResponse.json({ message: "Blog not found", success: false }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Blog Updated Successfully", blog: updatedBlog },
            { status: 200 }
        );
    } catch (error) {
        console.error("Update Blog Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
