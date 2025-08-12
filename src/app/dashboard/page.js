"use client";
import CarCard from "@/components/rentcar/CarCard";
import { Clock, Clock1 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [bookings, setBookings] = useState();

  useEffect(() => {
    fetch("/api/getuserbookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.data);
      });
  }, []);
  return bookings?.length == 0 ? (
    <h1>No Pending Bookings</h1>
  ) : (
    <div className="p-4">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {bookings?.map((booking, index) => {
          return (
            booking.status == "Pending" && (
              <div key={index} className="w-[350px] bg-slate-50 rounded-xl">
                <CarCard selectedCar={booking.carId} />
                {/* status */}
                <p className="p-2 text-lg text-gray-600 flex items-center">
                  status:
                  <span>
                    <Clock size={18} />
                  </span>
                  <span
                    className={
                      booking.status == "Pending"
                        ? "text-blue-600"
                        : booking.status == "Decline"
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {booking.status}
                  </span>
                </p>

                {/* booked at */}
                <p className="p-2 text-lg text-gray-600">
                  Booked At:{booking.createdAt}
                </p>
                <p className="p-2 text-lg text-gray-600">
                  Amount Paid:
                  <span className="text-green-600">₹{booking.amountPaid}</span>
                </p>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
