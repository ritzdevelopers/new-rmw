// import { NextRequest, NextResponse } from "next/server";
// import { getAllUsersQuery } from "./temp/GetAllUsers";
// import { GetAllSessions } from "./temp/GetAllSessions";
// import { getAllBounceRate } from "./temp/GetAllBounce";
// import { getALlAverageVisitDuration } from "./temp/GetAverageVistiDuration";
// import { connectMongoDB } from "@/lib/mongo/dbConntect";
// import { getAllDevicesInfo } from "./temp/GetDevicesInfo";
// import { getUserTravelsPath } from "./temp/GetAllUserTravelsPath";
// import { getUserRefferalSources } from "./temp/GetUserRefferalSources";
// import { getUserSpendTimeOnEveryPage } from "./temp/GetUserPageActivities";
// import { getAllSessionsWithCityWise } from "./temp/GetAllSessionCityWise";

// type FILTER =
//   | "Revisit"
//   | "More Than 10 Sec"
//   | "More Than 30 Sec"
//   | "More Than 1 Min"
//   | "All Sessions";

// type TYPE = "Total" | "Revisit" | "Unique" | "Organic";

// type DURATION =
//   | "All Time"
//   | "Last 7 Days"
//   | "Last 30 Days"
//   | "Last 6 Month"
//   | "Last 1 Year";

// interface RequestBody {
//   queryType: string;
//   duration: DURATION;
//   filter: FILTER;
//   qType: TYPE;
// }
// type DevicesInfo = object[]; // Agar tumhe exact structure pata hai to yaha strongly type kar sakte ho
// type TotalUsers = { totalUsers: string; performanceAvg: string };
// type SessionCount = { totalSessions: string; performanceAvg: string };
// type BounceRate = { totalBounceUsers: string; lastUsersBounceRate: string };
// type AvgVisitDuration = { usersSpentTime: string; lastSpentTimeAvg: string };
// type SessionAnalyticsByCity = {
//   totalSessions: number;
//   totalSessionsRaw: number;
//   cityWise: Record<string, unknown>;
//   cityWiseRaw: Record<string, unknown>;
// };
// type UserTravelPaths = Record<string, number>;
// type UserReferralSources = Record<string, number>;
// type UserPageActivity = Record<string, object>;

// type AnalyticsData =
//   | DevicesInfo
//   | TotalUsers
//   | SessionCount
//   | BounceRate
//   | AvgVisitDuration
//   | SessionAnalyticsByCity
//   | UserTravelPaths
//   | UserReferralSources
//   | UserPageActivity;

// interface AnalyticsResponse {
//   queryType: string;
//   data: AnalyticsData;
// }

// export async function POST(req: NextRequest) {
//   try {
//     await connectMongoDB();
//     const body: RequestBody = await req.json();
//     const { queryType, duration, filter, qType } = body;

//     const responseData: AnalyticsResponse[] = [];

//     // Devices info always included
//     const devicesData = await getAllDevicesInfo();
//     responseData.push({ queryType: "Devices Info", data: devicesData });

//     const runQuery = async (type: string, fn: Function) => {
//       const data = await fn(duration, filter, qType);
//       responseData.push({ queryType: type, data });
//     };

//     if (queryType === "All") {
//       await runQuery("Total Users", getAllUsersQuery);
//       await runQuery("Session Count", GetAllSessions);
//       await runQuery("Bounce Rate", getAllBounceRate);
//       await runQuery("Avg. Visit Duration", getALlAverageVisitDuration);
//       await runQuery("Session Analytics By City", getAllSessionsWithCityWise);
//       await runQuery("User Travel Paths", getUserTravelsPath);
//       await runQuery("User Referral Sources", getUserRefferalSources);
//       await runQuery("User Page Activity", getUserSpendTimeOnEveryPage);
//     } else {
//       switch (queryType) {
//         case "Total Users":
//           await runQuery("Total Users", getAllUsersQuery);
//           break;
//         case "Session Count":
//           await runQuery("Session Count", GetAllSessions);
//           break;
//         case "Bounce Rate":
//           await runQuery("Bounce Rate", getAllBounceRate);
//           break;
//         case "Avg. Visit Duration":
//           await runQuery("Avg. Visit Duration", getALlAverageVisitDuration);
//           break;
//         case "Session Analytics By City":
//           await runQuery(
//             "Session Analytics By City",
//             getAllSessionsWithCityWise
//           );
//           break;
//         case "User Travel Paths":
//           await runQuery("User Travel Paths", getUserTravelsPath);
//           break;
//         case "User Referral Sources":
//           await runQuery("User Referral Sources", getUserRefferalSources);
//           break;
//         case "User Page Activity":
//           await runQuery("User Page Activity", getUserSpendTimeOnEveryPage);
//           break;
//       }
//     }
//     console.log(responseData);

//     return NextResponse.json({ success: true, data: responseData });
//   } catch (error) {
//     console.error("Internal Server Error:", error);
//     return NextResponse.json(
//       {
//         message:
//           error instanceof Error ? error.message : "Internal Server Error",
//         success: false,
//       },
//       { status: 500 }
//     );
//   }
// }
