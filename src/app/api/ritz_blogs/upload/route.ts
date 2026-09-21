import { connectMongoDB } from "@/lib/mongo/dbConntect";
import { NextResponse } from "next/server";
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
import { extractGoogleDocId, fetchGoogleDoc } from "@/lib/google/docs";
import { parseGoogleDoc } from "@/lib/google/googleDocParser";
import mongoose from "mongoose";

type JwtPayload = {
  id: string;
  role?: string;
};

async function saveFileToUploads(file: File, filename: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const baseDir = process.env.SERVER_IMG_PATH;
  if (!baseDir) {
    throw new Error("SERVER_IMG_PATH is not configured");
  }

  const uploadDir = path.join(baseDir, "images");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, filename);
  // Prevent path traversal — resolved path must stay under uploadDir
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(uploadDir) + path.sep)) {
    throw new Error("Invalid upload path");
  }

  fs.writeFileSync(resolved, buffer);
  return `/images/${filename}`;
}

function safeUploadFilename(originalName: string): string {
  const basename = path.basename(originalName || "banner");
  const cleaned = basename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
  return `${Date.now()}-${cleaned || "banner"}`;
}

async function resolveUniqueSlug(baseSlug: string, publishStatus: string) {
  let blogSlug = baseSlug;
  let existingSlug = await RitzBlogModel.findOne({ blogSlug });

  if (existingSlug && publishStatus === "draft") {
    blogSlug = `${baseSlug}-draft-${Date.now()}`;
    existingSlug = await RitzBlogModel.findOne({ blogSlug });
  }

  return { blogSlug, existingSlug };
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Token is required" }, { status: 400 });
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    } catch {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!decoded?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (decoded.role !== "super_admin" && decoded.role !== "editor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const actor = await ManagementModel.findById(decoded.id);
    if (!actor || !actor.isActive) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Author always comes from JWT actor — never from FormData
    const blogAuthor = String(actor.name || "").trim();
    if (!blogAuthor) {
      return NextResponse.json(
        { message: "Authenticated author profile is incomplete" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const blogTitle = String(formData.get("blogTitle") || "").trim();
    const blogSlugInput = formData.get("blogSlug");
    const blogCategoryId = String(formData.get("blogCategoryId") || "").trim();
    const publishStatus = String(formData.get("publishStatus") || "published").trim();
    const scheduledAtRaw = formData.get("scheduledAt");
    const googleDocIdRaw = String(formData.get("googleDocId") || "").trim();
    const googleDocUrlRaw = String(formData.get("googleDocUrl") || "").trim();
    const blogBannerFile = formData.get("blogBanner");

    if (!blogTitle) {
      return NextResponse.json({ message: "Blog title is required" }, { status: 400 });
    }

    if (!["draft", "scheduled", "published"].includes(publishStatus)) {
      return NextResponse.json({ message: "Invalid publish status" }, { status: 400 });
    }

    let scheduledAt: Date | null = null;
    if (publishStatus === "scheduled") {
      if (!scheduledAtRaw) {
        return NextResponse.json(
          { message: "Schedule date and time are required" },
          { status: 400 }
        );
      }
      scheduledAt = new Date(String(scheduledAtRaw));
      if (Number.isNaN(scheduledAt.getTime()) || scheduledAt <= new Date()) {
        return NextResponse.json(
          { message: "Scheduled time must be in the future" },
          { status: 400 }
        );
      }
    }

    const docIdSource = googleDocIdRaw || googleDocUrlRaw;
    if (!docIdSource) {
      return NextResponse.json(
        { message: "googleDocId or googleDocUrl is required" },
        { status: 400 }
      );
    }

    const documentId = extractGoogleDocId(docIdSource);
    if (!documentId) {
      return NextResponse.json(
        { message: "Invalid Google Doc ID or URL" },
        { status: 400 }
      );
    }

    const baseSlug = blogSlugInput
      ? normalizeSlug(String(blogSlugInput))
      : generateSlugFromTitle(blogTitle);

    if (!baseSlug || !isValidSlugInput(baseSlug)) {
      return NextResponse.json(
        {
          message:
            "A valid slug URL is required (letters, numbers, and hyphens only)",
        },
        { status: 400 }
      );
    }

    const { blogSlug, existingSlug } = await resolveUniqueSlug(baseSlug, publishStatus);
    if (existingSlug) {
      return NextResponse.json(
        {
          message: "This slug URL is already in use. Please choose a different one.",
        },
        { status: 409 }
      );
    }

    const requiresCategory =
      publishStatus === "published" || publishStatus === "scheduled";

    if (requiresCategory && !blogCategoryId) {
      return NextResponse.json(
        { message: "Please select a category" },
        { status: 400 }
      );
    }

    let fetchCat = null;
    if (blogCategoryId) {
      if (!mongoose.Types.ObjectId.isValid(blogCategoryId)) {
        return NextResponse.json({ message: "Category not found" }, { status: 404 });
      }
      fetchCat = await RitzCats.findById(blogCategoryId);
      if (!fetchCat) {
        return NextResponse.json({ message: "Category not found" }, { status: 404 });
      }
    }

    if (requiresCategory && !fetchCat) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    // Draft without category: pick oldest category (same spirit as existing create API)
    if (!fetchCat && publishStatus === "draft") {
      fetchCat = await RitzCats.findOne().sort({ createdAt: 1 });
      if (!fetchCat) {
        return NextResponse.json({ message: "Category not found" }, { status: 404 });
      }
    }

    let blogBannerPath = "";
    if (blogBannerFile instanceof File && blogBannerFile.size > 0) {
      const filename = safeUploadFilename(blogBannerFile.name);
      blogBannerPath = await saveFileToUploads(blogBannerFile, filename);
    }

    if (
      (publishStatus === "published" || publishStatus === "scheduled") &&
      !blogBannerPath
    ) {
      return NextResponse.json(
        { message: "Cover image is required to publish" },
        { status: 400 }
      );
    }

    let googleDoc;
    try {
      googleDoc = await fetchGoogleDoc(documentId);
    } catch (err) {
      console.error("[import-google-doc] Failed to fetch Google Doc:", err);
      return NextResponse.json(
        {
          message:
            "Unable to fetch the Google Doc. Check the document ID and that it is shared with the service account.",
        },
        { status: 400 }
      );
    }

    const parsed = parseGoogleDoc(googleDoc);
    const metaTitle = parsed.metaTitle;
    const metaDescription = parsed.metaDescription;
    const metaKeywords = parsed.metaKeywords;
    const mtDesc = parsed.mtDesc || metaDescription;
    const blogContentHtml = parsed.blogContent;

    if (publishStatus === "published" || publishStatus === "scheduled") {
      if (!metaTitle) {
        return NextResponse.json(
          { message: "META TITLE is required in the Google Doc" },
          { status: 400 }
        );
      }
      if (!metaDescription && !parsed.mtDesc) {
        return NextResponse.json(
          { message: "META DESCRIPTION or MT DESC is required in the Google Doc" },
          { status: 400 }
        );
      }
      if (!blogContentHtml) {
        return NextResponse.json(
          { message: "BLOG CONTENT is required in the Google Doc" },
          { status: 400 }
        );
      }
    }

    // Compatible with existing renderer: rich HTML lives in blogBody[].metaDescription
    // (see Section2 getRichDescription). Google META TITLE maps to blogBody[].metaTitle.
    // When it matches / is contained in blogTitle, the public renderer hides the extra H2.
    const blogBody = [
      {
        metaTitle: metaTitle || blogTitle,
        metaDescription: blogContentHtml || "",
        innerImg: "",
      },
    ];

    const blogDescription = blogContentHtml || "";

    const isLive = publishStatus === "published";
    const publishedAt =
      publishStatus === "published"
        ? new Date()
        : publishStatus === "scheduled"
          ? null
          : null;

    const newBlog = await RitzBlogModel.create({
      blogTitle,
      blogBanner: blogBannerPath,
      blogBody,
      metaKeywords: metaKeywords || undefined,
      blogCategoryId: fetchCat!._id,
      blogStatus: isLive,
      publishStatus,
      scheduledAt: publishStatus === "scheduled" ? scheduledAt : undefined,
      publishedAt,
      blogSlug,
      blogDescription,
      mtDesc: mtDesc || undefined,
      blogAuthor,
    });

    const activityLabel =
      publishStatus === "draft"
        ? "saved a draft blog"
        : publishStatus === "scheduled"
          ? "scheduled a blog"
          : "added a new blog";

    const newManagementActivity = new ManagementActivitiesModel({
      managementId: actor._id,
      activity: `User ${actor.name} (${actor.email}) ${activityLabel}: ${blogTitle}`,
      activityTime: new Date(),
    });
    await newManagementActivity.save();

    if (publishStatus === "scheduled") {
      const { ensureScheduledBlogScheduler } = await import(
        "@/lib/scheduledBlogScheduler"
      );
      ensureScheduledBlogScheduler();
    }

    if (isLive) {
      await revalidateBlogListingPages();
    }

    return NextResponse.json(
      {
        message:
          publishStatus === "draft"
            ? "Draft saved successfully"
            : publishStatus === "scheduled"
              ? "Blog scheduled successfully. It will publish automatically at the chosen time."
              : "Blog published successfully",
        blog: newBlog,
        scheduledAt:
          publishStatus === "scheduled" && scheduledAt
            ? scheduledAt.toISOString()
            : undefined,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const err = error as { code?: number; keyPattern?: Record<string, unknown>; message?: string };

    if (err?.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || "field";
      const friendlyField =
        field === "blogTitle" ? "title" : field === "blogSlug" ? "URL slug" : field;
      return NextResponse.json(
        {
          message: `A blog with this ${friendlyField} already exists. Please use a different ${friendlyField} or edit the existing blog.`,
        },
        { status: 409 }
      );
    }

    console.error("[import-google-doc] Unexpected error:", err?.message || error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
