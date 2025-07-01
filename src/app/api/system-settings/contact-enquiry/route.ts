import { getDBPool } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/enquiries
export async function GET() {
  try {
    const db = getDBPool();
    const [rows] = await db.query(
      "SELECT * FROM enquiries ORDER BY send_date DESC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET Enquiries Error:", error);
    return new NextResponse("Failed to fetch enquiries", { status: 500 });
  }
}

// POST /api/enquiries
export async function POST(request: Request) {
  try {
    const db = getDBPool();
    const body = await request.json();
    const { etype, name, email, mobile, message } = body;

    if (!etype || !name || !email || !message) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const query = `
      INSERT INTO enquiries (etype, name, email, mobile, message)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [etype, name, email, mobile || "", message];

    await db.query(query, values);

    return new NextResponse("Enquiry submitted successfully", { status: 201 });
  } catch (error) {
    console.error("POST Enquiry Error:", error);
    return new NextResponse("Failed to submit enquiry", { status: 500 });
  }
}
