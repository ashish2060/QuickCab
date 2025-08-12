"use client";
import CarCard from "@/components/rentcar/CarCard";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const AdminDashboard = () => {
    const [bookings, setBookings] = useState();
    console.log(bookings)
    const [viewMore, setViewMore] = useState(false);

    //   fetchUserBookings function
    function fetchUserBookings() {
        fetch("/api/getuserbookings")
            .then((res) => res.json())
            .then((data) => {
                setBookings(data.data);
            });
    }
    useEffect(() => {
        fetchUserBookings();
    }, []);

    function clickHandler(status, bookingId) {
        fetch("/api/processbooking", {
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
                                <CarCard selectedCar={booking.carId} />

                                <p className="p-2 text-lg text-gray-600">
                                    PickUpLocation: {booking.pickUpLocation}
                                </p>
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

export default AdminDashboard;
