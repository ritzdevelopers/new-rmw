import AnalyticModel from "@/models/Analytics.Schema";
import { NextRequest } from "next/server";

interface OBJ {
  timeCount: number;
  pageLink: string;
}
export async function PATCH(req: NextRequest) {
  try {
    const txt = await req.text();
    const data = txt ? JSON.parse(txt) : {};
    const { user, userVisitTimePerPage } = data;
    const findedUser = await AnalyticModel.findOne({ user });
    if (!findedUser) {
      console.log("User Not Found, ", user, findedUser);
      return new Response(JSON.stringify({ success: false }), { status: 404 });
    }
    let count = 0;
    let isUserBounce = findedUser.isUserBounce;
    userVisitTimePerPage.forEach((ele: OBJ) => {
      count += ele.timeCount;
    });
    if (count >= 10 && isUserBounce === false) {
      isUserBounce = true;
    }
    if (isUserBounce) {
      await AnalyticModel.findByIdAndUpdate(findedUser._id, {
        $push: { userVisitTimePerPage: { $each: userVisitTimePerPage } },
        $inc: { userRevisitCount: 1, userTotalVisitTime: count },
        $set: { isUserBounce },
      });
      return new Response(JSON.stringify({ success: true }), { status: 201 });
    }
    console.log("User Bounce Again !");
    return new Response(JSON.stringify({ message: "User Bounce Again!" }), {
      status: 200,
    });
  } catch (error) {
    console.log("Internal Server Errors!", error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
