import Image from "next/image";
import React from "react";

const Home = () => {
  // function scrollToView() {
  //   scrollRef.current.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* 1st part */}
      <div className="p-[40px]">
        <h1 className="text-[40px] sm:text-[50px] md:text-[60px] font-semibold w-[95%] md:w-[90%]">
          Premium Car <span className="text-blue-600">Rental</span> in Your Area
        </h1>
        <p className="text-gray-500 w-[90%] md:w-[65%] text-[16px] sm:text-[18px] md:text-[20px] my-2">
          Book the selected car effortlessly,Pay for driving only, Book the car
          now
        </p>

        <button className="p-4 bg-blue-600 rounded-xl my-3 cursor-pointer text-white">
          Explore Cars
        </button>
      </div>
      {/* 2nd part */}
      <div className="order-first md:order-1 ">
        <Image
          src="/carlogo.avif"
          alt="car_img"
          width={100}
          height={100}
          className="w-full md:w-[80%] "
        />
      </div>
    </div>
  );
};

export default Home;
