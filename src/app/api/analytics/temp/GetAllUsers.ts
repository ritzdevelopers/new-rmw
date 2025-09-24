// import UserAnalyticModel from "@/models/User.Analytics.Schema";
// import { FilterQuery } from "mongoose";
// import { getFilterDate } from "../utils/ExtractDate";
// import { convertUsersToKMCr } from "../utils/CountHandler";
// import { getPercentage } from "../utils/GetPercentage";
// import { connectMongoDB } from "@/lib/mongo/dbConntect";

// interface IUserAnalytic {
//   createdAt?: Date;
// }

// export function durationConverter(duration: string): number {
//   let dur;
//   switch (duration) {
//     case "Last 7 Days":
//       dur = 7;
//       break;
//     case "Last 30 Days":
//       dur = 30;
//       break;
//     case "Last 6 Month":
//       dur = 182;
//       break;
//     case "Last 1 Year":
//       dur = 365;
//       break;
//     default:
//       dur = NaN;
//   }
//   return dur;
// }

// export function doubleDuration(duration: string): number {
//   let dur;
//   switch (duration) {
//     case "Last 7 Days":
//       dur = 14;
//       break;
//     case "Last 30 Days":
//       dur = 61;
//       break;
//     case "Last 6 Month":
//       dur = 365;
//       break;
//     case "Last 1 Year":
//       dur = 730;
//       break;
//     default:
//       dur = NaN;
//   }
//   return dur;
// }

// export async function getAllUsersQuery(duration: string) {
//   await connectMongoDB();
//   const acDuration = durationConverter(duration);
//   const filterDuration = !isNaN(acDuration) ? getFilterDate(acDuration) : NaN;

//   const dblDuration = doubleDuration(duration);
//   const compDate = !isNaN(dblDuration) ? getFilterDate(dblDuration) : NaN;

  
//   const query: FilterQuery<IUserAnalytic> = {};
//   if (!isNaN(acDuration)) {
//     query.createdAt = { $gte: filterDuration };
//   }
//   const query2: FilterQuery<IUserAnalytic> = {};
//   if (!isNaN(dblDuration)) {
//     query2.createdAt = { $gte: compDate };
//   }
//   // console.log("This is query1 and this is query 2 ", query, "=>", query2);

//   const data = await UserAnalyticModel.find(query);
//   const comparionData = await UserAnalyticModel.find(query2);
//   const totalUsers = convertUsersToKMCr(data.length);
//   const performanceAvg = getPercentage(comparionData.length, data.length);
//   return {
//     totalUsers,
//     performanceAvg,
//   };
// }
