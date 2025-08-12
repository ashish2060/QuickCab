import dbConnect from "@/lib/db";
import cabModel from "@/lib/models/cabModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    dbConnect();

    const allCarsData = await cabModel.find({});

    return NextResponse.json({ success: true, data: allCarsData });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ success: false, message: "Error occured" });
  }
}

export async function PUT(req) {
  try {
    const cabRidesData = await req.json();

    const cabData = await cabModel.findByIdAndUpdate(
      { _id: cabRidesData.bookingId },
      { status: cabRidesData.status }
    );
    if (!cabData) {
      return NextResponse.json({
        success: false,
        message: "Error while accepting cab rides",
        data: cabData,
      });
    }

    return NextResponse.json({
      success: true,
      message: "cabRide processed successfully",
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Error while accepting cab rides",
    });
  }
}
