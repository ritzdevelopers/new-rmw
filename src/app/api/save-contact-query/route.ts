import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db"; // adjust path if needed

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, query } = body;

    if (!name || !phone || !email || !service || !query) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const pool = getDBPool();

    await pool.execute(
      "INSERT INTO contactQueries (name, phone, email, service, query) VALUES (?, ?, ?, ?, ?)",
      [name, phone, email, service, query]
    );

    return NextResponse.json({ message: "Query submitted successfully" });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
