import dbConnect from "@/lib/db";
import cabModel from "@/lib/models/cabModel";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    dbConnect();
    const { pickupData, dropoffData, amountPaid, carType } =
      await request.json();
    const user = await currentUser();
    if (!pickupData.name || !dropoffData.name || !amountPaid || !carType) {
      return NextResponse.json({ success: false, message: "Incomplete data" });
    }

    const newCabBooking = new cabModel({
      pickupData,
      dropoffData,
      amountPaid: Number(amountPaid),
      carType,
      clerkUserId: user.id,
    });

    newCabBooking.save();

    if (!newCabBooking) {
      return NextResponse.json({
        success: false,
        message: "Cab Booking failed",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Cab Booking Successfull",
      data: newCabBooking,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "error while booking cab",
    });
  }
}
