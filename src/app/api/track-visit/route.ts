import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

// ✅ POST: Log a visit (Only increases visitor count if no cookie is found)
export async function POST(req: NextRequest) {
  
  try {
    const pool = await getDBPool();
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    const browser = req.headers.get("user-agent") || "unknown";

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // ✅ Get visitor cookie
    const cookieStore = await cookies();
    let userId = cookieStore.get("visitor_id")?.value;

    if (userId) {
      // ✅ If user already has a cookie, just update last_visited
      await pool.execute(
        "UPDATE visit_logs SET last_visited = CURRENT_TIMESTAMP WHERE url = ? AND user_id = ?",
        [url, userId]
      );
      return NextResponse.json({ success: true, message: "Visitor already recorded" });
    } else {
      // ✅ If no cookie, generate new visitor ID & set cookie
      userId = uuidv4();
      const response = NextResponse.json({ success: true, message: "New visitor recorded" });
      response.cookies.set("visitor_id", userId, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 30 });

      // ✅ Insert new visitor with count
      await pool.execute(
        "INSERT INTO visit_logs (url, user_id, browser, visitors) VALUES (?, ?, ?, 1)",
        [url, userId, browser]
      );
      return response;
    }
  } catch (error) {
    console.error("Error logging visit:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
