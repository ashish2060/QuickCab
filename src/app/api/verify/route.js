import { Cashfree } from "cashfree-pg";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    Cashfree.XClientId = process.env.CLIENT_ID;
    Cashfree.XClientSecret = process.env.CLIENT_SECRET;
    Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

    const data = await req.json();
    console.log("data", data);
    let { orderId } = data;

    const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
    // console.log("Verifyresponse:", response.data);
    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
