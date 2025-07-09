import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzCats from "@/models/RitzCats.Schema";

// Utility to create slug from category name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") 
    .replace(/\s+/g, "-");  
}

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    console.log('====================================');
    console.log("API HIT");
    console.log('====================================');
    // Parse the body safely
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

    if (!categoryName) {
      return NextResponse.json(
        { message: "Category name is required", success: false },
        { status: 400 }
      );
    }

    const categorySlug = generateSlug(categoryName);

    // Create a new category document
    const newCategory = new RitzCats({
      categoryName,
      categorySlug,
      categoryMetaTitle,
      categoryMetaDescription,
      categoryMetaKeywords,
    });

    // Save to DB
    await newCategory.save();

    return NextResponse.json(
      {
        message: "Category added successfully",
        success: true,
        data: newCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in addNewCategory controller:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}