"use client";
import CarCard from "@/components/rentcar/CarCard";
import React, { useEffect, useState } from "react";

const AllBookings = () => {
  const [allUsersBooking, setAllUsersBooking] = useState();
  const [viewMore, setViewMore] = useState(false);

  //   fetchUserBookings function
  function fetchAllUserBookings() {
    fetch("/api/getallusersbookings")
      .then((res) => res.json())
      .then((data) => {
        setAllUsersBooking(data.data);
      });
  }
  useEffect(() => {
    fetchAllUserBookings();
  }, []);

  return (
    <div className="p-4">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {allUsersBooking?.map((booking, index) => {
          return (
            <div key={index} className="w-[350px] bg-slate-50 rounded-xl">
              <CarCard selectedCar={booking.carId} />

              {/* booked at */}
              <p className="p-2 text-lg text-gray-600">
                Booked At:{booking.createdAt}
              </p>
              <p className="p-2 text-lg text-gray-600">
                Amount Paid:₹{booking.amountPaid}
              </p>

              {!viewMore && (
                <p
                  className="text-blue-600 p-2 text-md cursor-pointer"
                  onClick={() => setViewMore(true)}
                >
                  view more details...
                </p>
              )}

              {/* view more */}
              {viewMore && (
                <div className="space-y-2 text-lg text-gray-600 p-2">
                  <p>PickUpDate:{booking.pickUpDate}</p>
                  <p>DropOffDate:{booking.dropOffDate}</p>
                  <p>pickUpTime:{booking.pickUpTime}</p>
                  <p>DropOffTime:{booking.dropOffTime}</p>
                  <p>ContactNumber:{booking.contactNumber}</p>

                  <p
                    className="text-blue-600 text-md cursor-pointer"
                    onClick={() => setViewMore(false)}
                  >
                    view less..
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllBookings;
