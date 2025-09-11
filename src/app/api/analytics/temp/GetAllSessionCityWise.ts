// import UserAnalyticModel from "@/models/User.Analytics.Schema";
// import { getFilterDate } from "../utils/ExtractDate";
// import { durationConverter } from "./GetAllUsers";
// import { FilterQuery } from "mongoose";
// interface QTYPE {
//   userRevisitCount?: number;
//   trafficSource?: string;
//   createdAt: Date;
// }
// type TYPE = "Total" | "Revisit" | "Unique" | "Organic";
// interface DATA {
//   user: string;
//   userAddress: {
//     userCity: string;
//   };
//   userRevisitCount: number;
// }

// export async function getAllSessionsWithCityWise(
//   duration: string,
//   queryType: TYPE
// ) {
//   const filterDuration = durationConverter(duration);
//   const filterDate = !isNaN(filterDuration)
//     ? getFilterDate(filterDuration)
//     : NaN;
//   const query: FilterQuery<QTYPE> = {};
//   if (queryType === "Revisit") {
//     query.userRevisitCount = { $gte: 2 };
//     query.createdAt = { $gte: filterDate };
//   } else if (queryType === "Organic") {
//     query.userRevisitCount = { $regex: "google\\.com", $options: "i" };
//     query.createdAt = { $gte: filterDate };
//   }
//   let data: DATA[] = [];
//   let totalSessions = 0;
//   if (query) {
//     data = await UserAnalyticModel.find(query);
//   } else if (queryType == "Unique") {
//     data = await UserAnalyticModel.find({
//       createdAt: { $gte: filterDate },
//     });
//   } else if (queryType === "Total") {
//     data = await UserAnalyticModel.find({
//       userRevisitCount: { $gte: 1 },
//       createdAt: { $gte: filterDate },
//     });
//   }
//   let cityWithSessions = {};
//   if (data) {
//     for (let val of data) {
//       cityWithSessions[val.userAddress.userCity] = (pr) =>
//         (pr += val.userRevisitCount);
//     }
//   }
// }
