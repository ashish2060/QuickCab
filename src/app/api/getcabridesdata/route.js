import dbConnect from "@/lib/db";
import cabModel from "@/lib/models/cabModel";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    dbConnect();
    const user = await currentUser();
    const cabData = await cabModel
      .find({
        clerkUserId: user.id,
      })
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: "Cab Booking Data fetched Successfull",
      data: cabData,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "error while booking cab",
    });
  }
}
