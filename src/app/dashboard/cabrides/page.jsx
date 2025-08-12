"use client"
import { Clock } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { FcApproval } from 'react-icons/fc';
import { ImCross } from 'react-icons/im';

const CabRides = () => {
    const [cabRides, setCabRides] = useState();
    console.log(cabRides)

    useEffect(() => {
        fetch("/api/getcabridesdata")
            .then((res) => res.json())
            .then((data) => {
                setCabRides(data.data);
            });
    }, []);

    return (
        <div className="p-4">
            <div className="grid lg:grid-col-2 lg:gap-6 xl:grid-cols-3 gap-6">
                {cabRides?.map((cabRide, index) => {
                    return (
                        <div key={index} className="w-[350px] bg-slate-50 rounded-xl">
                            <Image src={"/car.png"} alt="car" width={200} height={200} className='mx-auto' />
                            {/* status */}
                            <p className="p-2 text-lg text-gray-600 flex items-center">
                                status:

                                <span>
                                    {cabRide.status == "Pending" ? <Clock className='text-blue-600' size={18} /> : cabRide.status == "Decline" ? <ImCross className='bg-red-600' /> : <FcApproval />}
                                </span>
                                <span
                                    className={
                                        cabRide.status == "Pending"
                                            ? "text-blue-600"
                                            : cabRide.status == "Decline"
                                                ? "text-red-600"
                                                : "text-green-600"
                                    }
                                >
                                    {cabRide.status}
                                </span>
                            </p>

                            {/* booked at */}
                            <p className="p-2 text-lg text-gray-600">
                                Booked At:- {cabRide.createdAt}
                            </p>
                            <p className="p-2 text-lg text-gray-600">
                                Pickup Location:- {cabRide?.pickupData.name}
                            </p>
                            <p className="p-2 text-lg text-gray-600">
                                Dropoff Location:- {cabRide?.dropoffData.name}
                            </p>
                            <p className="p-2 text-lg text-gray-600">
                                Amount Paid:<span className='text-green-500'>₹{cabRide.amountPaid}</span>
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default CabRides