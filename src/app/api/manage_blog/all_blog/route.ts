import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db"; // Ensure you have this function set up

export async function GET() {
    try {
        const pool = getDBPool();
        const [rows] = await pool.query("SELECT b.*, c.id AS category_id, c.name AS category_name FROM blogs AS b INNER JOIN categories AS c ON b.category_id = c.id ORDER BY b.id DESC");

        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}
