"use client";
import Image from "next/image";
import React, { useState } from "react";

const crouselData = [
  {
    id: 1,
    img: "/crousel5.avif",
  },
  {
    id: 2,
    img: "/crousel2.avif",
  },
  {
    id: 3,
    img: "/crousel6.avif",
  },
  {
    id: 4,
    img: "/crousel4.avif",
  },
];
const Crousel = () => {
  const [acticeIndex, setActiveIndex] = useState(0);

  function moveForward() {
    if (acticeIndex >= crouselData.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex((prev) => prev + 1);
    }
  }

  function moveBackward() {
    if (acticeIndex <= 0) {
      setActiveIndex(crouselData.length - 1);
    } else {
      setActiveIndex((prev) => prev - 1);
    }
  }
  return (
    <div className="w-full my-4">
      <h2 className="text-[40px] font-semibold text-center my-4 text-blue-950">
        Limited Offers
      </h2>
      <div className=" flex items-center w-[90%] mx-auto gap-4">
        <div
          className="text-[80px] cursor-pointer text-blue-800 animate-bounce"
          onClick={moveBackward}
        >
          {"<"}
        </div>
        <div className="w-full">
          <Image
            src={crouselData[acticeIndex]?.img}
            alt="img"
            width={100}
            height={100}
            className="w-[100%] h-[300px] md:h-[500px] "
          />
        </div>
        <div
          className="text-[80px] cursor-pointer text-blue-800 animate-bounce"
          onClick={moveForward}
        >
          {">"}
        </div>
      </div>
    </div>
  );
};

export default Crousel;
