import dbConnect from "@/lib/db";
import bookingModel from "@/lib/models/bookingModel";
import carModel from "@/lib/models/carModel";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    dbConnect();
    const user = await currentUser();

    const pendingBookings = await bookingModel
      .find({
        clerkUserId: user.id,
      })
      .populate("carId")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: pendingBookings });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Error while fetching bookings",
    });
  }
}
