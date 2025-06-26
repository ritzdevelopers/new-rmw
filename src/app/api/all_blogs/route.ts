import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";

export async function GET() {
  try {
    const db = getDBPool();
    const [rows] = await db.query(
      "SELECT blog_image, title, slug, created_at FROM blogs WHERE category_id != 1 ORDER BY id DESC"
    );
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("blog data fetching error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
