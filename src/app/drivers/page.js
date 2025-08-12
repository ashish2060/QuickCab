"use client";
import React, { useState } from "react";
import { useSocket } from "@/context/SocketContext";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

const DriverPage = () => {
  const router = useRouter();
  const { socket, cabRideData, setCabRideData } = useSocket();
  console.log(cabRideData);
  if (socket) socket.on("cab-drivers", (data) => setCabRideData(data));

  const acceptHandler = () => {
    fetch("/api/fetchallcabridesdata", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "Accepted",
        bookingId: cabRideData?.data?.data?._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          router.push("/drivers/drivermap");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {/* <h1>Drivers</h1> */}
      <span className="loader relative ">
        {cabRideData && (
          <div className="w-10 h-10 bg-gray-600 rounded-full absolute bottom-[100px] cursor-pointer">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Image
                  src="/userLogo.png"
                  alt="img"
                  width={45}
                  height={45}
                  className="rounded-full object-cover"
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    <p className="text-lg">
                      <span className="underline">PickUpLocation:</span>
                      {cabRideData?.data?.data?.pickupData?.name}
                    </p>
                    <p className="text-lg">
                      <span className="underline">Destination:</span>
                      {cabRideData.data?.data?.dropoffData?.name}
                    </p>
                    <p className="text-lg">
                      <span className="underline">CarType:</span>{" "}
                      {cabRideData?.data?.data.carType}
                    </p>
                    <p className="text-lg">
                      <span className="underline">Amount:</span>

                      <span className="text-green-800">
                        Rs {cabRideData?.data?.data?.amountPaid}
                      </span>
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={acceptHandler}>
                    Accept
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </span>

      {/* <p>pickupLocation:{data?.pickupData?.name}</p>
      <p>dropoffLocation:{data?.dropoffData?.name}</p> */}
    </div>
  );
};

export default DriverPage;
