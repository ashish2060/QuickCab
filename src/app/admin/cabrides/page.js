"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CabRides = () => {
  const [bookings, setBookings] = useState();
  console.log("bookings", bookings);

  function fetchUserBookings() {
    fetch("/api/fetchallcabridesdata")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.data);
      });
  }

  useEffect(() => {
    fetchUserBookings();
  }, []);

  function clickHandler(status, bookingId) {
    fetch("/api/fetchallcabridesdata", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, bookingId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchUserBookings();
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="p-4">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {bookings?.map((booking, index) => {
          return (
            booking.status == "Pending" && (
              <div key={index} className="w-[350px] bg-slate-50 rounded-xl">
                <Image
                  src={"/car.png"}
                  alt="car-img"
                  width={200}
                  height={200}
                />
                {/* booked at */}
                <p className="p-2 text-lg text-gray-600">
                  Booked At:{booking.createdAt}
                </p>

                <p className="p-2 text-lg text-gray-600">
                  Booked At:- {booking.createdAt}
                </p>
                <p className="p-2 text-lg text-gray-600">
                  Pickup Location:- {booking.pickupData.name}
                </p>
                <p className="p-2 text-lg text-gray-600">
                  Dropoff Location:- {booking.dropoffData.name}
                </p>

                <p className="p-2 text-lg text-gray-600">
                  Amount Paid:₹{booking.amountPaid}
                </p>

                {/* accept or reject */}
                <div className="flex justify-between items-center p-2">
                  {/* popover reject - yes or no */}
                  <Popover>
                    <PopoverTrigger>
                      <Button className="bg-red-600 py-4 px-8 hover:bg-red-700">
                        Reject
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="flex gap-4 items-center">
                        <div>Sure to reject booking?</div>
                        <Button
                          variant="outline"
                          className="bg-slate-100"
                          onClick={() => clickHandler("Decline", booking._id)}
                        >
                          Yes
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>

                  {/* accept */}
                  <Button
                    className="bg-green-600 py-4 px-8 hover:bg-green-700"
                    onClick={() => clickHandler("Approved", booking._id)}
                  >
                    Accept Booking
                  </Button>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default CabRides;
