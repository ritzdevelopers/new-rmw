import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectMongoDB } from "@/lib/mongo/dbConntect";
import TrafficModel from "@/models/Traffic";
import ManagementModel from "@/models/Management";
import jwt from "jsonwebtoken";
function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

/**
 * Stable unique id from IP + request payload + time + Math.random(), then hashed.
 */
function generateSessionId(ip: string, dataFingerprint: string): string {
  const entropy = `${ip}|${dataFingerprint}|${Date.now()}|${Math.random()}`;
  return crypto.createHash("sha256").update(entropy).digest("hex").slice(0, 40);
}

function inferDevice(userAgent: string): string {
  if (!userAgent) return "unknown";
  if (/mobile|android|iphone|ipad|ipod|webos/i.test(userAgent)) return "mobile";
  return "desktop";
}

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const url = typeof body.url === "string" ? body.url.trim() : "";
    if (!url) {
      return NextResponse.json({ message: "url is required" }, { status: 400 });
    }

    const userIP = getClientIp(req);
    const userAgent = req.headers.get("user-agent") || "";
    const refererHeader = req.headers.get("referer") || "";
    const referrer =
      typeof body.referrer === "string" && body.referrer
        ? body.referrer
        : refererHeader;

    const extra =
      body.data !== undefined
        ? String(body.data)
        : body.metadata !== undefined
          ? String(body.metadata)
          : "";

    const dataFingerprint = JSON.stringify({
      url,
      referrer,
      extra,
    });

    const providedSessionId =
      typeof body.sessionId === "string" ? body.sessionId.trim() : "";

    if (providedSessionId) {
      const alreadyTracked = await TrafficModel.findOne({
        sessionId: providedSessionId,
        url,
      }).lean();
      if (alreadyTracked) {
        return NextResponse.json(
          {
            success: true,
            message: "Visit already recorded",
            sessionId: providedSessionId,
            duplicate: true,
          },
          { status: 200 }
        );
      }
    }

    const sessionId =
      providedSessionId || generateSessionId(userIP, dataFingerprint);

    const country =
      typeof body.country === "string" && body.country
        ? body.country
        : undefined;

    await TrafficModel.create({
      url,
      userIP,
      userAgent,
      referrer,
      sessionId,
      visitDate: new Date(),
      country,
      device: inferDevice(userAgent),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Visit recorded",
        sessionId,
        duplicate: false,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in tracker API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

