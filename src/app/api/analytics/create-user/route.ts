import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("This is user quarry ", data);

    return NextResponse.json(
      { message: "User Created Successfully!", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log(
      "Internal Server Errors In Create New User For Analytics",
      error
    );
    return NextResponse.json(
      { message: "Internal Server Errors!", error },
      { status: 500 }
    );
  }
}
