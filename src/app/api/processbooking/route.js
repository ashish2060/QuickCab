import bookingModel from "@/lib/models/bookingModel";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const bookingData = await req.json();
    console.log("bookingData", bookingData);

    const booking = await bookingModel.findByIdAndUpdate(
      { _id: bookingData.bookingId },
      { status: bookingData.status }
    );
    if (!booking) {
      return NextResponse.json({
        success: false,
        message: "Error while accepting booking",
        data: booking,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Booking processed successfully",
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Error while accepting booking",
    });
  }
}
