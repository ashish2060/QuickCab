import dbConnect from "@/lib/db";
import bookingModel from "@/lib/models/bookingModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    dbConnect();

    const allUsersBookings = await bookingModel
      .find({})
      .populate("carId")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: allUsersBookings });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Error while fetching bookings",
    });
  }
}
