"use client";
import { RentContext } from "@/context/RentContext";
import React, { useContext, useState } from "react";

const RentalForm = ({ rentalData, setRentalData, selectedCar }) => {
  const today = new Date().toISOString().split("T")[0];
  const { calculateDateInHours } = useContext(RentContext);
  //   change Handler
  function changeHandler(e) {
    setRentalData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });

    // set date and time in rentContext
    if (
      e.target.name == "dropOffTime" ||
      (rentalData.pickUpDate &&
        rentalData.dropOffDate &&
        rentalData.pickUpTime &&
        rentalData.dropOffTime)
    ) {
      calculateDateInHours(
        rentalData.pickUpDate,
        rentalData.dropOffDate,
        rentalData.pickUpTime,
        e.target.value
      );
    }
  }

  return (
    <form className="flex flex-col mt-4 md:mt-0 px-6 gap-1">
      {/* location */}
      <div className="gap-1">
        <label className="text-gray-400 ">PickUp Location</label>
        <select
          className="select select-bordered w-full min-w-full "
          onChange={changeHandler}
          name="location"
          required
        >
          <option disabled selected>
            Location?
          </option>
          <option>Oswal, Nallasopara E</option>
          <option>Indralog,Bhayander</option>
          <option>Kajupada,Borivali</option>
        </select>
      </div>

      {/* date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between m-2 gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="date_from" className="text-gray-400 ">
            Pick Up Date
          </label>
          <input
            min={today}
            type="date"
            id="date_from"
            className="border-[1px] border-gray-300 rounded-lg p-2 px-4"
            name="pickUpDate"
            value={rentalData.pickUpDate}
            onChange={changeHandler}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="date_to" className="text-gray-400">
            Drop Off Date
          </label>
          <input
            min={today}
            disabled={!rentalData.pickUpDate}
            type="date"
            id="date_to"
            className="border-[1px] border-gray-300 rounded-lg p-2 px-4"
            name="dropOffDate"
            value={rentalData.dropOffDate}
            onChange={changeHandler}
            required
          />
        </div>
      </div>

      {/* timing */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center m-2 gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="pick_time" className="text-gray-400 ">
            Pick Up Time
          </label>
          <input
            disabled={!rentalData.dropOffDate}
            type="time"
            id="pick_time"
            className="border-[1px] border-gray-300 rounded-lg p-2 px-10 "
            name="pickUpTime"
            value={rentalData.pickUpTime}
            onChange={changeHandler}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="dropoff_time" className="text-gray-400 ">
            Drop Off Time
          </label>
          <input
            disabled={!rentalData.pickUpTime}
            type="time"
            id="dropoff_time"
            className="border-[1px] border-gray-300 rounded-lg p-2 px-10"
            name="dropOffTime"
            value={rentalData.dropOffTime}
            required
            onChange={changeHandler}
          />
        </div>
      </div>

      {/* contact number*/}
      <div className="my-2">
        <label htmlFor="contact_no" className="text-gray-400 ">
          Contact Number
        </label>
        <input
          type="tel"
          placeholder="Type here"
          id="contact_no"
          className="input input-bordered w-full"
          name="contactNumber"
          value={rentalData.contactNumber}
          onChange={changeHandler}
          required
        />
      </div>

      {rentalData.location &&
        rentalData.pickUpDate &&
        rentalData.dropOffDate &&
        rentalData.pickUpTime &&
        rentalData.dropOffTime &&
        rentalData.contactNumber && (
          <div>
            <div className="text-lg text-red-600 m-2">
              {"Note: /* Book for more than 24hr and get 10% discount */"}
              <br />
              {
                "Note: /* You can also make advance payment of 50% to book your car */"
              }
            </div>

            <div className="bg-slate-200 p-4 rounded-md flex justify-between px-4">
              <p className="text-gray-600">Total:</p>
              {/* discount if more than 24hrs */}
              {calculateDateInHours(
                rentalData.pickUpDate,
                rentalData.dropOffDate,
                rentalData.pickUpTime,
                rentalData.dropOffTime
              ) >= 24 ? (
                <p>
                  <span className="line-through mx-2">
                    ₹
                    {selectedCar.pricePerHour *
                      calculateDateInHours(
                        rentalData.pickUpDate,
                        rentalData.dropOffDate,
                        rentalData.pickUpTime,
                        rentalData.dropOffTime
                      )}
                  </span>
                  <span className="text-green-600 ">
                    ₹
                    {selectedCar.pricePerHour *
                      calculateDateInHours(
                        rentalData.pickUpDate,
                        rentalData.dropOffDate,
                        rentalData.pickUpTime,
                        rentalData.dropOffTime
                      ) *
                      0.9}
                  </span>
                </p>
              ) : (
                <p className="text-green-600">
                  ₹
                  {selectedCar.pricePerHour *
                    calculateDateInHours(
                      rentalData.pickUpDate,
                      rentalData.dropOffDate,
                      rentalData.pickUpTime,
                      rentalData.dropOffTime
                    )}
                </p>
              )}
            </div>
          </div>
        )}
    </form>
  );
};

export default RentalForm;
