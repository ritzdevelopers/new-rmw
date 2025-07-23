import { connectMongoDB } from "@/lib/mongo/dbConntect";
import RitzCats from "@/models/RitzCats.Schema";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest,
    { params }: { params: { catID: string } }) {
    try {
        await connectMongoDB();
        const catID = params.catID;
        if (!catID) {
            return NextResponse.json({
                message: "Category Id Not Found, Please Try Again !",
                success: false,
            }, {
                status: 404,
            });
        }
        await RitzCats.findByIdAndDelete(catID);
        return NextResponse.json({
            message: "Category Deleted Successfully!",
            success: true,
        }, {
            status: 200,
        })
    } catch (error) {
        // console.log('====================================');
        console.log("There are some error in your delete single category controller plz fix the bug first ", error);
        // console.log('====================================');
        return NextResponse.json({
            message: "Internal Server Error",
            success: false,
        }, {
            status: 500,
        })
    }
}