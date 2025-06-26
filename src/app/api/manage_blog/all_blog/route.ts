// import { NextResponse } from "next/server";
// import { getDBPool } from "@/lib/db"; // Ensure you have this function set up

// export async function GET() {
//   try {
//     const pool = getDBPool();
//     const [rows] = await pool.query(
//       "SELECT b.*, c.id AS category_id, c.name AS category_name FROM blogs AS b INNER JOIN categories AS c ON b.category_id = c.id ORDER BY b.id DESC"
//     );

//     return NextResponse.json(rows, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch blogs" },
//       { status: 500 }
//     );
//   }
// }

// /app/api/manage_blog/all_blog/route.ts (or wherever your API route is)

import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const pool = getDBPool();

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 15;
    const search = url.searchParams.get("search")?.toLowerCase() || "";
    const category = url.searchParams.get("category") || "All";

    const offset = (page - 1) * limit;

    // Base query
    let baseQuery = `
      FROM blogs AS b
      INNER JOIN categories AS c ON b.category_id = c.id
      WHERE 1=1
    `;

    // Add search filter
    if (search) {
      baseQuery += ` AND LOWER(b.title) LIKE ? `;
    }

    // Add category filter
    if (category !== "All") {
      baseQuery += ` AND c.name = ? `;
    }

    // Query parameters array
    const queryParams: any[] = [];
    if (search) queryParams.push(`%${search}%`);
    if (category !== "All") queryParams.push(category);

    // Total count query
    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total ${baseQuery}`,
      queryParams
    );

    const total = (countResult as any)[0].total;

    // Fetch paginated blogs
    const [rows] = await pool.query(
      `SELECT b.*, c.id AS category_id, c.name AS category_name ${baseQuery} ORDER BY b.id DESC LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    return NextResponse.json({ blogs: rows, total }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
