import dbConnect from "@/lib/db";
import carModel from "@/lib/models/carModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    dbConnect();

    const carId = await req.json();
    console.log(carId);
    const car = await carModel.findByIdAndDelete(carId);
    if (!car) {
      return NextResponse.json({
        success: false,
        message: "No car found in db",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Car Successfully Deleted from Database",
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Error while deleting car",
    });
  }
}
