// import UserAnalyticModel from "@/models/User.Analytics.Schema";
// import { durationConverter } from "./GetAllUsers";
// import { getFilterDate } from "../utils/ExtractDate";
// import { connectMongoDB } from "@/lib/mongo/dbConntect";
// import { FilterQuery } from "mongoose";
// interface OBJ {
//   pageLink: string;
//   timeCount: Number;
// }
// interface TRAVELHISTORY {
//   linkName: string;
// }
// interface LINKLIST {
//   user: number;
//   travelHistory: TRAVELHISTORY[];
// }
// interface QTYPE {
//   userRevisitCount?: number;
//   trafficSource?: string;
//   createdAt: Date;
// }
// export async function getUserTravelsPath(duration: string) {
//   await connectMongoDB();
//   const dayForFilter = durationConverter(duration);
//   const filterDate = !isNaN(dayForFilter) ? getFilterDate(dayForFilter) : NaN;
//   const query: FilterQuery<QTYPE> = {};

//   if (!isNaN(dayForFilter)) {
//     query.createdAt = { $gte: filterDate };
//   }

//   const allData = await UserAnalyticModel.find(query, {
//     userVisitTimePerPage: 1,
//     _id: 0,
//   });

//   let usersPath: string[] = [];
//   if (allData.length > 0) {
//     allData.forEach((doc) => {
//       doc.userVisitTimePerPage.forEach((obj: OBJ) => {
//         const link = linksTracker(obj.pageLink);

//         if (link) return usersPath.push(link);
//       });
//     });
//   }
//   let userTravelData: { [key: string]: number } = {};
//   if (usersPath.length > 0) {
//     for (let i = 1; i < usersPath.length; i++) {
//       if (!usersPath[i].includes(usersPath[i - 1])) {
//         const path = usersPath[i - 1] + "To" + usersPath[i];
//         userTravelData[path] = (userTravelData[path] ?? 0) + 1;
//       }
//     }
//   }

//   const sortedUserTravelPath = Object.fromEntries(
//     Object.entries(userTravelData).sort(([, a], [, b]) => b - a)
//   );
//   return sortedUserTravelPath;
// }

// function linksTracker(link: string) {
//   const cleanedLink = link.toLowerCase().replace(/^https?:\/\/(www\.)?/, "");

//   if (cleanedLink.includes("ritzmediaworld.com/about.html")) return "About";
//   if (cleanedLink.includes("ritzmediaworld.com/work.html")) return "Work";
//   if (cleanedLink.includes("ritzmediaworld.com/services")) return "Services";
//   if (cleanedLink.includes("ritzmediaworld.com/contact.html")) return "Contact";
//   if (cleanedLink.includes("ritzmediaworld.com/career")) return "Career";

//   // ✅ Agar sirf homepage ho
//   if (
//     cleanedLink === "ritzmediaworld.com" ||
//     cleanedLink === "ritzmediaworld.com/" ||
//     cleanedLink.startsWith("ritzmediaworld.com/?")
//   ) {
//     return "Home";
//   }

//   // ✅ Baaki jitne bhi slugs aayenge (jaise /top-10-hindi-newspapers-in-india-today-which-are-popular-in-students)
//   // sabko Blogs category mein daal do
//   if (cleanedLink.startsWith("ritzmediaworld.com/")) return "Blogs";
// }
