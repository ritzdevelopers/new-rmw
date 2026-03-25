import { getServiceThirdData } from "@/lib/getServiceThirdLayerData";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const data = await getServiceThirdData(Number(params.id));

    return NextResponse.json({
        success: true,
        data,
    });
}