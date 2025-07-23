import { getDBPool } from "@/lib/db";
import { NextResponse } from "next/server";

// ./src/app/api/user-ip-tracker/route.ts
// import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Read IP from 'x-forwarded-for' header (standard in proxies/CDNs like Vercel)
    const forwarded = req.headers.get("x-forwarded-for");

    // Fallback IP if header is missing
    const ip = forwarded?.split(",")[0]?.trim() || "Unknown";

    return NextResponse.json({ IP_ADDRESS: ip }, { status: 200 });
  } catch (error) {
    console.error("Error fetching IP:", error);
    return NextResponse.json({ error: "Failed to fetch IP" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user_ip } = await req.json();

    if (!user_ip) {
      return NextResponse.json({ message: "User IP is required!" }, { status: 400 });
    }

    const db = getDBPool();
    await db.execute("INSERT INTO users_ip (user_ip) VALUES (?)", [user_ip]);

    return NextResponse.json({ message: "User IP saved successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error saving user IP to database:", error);
    return NextResponse.json({ message: "Internal Server Error!" }, { status: 500 });
  }
}