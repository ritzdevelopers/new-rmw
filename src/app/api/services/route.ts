import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2/promise";
import { getDBPool } from "@/lib/db"; // Assuming your DB connection file is in `lib/db.ts`

export async function GET() {
  try {
    const db = getDBPool(); // Get the database pool connection
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM services"); // Fetch data from `services` table

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
