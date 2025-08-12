import { Cashfree } from "cashfree-pg";
import { NextResponse } from "next/server";
import crypto from "crypto";

function generateOrderId() {
  const uniqueId = crypto.randomBytes(16).toString("hex");

  const hash = crypto.createHash("sha256");
  hash.update(uniqueId);

  const orderId = hash.digest("hex");
  return orderId.substring(0, 12);
}

export async function POST(req) {
  try {
    const cabPrice = await req.json();
    // totalPrice to be paid
    console.log(cabPrice);

    Cashfree.XClientId = process.env.CLIENT_ID;
    Cashfree.XClientSecret = process.env.CLIENT_SECRET;
    Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

    let ord_detail = {
      order_amount: 1000,
      order_currency: "INR",
      order_id: generateOrderId(),
      customer_details: {
        customer_id: "webcodder01",
        customer_phone: "9999999999",
        customer_name: "Web Codder",
        customer_email: "webcodder@example.com",
      },
      order_meta: {
        // return_url: "http://localhost:3000/dashboard",
        notify_url: "http://localhost:3000",
      },
    };

    const response = await Cashfree.PGCreateOrder("2023-08-01", ord_detail);
    console.log(response);
    // console.log("payment-response:", response.data);
    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
