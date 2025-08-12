import dbConnect from "@/lib/db";
import carModel from "@/lib/models/carModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    dbConnect();

    const allCarsData = await carModel.find({});

    return NextResponse.json({ success: true, data: allCarsData });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ success: false, message: "Error occured" });
  }
}
