import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";

type VisitorData = {
  browser: string;
  visitors: number;
};

type VisitorRow = VisitorData & RowDataPacket;

export async function GET() {
  try {
    const pool = await getDBPool();

    const [rows] = await pool.query<VisitorRow[]>(
      `SELECT browser, SUM(visitors) AS visitors FROM visit_logs GROUP BY browser`
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching visitor data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
