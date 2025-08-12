import dbConnect from "@/lib/db";
import bookingModel from "@/lib/models/bookingModel";
import { currentUser } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    dbConnect();
    // const data = await request.json();
    // console.log(data);
    const {
      carId,
      orderId,
      amountPaid,
      paymentMethod,
      location,
      pickUpDate,
      dropOffDate,
      pickUpTime,
      dropOffTime,
      contactNumber,
    } = await request.json();

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "UnAuthorised User",
      });
    }
    if (
      !carId ||
      !orderId ||
      !amountPaid ||
      !paymentMethod ||
      !location ||
      !pickUpDate ||
      !dropOffDate ||
      !pickUpTime ||
      !dropOffTime ||
      !contactNumber
    ) {
      return NextResponse.json({
        success: false,
        message: "Neccessary data are required",
      });
    }

    const newBooking = new bookingModel({
      carId,
      amountPaid,
      paymentMethod,
      clerkUserId: user.id,
      pickUpTime,
      dropOffTime,
      pickUpDate,
      dropOffDate,
      contactNumber: parseInt(contactNumber),
      pickUpLocation: location,
      orderId,
    });

    await newBooking.save();
    console.log(newBooking);
    return NextResponse.json({ success: true, data: newBooking });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ success: false, message: "error" });
  }
}
