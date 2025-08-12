"use client"
import CarCard from '@/components/rentcar/CarCard';
import { Clock } from 'lucide-react';
import { FcApproval } from "react-icons/fc";
import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im';

const DashboardHistory = () => {
    const [bookings, setBookings] = useState();

    useEffect(() => {
        fetch("/api/getuserbookings")
            .then((res) => res.json())
            .then((data) => {
                setBookings(data.data);
            });
    }, []);

    return (
        <div className="p-4">
            <div className="grid lg:grid-col-2 lg:gap-6 xl:grid-cols-3 gap-6">
                {bookings?.map((booking, index) => {
                    return (
                        <div key={index} className="w-[350px] bg-slate-50 rounded-xl">
                            <CarCard selectedCar={booking.carId} />
                            {/* status */}
                            <p className="p-2 text-lg text-gray-600 flex items-center">
                                status:

                                <span>
                                    {booking.status == "Pending" ? <Clock className='text-blue-600' size={18} /> : booking.status == "Decline" ? <ImCross className='bg-red-600' /> : <FcApproval />}
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
                                Amount Paid:₹{booking.amountPaid}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default DashboardHistory