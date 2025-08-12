import dbConnect from "@/lib/db";
import carModel from "@/lib/models/carModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { carName, carType, carPhoto, mpg, noOfSeats, pricePerHour } =
      await req.json();
    console.log(carName, carType, carPhoto, mpg, noOfSeats, pricePerHour);
    dbConnect();

    const addedCar = new carModel({
      carName,
      carType,
      carPhoto,
      mpg: parseInt(mpg),
      noOfSeats: parseInt(noOfSeats),
      pricePerHour: parseInt(pricePerHour),
    });

    await addedCar.save();
    console.log(addedCar);
    return NextResponse.json({ success: true, data: addedCar });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ success: false, error: error.message });
  }
}
