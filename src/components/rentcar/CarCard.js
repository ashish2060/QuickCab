import Image from "next/image";
import React from "react";

const CarCard = ({ selectedCar }) => {
  return (
    <div className="place-self-center bg-slate-50 p-6 rounded-2xl w-full shadow-md cursor-pointer relative ">
      <p className="text-[18px] font-semibold">{selectedCar?.carName}</p>
      <p className="my-4 text-[16px]">
        <span className="font-bold text-xl">₹{selectedCar?.pricePerHour}</span>
        /Hour
      </p>

      <Image
        src={selectedCar?.carPhoto}
        alt="img"
        width={100}
        height={100}
        className="w-full h-[180px]"
      />

      <div className="flex mt-4 gap-2 items-center justify-evenly">
        {/* 1 */}
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/steering-wheel.png"
            alt="img"
            width={30}
            height={30}
            className="opacity-80"
          />
          <div>{selectedCar?.noOfSeats} Seats</div>
        </div>

        {/* 2 */}
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/seat.png"
            alt="img"
            width={30}
            height={30}
            className="opacity-80"
          />
          <div>{selectedCar?.carType}</div>
        </div>

        {/* 3 */}
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/gas-pump-alt.png"
            alt="img"
            width={30}
            height={30}
            className="opacity-80"
          />
          <div>{selectedCar?.mpg} MPG</div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
