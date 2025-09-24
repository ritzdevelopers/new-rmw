// import UserAnalyticModel from "@/models/User.Analytics.Schema";
// import { getFilterDate } from "../utils/ExtractDate";
// import { durationConverter } from "./GetAllUsers";
// import { FilterQuery } from "mongoose";
// import { connectMongoDB } from "@/lib/mongo/dbConntect";
// interface QUERY {
//   createdAt?: Date;
// }
// interface SUBOBJ {
//   pageLink: string;
//   timeCount: number;
// }
// interface OBJ {
//   userVisitTimePerPage: SUBOBJ[];
// }
// function formatTime(seconds: number) {
//   const hrs = Math.floor(seconds / 3600);
//   const mins = Math.floor((seconds % 3600) / 60);
//   const secs = seconds % 60;

//   return {
//     hours: hrs,
//     minutes: mins,
//     seconds: secs,
//     formatted: `${hrs}h ${mins}m ${secs}s`
//   };
// }

// export async function getUserSpendTimeOnEveryPage(duration: string) {
//   await connectMongoDB();
//   const extractDay = durationConverter(duration);
//   const filterDate = !isNaN(extractDay) ? getFilterDate(extractDay) : NaN;
//   const query: FilterQuery<QUERY> = {};
//   if (!isNaN(extractDay)) {
//     query.createdAt = { $gte: filterDate };
//   }

//   const data = await UserAnalyticModel.find(query, {
//     userVisitTimePerPage: 1,
//     _id: 0,
//   });

//   let userSpentTimeOnPage: { [key: string]: any } = {};

//   data.forEach((obj: OBJ) => {
//     obj.userVisitTimePerPage.forEach((doc) => {
//       const link = doc.pageLink,
//         count = doc.timeCount; // yeh assume karte hain ki seconds me stored hai
//       userSpentTimeOnPage[link] = (userSpentTimeOnPage[link] ?? 0) + count;
//     });
//   });

//   // format kar ke return karenge
//   const formattedResult: { [key: string]: any } = {};
//   Object.entries(userSpentTimeOnPage).forEach(([link, totalSec]) => {
//     formattedResult[link] = formatTime(totalSec as number);
//   });

//   return formattedResult;
// }

