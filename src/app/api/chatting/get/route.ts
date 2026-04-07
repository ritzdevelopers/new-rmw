import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET(request: Request) {
    try {
        const db = getDBPool();
        const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM user_chatting_history");
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}