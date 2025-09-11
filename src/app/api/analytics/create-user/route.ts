import { connectMongoDB } from "@/lib/mongo/dbConntect";
import UserAnalyticModel from "@/models/User.Analytics.Schema";
import { NextResponse } from "next/server";

interface OBJ {
  timeCount: number;
  pageLink: string;
}

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    console.log("API HIT");

    const text = await req.text(); // read raw
    const data = text ? JSON.parse(text) : {};
    if (!data) {
      return NextResponse.json(
        { message: "Data not found!", succeess: false },
        { status: 500 }
      );
    }
    const userAgent = req.headers.get("user-agent") || "";

    let userDevice = "desktop";

    if (
      /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
    ) {
      userDevice = "mobile";
    }

    const { user, userVisitTimePerPage, trafficSource, userAddress } = data;
    console.log(
      user,
      userAddress,
      userDevice,
      trafficSource,
      userVisitTimePerPage
    );

    let userTotalVisitTime = 0;
    let isUserBounce = true;
    userVisitTimePerPage.forEach((ele: OBJ) => {
      userTotalVisitTime += ele.timeCount;
    });
    if (userTotalVisitTime >= 10) {
      isUserBounce = false;
    }
    console.log(
      user,
      userAddress,
      isUserBounce,
      userTotalVisitTime,
      userDevice,
      trafficSource,
      userVisitTimePerPage
    );

    const result = await UserAnalyticModel.create({
      user,
      userAddress,
      isUserBounce,
      userTotalVisitTime,
      userRevisitCount: 1,
      userDevice,
      trafficSource,
      userVisitTimePerPage,
    });
    console.log("Saved Result Data ", result);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error in create-user API:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
