import UserAnalyticModel from "@/models/User.Analytics.Schema";
import { FilterQuery } from "mongoose";
import { getFilterDate } from "../utils/ExtractDate";
import { convertUsersToKMCr } from "../utils/CountHandler";
import { getPercentage } from "../utils/GetPercentage";

// Interface for UserAnalytic document (partial)
interface IUserAnalytic {
  createdAt?: Date;
  userRevisitCount?: number;
  userTotalVisitTime?: number;
}

export function durationConverter(duration: string): number {
  let dur;
  switch (duration) {
    case "Last 7 Days":
      dur = 7;
      break;
    case "Last 30 Days":
      dur = 30;
      break;
    case "Last 6 Month":
      dur = 182;
      break;
    case "Last 1 Year":
      dur = 365;
      break;
    default:
      dur = NaN;
  }
  return dur;
}

export function doubleDuration(duration: string): number {
  let dur;
  switch (duration) {
    case "Last 7 Days":
      dur = 14;
      break;
    case "Last 30 Days":
      dur = 61;
      break;
    case "Last 6 Month":
      dur = 365;
      break;
    case "Last 1 Year":
      dur = 730;
      break;
    default:
      dur = NaN;
  }
  return dur;
}

function timeConverter(sec: string): number | string {
  let dur;
  switch (sec) {
    case "Revisit":
      dur = "Revisit";
      break;
    case "More Than 10 Sec":
      dur = 10;
      break;
    case "More Than 30 Sec":
      dur = 30;
      break;
    case "More Than 1 Min":
      dur = 60;
      break;
    default:
      dur = "All Sessions";
  }
  return dur;
}
interface DATA {
  userRevisitCount: number;
}
export async function GetAllSessions(duration: string, dataFilter: string) {
  const acDuration = durationConverter(duration);
  const filterDuration = !isNaN(acDuration) ? getFilterDate(acDuration) : NaN;
  const dblDuration = doubleDuration(duration);
  const compDate = !isNaN(dblDuration) ? getFilterDate(dblDuration) : NaN;
  const seconds = timeConverter(dataFilter);
  const query: FilterQuery<IUserAnalytic> = {};
  let allSessions = false;
  if (!isNaN(acDuration)) {
    query.createdAt = { $gte: filterDuration };
  }
  if (seconds === "Revisit") {
    query.userRevisitCount = { $gte: 2 };
  } else if (seconds === "All Sessions") {
    allSessions = true;
  } else if (typeof seconds === "number") {
    query.userTotalVisitTime = { $gte: seconds };
  }
  const query2: FilterQuery<IUserAnalytic> = {};
  if (!isNaN(dblDuration)) {
    query2.createdAt = { $gte: compDate };
  }
  let data = [];
  let sessionsCount = 0;
  if (allSessions) {
    const data: DATA[] = await UserAnalyticModel.find(query, {
      userRevisitCount: 1,
      _id: 0,
    });
    if (data) {
      data.forEach((dt) => {
        sessionsCount += dt.userRevisitCount;
      });
    }
  } else {
    data = await UserAnalyticModel.find(query);
  }
  let comparisionCount = 0;
  let comparionData = [];

  if (allSessions) {
    const data: DATA[] = await UserAnalyticModel.find(query2, {
      userRevisitCount: 1,
      _id: 0,
    });
    if(data) {
      data.forEach((dt) => {
        comparisionCount += dt.userRevisitCount;
      });
    }
  } else {
    comparionData = await UserAnalyticModel.find(query2, {
      userRevisitCount: 1,
      _id: 0,
    });
  }

  const totalSessions = convertUsersToKMCr(
    data.length > 0 ? data.length : sessionsCount
  );
  const performanceAvg = getPercentage(
    comparionData.length > 0 ? comparionData.length : comparisionCount,
    data.length > 0 ? data.length : sessionsCount
  );
  return {
    totalSessions,
    performanceAvg,
  };
}
