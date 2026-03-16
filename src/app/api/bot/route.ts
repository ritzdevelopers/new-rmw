import { NextRequest, NextResponse } from "next/server";
import send_telegram_notification from "@/lib/telegram_bot";
export async function POST(req: NextRequest) {
    const telegram_bot_token = process.env.TELEGRAM_BOT_TOKEN;
    const telegram_chat_id = process.env.TELEGRAM_CHAT_ID;
    try {
        const response = await fetch(`https://api.telegram.org/bot${telegram_bot_token}/sendMessage`, {
            method: 'POST',
            body: JSON.stringify({
                chat_id: telegram_chat_id,
                text: 'Hello, this is a test notification from the Telegram bot.',
            }),
        });
        const data = await response.json();
        console.log('Telegram notification sent successfully:', data);
        return NextResponse.json({ message: 'Telegram notification sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending Telegram notification:', error);
        return NextResponse.json({ error: 'Failed to send Telegram notification' }, { status: 500 });
    }
}