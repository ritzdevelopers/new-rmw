import { NextResponse } from "next/server";
import { getDBPool } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export async function POST(request: Request) {
    try {
        const { message } = await request.json();

        let ip = request.headers.get('x-forwarded-for');
        if (!ip) {
            return NextResponse.json({ message: "Invalid Host Request" }, { status: 400 });
        }
 
        ip = ip.split(',')[0].trim();

        const { user_message, bot_reply } = message;

        if (!user_message || !bot_reply) {
            return NextResponse.json({ message: "Invalid Message Request" }, { status: 400 });
        }

        const db = getDBPool();

        // Check user
        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT * FROM chatbot_users WHERE user_id = ?",
            [ip]
        );

        let userId: number;

        if (rows.length === 0) {
            // Create user
            const [result] = await db.query<ResultSetHeader>(
                "INSERT INTO chatbot_users (user_id) VALUES (?)",
                [ip]
            );
            userId = result.insertId;
        } else {
            userId = rows[0].id;
        }
 
        await db.query(
            "INSERT INTO user_chatting_history (user_message, bot_reply, user_id) VALUES (?, ?, ?)",
            [user_message, bot_reply, userId]
        );

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}