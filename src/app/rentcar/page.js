import CarsCatalog from "@/components/rentcar/CarsCatalog";
import Crousel from "@/components/rentcar/Crousel";
import Home from "@/components/rentcar/Home";
import RentContext from "@/context/RentContext";
import React from "react";

const RentCar = () => {
  return (
    <RentContext>
      <div className="py-20">
        <Home />
        <Crousel />
        <CarsCatalog />
      </div>
    </RentContext>
  );
};

export default RentCar;
