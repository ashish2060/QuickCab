"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import CarCard from "./CarCard";
import RentalForm from "./RentalForm";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import { toast } from "react-toastify";
import { RentContext } from "@/context/RentContext";
import { useRouter } from "next/navigation";

const catalogData = [
  {
    id: 1,
    carName: "Honda Civic",
    perDay: "4000",
    type: "Auto",
    seat: 5,
    mgp: 28,
    img: "/car1.avif",
  },
  {
    id: 2,
    carName: "Mazda CX3",
    perDay: "4500",
    type: "Auto",
    seat: 5,
    mgp: 35,
    img: "/car2.avif",
  },
  {
    id: 3,
    carName: "BMW X3",
    perDay: "7000",
    type: "Auto",
    seat: 5,
    mgp: 5,
    img: "/car3.avif",
  },
  {
    id: 4,
    carName: "Honda Jazz",
    perDay: "6000",
    type: "Manual",
    seat: 5,
    mgp: 40,
    img: "/car4.avif",
  },
  {
    id: 5,
    carName: "BMW X5",
    perDay: "7500",
    type: "Auto",
    seat: 5,
    mgp: 28,
    img: "/car5.avif",
  },
  {
    id: 6,
    carName: "Nissan",
    perDay: "4000",
    type: "Auto",
    seat: 5,
    mgp: 28,
    img: "/car6.avif",
  },
  {
    id: 7,
    carName: "Volkswagan",
    perDay: "4000",
    type: "Auto",
    seat: 5,
    mgp: 28,
    img: "/car7.avif",
  },
  {
    id: 8,
    carName: "Maruti Swift",
    perDay: "4500",
    type: "Auto",
    seat: 5,
    mgp: 35,
    img: "/car8.avif",
  },
];

const CarsCatalog = () => {
  const router = useRouter();
  const { calculateDateInHours } = useContext(RentContext);

  const [rentalData, setRentalData] = useState({
    location: "",
    pickUpDate: "",
    dropOffDate: "",
    pickUpTime: "",
    dropOffTime: "",
    contactNumber: "",
  });
  const [activeHover, setActiveHover] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  let cashfree;

  let insitialzeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };

  insitialzeSDK();

  const [allCarsData, setAllCarsData] = useState();

  // fetch all cars data
  const fetchAllCarData = () => {
    fetch("http://localhost:3000/api/fetchallcarsdata")
      .then((res) => res.json())
      .then((data) => setAllCarsData(data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchAllCarData();
  }, []);

  // verify payment
  const verifyPayment = async (orderId) => {
    try {
      axios
        .post("/api/verify", {
          orderId,
        })
        .then((res) => {
          if (res && res.data) {
            toast.success("Payment Verified");
            toast.success("Booking Successfull");

            // save booking to database
            fetch("/api/booking", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                carId: selectedCar?._id,
                orderId: res.data?.data[0]?.order_id,
                amountPaid: res.data?.data[0]?.payment_amount,
                paymentMethod: res.data?.data[0]?.payment_group,
                ...rentalData,
              }),
            })
              .then((res) => res.json())
              .then((data) => router.push("/dashboard"))
              .catch((error) => console.log(error.message));
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    }
  };

  // payment handler
  const paymentHandler = async (e, paymentType) => {
    e.preventDefault();
    if (
      !rentalData.location ||
      !rentalData.pickUpDate ||
      !rentalData.pickUpTime ||
      !rentalData.dropOffDate ||
      !rentalData.dropOffTime ||
      !rentalData.contactNumber
    ) {
      alert("All Fields Are Mendentary");
      return;
    }
    document.getElementById("my_modal_4").close();
    try {
      // get session id
      fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify({
          pricePerHour: selectedCar.pricePerHour,
          rentHour: calculateDateInHours(
            rentalData.pickUpDate,
            rentalData.dropOffDate,
            rentalData.pickUpTime,
            rentalData.dropOffTime
          ),
          paymentType,
        }),
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
    <div className="p-[40px]">
      <div>
        <h2 className="text-[40px] font-semibold text-blue-950">
          Cars Catalog
        </h2>
        <p className="text-[18px] my-3 font-serif">
          Explore our cars you might like
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7">
          {allCarsData?.map((car, index) => {
            return (
              <div
                key={car?._id}
                className="place-self-center bg-[#F4F4F9] p-6 rounded-2xl w-full md:w-[90%] xl:w-[80%] shadow-lg cursor-pointer hover:border-[2px] border-blue-950 relative "
                onMouseEnter={() => setActiveHover({ isTrue: true, index })}
                onMouseLeave={() => setActiveHover(null)}
              >
                <p className="text-[18px] font-semibold">{car?.carName}</p>
                <p className="my-4 text-[16px]">
                  <span className="font-bold text-xl">
                    ₹{car?.pricePerHour}
                  </span>
                  /Hour
                </p>
                <Image
                  src={car?.carPhoto}
                  alt="img"
                  width={100}
                  height={100}
                  className="aspect-video w-full object-cover"
                />

                <div className="flex mt-4 gap-2 items-center justify-evenly">
                  {/* 1 */}
                  <div className="flex flex-col items-center">
                    <Image
                      src="/steering-wheel.png"
                      alt="img"
                      width={30}
                      height={30}
                      className="opacity-80"
                    />
                    <div>{car?.noOfSeats} Seats</div>
                  </div>

                  {/* 2 */}
                  <div className="flex flex-col items-center">
                    <Image
                      src="/seat.png"
                      alt="img"
                      width={30}
                      height={30}
                      className="opacity-80"
                    />
                    <div>{car?.carType}</div>
                  </div>

                  {/* 3 */}
                  <div className="flex flex-col items-center">
                    <Image
                      src="/gas-pump-alt.png"
                      alt="img"
                      width={30}
                      height={30}
                      className="opacity-80"
                    />
                    <div>{car?.mpg} MPG</div>
                  </div>
                </div>
                {/* on hover */}
                {activeHover && activeHover.index == index && (
                  <div className="absolute top-0 bottom-0 right-0 left-0 bg-opacity-20 bg-[#586F7C] rounded-xl grid">
                    <button
                      className="bg-white py-4 px-12 rounded-lg place-self-center flex gap-4 items-center"
                      onClick={() => {
                        document.getElementById("my_modal_4").showModal();
                        setSelectedCar(car);
                      }}
                    >
                      Rent now
                      <Image
                        src="/upper_arrow.png"
                        alt=""
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* modal */}
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_4" className="modal backdrop-blur-sm">
        <div className="modal-box w-11/12 max-w-5xl ">
          <h3 className=" text-2xl text-gray-400 border-b-[2px] border-gray-200 p-2">
            Rent A Car Now!
          </h3>
          <div className="flex flex-col md:flex-row p-6">
            <div className="w-full md:w-[60%] xl:w-[50%] p-2">
              <CarCard selectedCar={selectedCar} />
            </div>
            <div className="w-full">
              <RentalForm
                rentalData={rentalData}
                setRentalData={setRentalData}
                selectedCar={selectedCar}
              />
            </div>
          </div>

          {/* buttons */}

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn px-8">Close</button>
            </form>

            {/* advance payment */}
            <button
              className=" bg-blue-600 px-8 text-white hover:bg-blue-800 rounded-lg"
              onClick={(e) => paymentHandler(e, "advancePayment")}
            >
              Advance Payment
            </button>
            {/* full payment */}
            <button
              className=" bg-green-600 px-8 text-white hover:bg-blue-800 rounded-lg"
              onClick={(e) => paymentHandler(e, "fullPayment")}
            >
              Full Payment
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CarsCatalog;
