import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { UAParser } from "ua-parser-js";

// // ✅ POST: Log a visit (Only increases visitor count if no cookie is found)
// export async function POST(req: NextRequest) {
//   try {
//     const pool = await getDBPool();
//     const { searchParams } = new URL(req.url);
//     const url = searchParams.get("url");
//     const browser = req.headers.get("user-agent") || "unknown";

//     if (!url) {
//       return NextResponse.json({ error: "URL is required" }, { status: 400 });
//     }

//     // ✅ Get visitor cookie
//     const cookieStore = await cookies();
//     let userId = cookieStore.get("visitor_id")?.value;

//     if (userId) {
//       // ✅ If user already has a cookie, just update last_visited
//       await pool.execute(
//         "UPDATE visit_logs SET last_visited = CURRENT_TIMESTAMP WHERE url = ? AND user_id = ?",
//         [url, userId]
//       );
//       return NextResponse.json({
//         success: true,
//         message: "Visitor already recorded",
//       });
//     } else {
//       // ✅ If no cookie, generate new visitor ID & set cookie
//       userId = uuidv4();
//       const response = NextResponse.json({
//         success: true,
//         message: "New visitor recorded",
//       });
//       response.cookies.set("visitor_id", userId, {
//         httpOnly: true,
//         secure: true,
//         maxAge: 60 * 60 * 24 * 30,
//       });

//       // ✅ Insert new visitor with count
//       await pool.execute(
//         "INSERT INTO visit_logs (url, user_id, browser, visitors) VALUES (?, ?, ?, 1)",
//         [url, userId, browser]
//       );
//       return response;
//     }
//   } catch (error) {
//     console.error("Error logging visit:", error);
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const pool = await getDBPool();
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    const rawBrowser = req.headers.get("user-agent") || "unknown";
    const parser = new UAParser(rawBrowser);
    const parsed = parser.getResult();
    const browser = parsed.browser.name;
    console.log("Browser : ", browser);

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const cookieStore = cookies();
    let userId = (await cookieStore).get("visitor_id")?.value;
    let isNewVisitor = false;

    if (!userId) {
      userId = uuidv4();
      isNewVisitor = true;
    }

    // ✅ Check if this user has already visited this URL
    const [rows] = await pool.query(
      "SELECT * FROM visit_logs WHERE url = ? AND user_id = ?",
      [url, userId]
    );

    if ((rows as any[]).length > 0) {
      // ✅ Visitor exists → update visit count and last_visited
      await pool.execute(
        `UPDATE visit_logs 
         SET visitors = visitors + 1, last_visited = CURRENT_TIMESTAMP 
         WHERE url = ? AND user_id = ?`,
        [url, userId]
      );
    } else {
      // ✅ New visitor for this URL → insert row
      await pool.execute(
        `INSERT INTO visit_logs (url, user_id, browser, visitors) 
         VALUES (?, ?, ?, 1)`,
        [url, userId, browser]
      );
    }

    const response = NextResponse.json({
      success: true,
      message: isNewVisitor ? "New visitor recorded" : "Visit updated",
    });

    // ✅ Set cookie only if new
    if (isNewVisitor) {
      response.cookies.set("visitor_id", userId, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return response;
  } catch (error) {
    console.error("Error logging visit:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
