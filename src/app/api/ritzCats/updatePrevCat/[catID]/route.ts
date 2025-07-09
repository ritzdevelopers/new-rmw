import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzCats from "@/models/RitzCats.Schema";
import { NextRequest, NextResponse } from "next/server";

// Utility to generate slug
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { catID: string } }
) {
  try {
    await connectMongoDB();

    const catID = params.catID;
    if (!catID) {
      return NextResponse.json(
        {
          message: "Category ID not provided",
          success: false,
        },
        { status: 400 }
      );
    }

    const {
      categoryName,
      categoryMetaTitle,
      categoryMetaDescription,
      categoryMetaKeywords,
    }: {
      categoryName: string;
      categoryMetaTitle?: string;
      categoryMetaDescription?: string;
      categoryMetaKeywords?: string[];
    } = await request.json();

    const categorySlug = generateSlug(categoryName);

    const updatedCategory = await RitzCats.findByIdAndUpdate(
      catID,
      {
        categoryName,
        categorySlug,
        categoryMetaTitle,
        categoryMetaDescription,
        categoryMetaKeywords,
      },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return NextResponse.json(
        {
          message: "Category not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Category updated successfully!",
        success: true,
        data: updatedCategory,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in update category controller:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}