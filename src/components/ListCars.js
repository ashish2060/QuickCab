"use client";
import { MapContext } from "@/context/MapContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSocket } from "@/context/SocketContext";

const carsListData = [
  {
    id: 1,
    name: "Mini",
    seat: 4,
    desc: "Affodable, Everyday rides",
    amount: 25,
    img: "/car.png",
  },
  {
    id: 2,
    name: "Black",
    seat: 4,
    desc: "Feel premium amoung others",
    amount: 30,
    img: "/black.jpg",
  },
  {
    id: 3,
    name: "Comfort",
    seat: 4,
    desc: "Newer cars with extra legroom",
    amount: 25,
    img: "/car.png",
  },
  {
    id: 4,
    name: "Premium",
    seat: 4,
    desc: "Affodable for group upto 6",
    amount: 40,
    img: "/car.png",
  },
  {
    id: 5,
    name: "Along Pet",
    seat: 4,
    desc: "Affodable rides for you and your pet",
    amount: 50,
    img: "/car.png",
  },
];
const ListCars = () => {
  const { socket } = useSocket();
  const router = useRouter();
  const { distance, source, destination } = useContext(MapContext);
  const [activeIndex, setActiveIndex] = useState();

  let cashfree;

  let insitialzeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };

  insitialzeSDK();

  // verify payment
  const verifyPayment = async (orderId) => {
    try {
      axios
        .post("/api/verify", {
          orderId,
        })

        .then((res) => {
          if (res && res.data) {
            console.log("payment", res);
            toast.success("Payment Verified");
            toast.success("Cab Booking Successfull");

            // save booking to database
            fetch("/api/cabridesbooking", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                pickupData: source,
                dropoffData: destination,
                carType: carsListData[activeIndex?.index]?.name,
                amountPaid: res.data.data[0].payment_amount,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("booking data console", data);
                // Socket io
                if (socket) {
                  socket.emit("cab-rides", {
                    data,
                  });
                }

                return data;
              })
              .then((data) => router.push("/dashboard/cabrides"))
              .catch((error) => console.log(error.message));
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    }
  };

  // payment handler
  const paymentHandler = async (e, cabPrice) => {
    e.preventDefault();
    console.log(cabPrice);
    try {
      // get session id
      fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify({ cabPrice }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data && data.data.payment_session_id) {
            // payment handler
            let checkoutOptions = {
              paymentSessionId: data.data.payment_session_id,
              // redirectTarget: "_self",
              redirectTarget: "_modal",
              // returnUrl: " http://localhost:3000",
            };

            cashfree.checkout(checkoutOptions).then((result) => {
              console.log("payment initialized");

              if (result.error) {
                // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
                console.log(
                  "User has closed the popup or there is some payment error, Check for Payment Status"
                );
                console.log(result.error);
              }
              if (result.redirect) {
                // This will be true when the payment redirection page couldnt be opened in the same window
                // This is an exceptional case only when the page is opened inside an inAppBrowser
                // In this case the customer will be redirected to return url once payment is completed
                console.log("Payment will be redirected");
              }
              if (result.paymentDetails) {
                // This will be called whenever the payment is completed irrespective of transaction status
                console.log(
                  "Payment has been completed, Check for Payment Status"
                );
                console.log(result.paymentDetails.paymentMessage);
                verifyPayment(data.data.order_id);
              }
            });
          }
        })
        .catch((err) => console.log(err.message));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    distance && (
      <div className="overflow-auto h-[235px]">
        <p className="font-bold text-[18px]">Recommended</p>
        {carsListData.map((car, index) => {
          return (
            <div
              key={car.id}
              className={`flex justify-between items-center p-1 px-4 mt-4 cursor-pointer rounded-md border-black ${
                activeIndex?.index == index ? "border-[3px] " : null
              }`}
              onClick={() => setActiveIndex({ index })}
            >
              <div className="flex items-center gap-5">
                <Image src={car.img} width={80} height={80} alt="car" />
                <div>
                  <h2 className="font-semibold text-[18px]">{car.name}</h2>
                  <p className="font-serif">{car.desc}</p>
                </div>
              </div>

              <div>
                <h2 className="font-bold text-[18px]">
                  ₹{Math.round(car.amount * distance)}
                </h2>
              </div>
            </div>
          );
        })}

        {activeIndex && (
          <div className="flex justify-between items-center fixed bottom-1 bg-white p-3 shadow-xl w-[90%] md:w-[30%] border-[1px]">
            <h2>Make Payment For</h2>
            <button
              className="p-3 bg-black text-white rounded-lg text-center"
              onClick={(e) =>
                paymentHandler(
                  e,
                  carsListData[activeIndex.index].amount * distance
                )
              }
            >
              Request {carsListData[activeIndex.index].name}
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default ListCars;
