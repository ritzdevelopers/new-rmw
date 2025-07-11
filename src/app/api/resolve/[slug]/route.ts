// /app/api/resolve/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = await params;

  try {
    const pool = await getDBPool();

    // Check if it's a blog
    const [blogs] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM blogs WHERE slug = ? LIMIT 1",
      [slug]
    );
    // console.log('====================================');
    // console.log(blogs[0], 'this is mysql blog');
    // console.log('====================================');

    if (blogs.length > 0) {
      return NextResponse.json({
        type: "blog",
        blog: blogs[0],
      });
    }

    // Try to find it in service_second
    const [services] = await pool.query<RowDataPacket[]>(
      `SELECT s.link as secondLayer, ss.link as thirdLayer
       FROM services s
       JOIN service_second ss ON ss.service_id = s.id
       WHERE ss.link = ?
       LIMIT 1`,
      [slug]
    );

    if (services.length > 0) {
      const service = services[0];
      return NextResponse.json({
        type: "service",
        secondLayer: service.secondLayer,
        thirdLayer: service.thirdLayer,
      });
    }

    return NextResponse.json({ type: "not_found" }, { status: 404 });
  } catch (err) {
    console.error("Error resolving slug:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
