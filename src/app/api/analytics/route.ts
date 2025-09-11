import { NextRequest, NextResponse } from "next/server";
import { getAllUsersQuery } from "./temp/GetAllUsers";
import { GetAllSessions } from "./temp/GetAllSessions";
import { getAllBounceRate } from "./temp/GetAllBounce";
import { getALlAverageVisitDuration } from "./temp/GetAverageVistiDuration";
// import { getAllSessionsWithCityWise } from "./temp/GetAllSessionCityWise";
type FILTER =
  | "Revisit"
  | "More Than 10 Sec"
  | "More Than 30 Sec"
  | "More Than 1 Min"
  | "All Sessions";

type TYPE = "Total" | "Revisit" | "Unique" | "Organic";

type DURATION =
  | "All Time"
  | "Last 7 Days"
  | "Last 30 Days"
  | "Last 6 Month"
  | "Last 1 Year";

interface RequestBody {
  queryType: string;
  duration: DURATION;
  filter: FILTER;
  qType: TYPE;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    const { queryType, duration, filter, qType } = body;
    // Mandatory Queries ::=> Session Analytics, User Devices
    console.log({ queryType, duration, filter, qType });
    const data = {};
    if (queryType === "Get All Users") {
      const data = getAllUsersQuery(duration);
      console.log(data);
    } else if (queryType === "Session Count") {
      const data = GetAllSessions(duration, filter);
      console.log(data);
    } else if (queryType === "Bounce Rate") {
      const data = getAllBounceRate(duration);
      console.log(data);
    } else if (queryType === "Avg. Visit Duration") {
      const data = getALlAverageVisitDuration(duration);
      console.log(data);
    } else if (queryType === "Total Leads") {
    } else if (queryType === "Session Analytics By City") {
      // const data = getAllSessionsWithCityWise(duration, qType);
    } else if (queryType === "User Travel Paths") {
    } else if (queryType === "User Referral Sources") {
    } else if (queryType === "User Page Activity") {
    }
    console.log(data);

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.log("Internal Server Errors!", error);

    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
