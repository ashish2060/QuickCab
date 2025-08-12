"use client";
import { MapContext } from "@/context/MapContext";
import React, { useContext, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
const InputSearch = () => {
  const { fetchOptions, option, getLongAndLati } = useContext(MapContext);
  const [sourceActive, setSourceActive] = useState(false);
  const [destinationActive, setDestinationActive] = useState(false);
  const [inputData, setInputData] = useState({
    sourceInput: "",
    destinationInput: "",
  });
  const { source, destination, distance, setDistance } = useContext(MapContext);

  function changeHandler(e) {
    setInputData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    fetchOptions(e.target.value);
  }

  function closeOption(e) {
    if (e.target.id == "screen") {
      setSourceActive(false);
      setDestinationActive(false);
    }
  }

  // calcutate distance
  const calculateDistance = () => {
    const dist = google.maps.geometry.spherical.computeDistanceBetween(
      { lat: source.lat, lng: source.lng },
      { lat: destination.lat, lng: destination.lng }
    );
    setDistance(dist * 0.001);
  };

  return (
    <div
      className="flex flex-col gap-3 p-4 border-gray-200 border-[2px] m-0 my-4 md:m-4"
      id="screen"
      onClick={closeOption}
    >
      <h2 className="text-3xl text-blue-600 gradient-title">
        Fare Ride With Us
      </h2>
      <div className="flex flex-col gap-3 relative">
        <div className="flex items-center p-4 bg-gray-200 rounded-md">
          <input
            type="text"
            placeholder="Pickup Location"
            className="bg-gray-200 w-full outline-none"
            name="sourceInput"
            value={inputData.sourceInput}
            onChange={changeHandler}
            onFocus={() => {
              setSourceActive(true), setDestinationActive(false);
            }}
          />
          <span
            className="cursor-pointer"
            onClick={() => setSourceActive(false)}
          >
            <ImCancelCircle size={20} />
          </span>
        </div>
        {sourceActive && inputData.sourceInput && (
          <div className="w-full h-[150px] absolute top-[60px] overflow-auto bg-white">
            {option?.predictions?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-300 p-2 m-1 rounded-md cursor-pointer"
                  onClick={() => {
                    getLongAndLati(item?.place_id, "source");
                    setSourceActive(false);
                    inputData.sourceInput = item.description;
                  }}
                >
                  {item?.description}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex items-center p-4 bg-gray-200 rounded-md">
          <input
            type="text"
            placeholder="DropOff Location"
            className=" bg-gray-200 w-full outline-none"
            name="destinationInput"
            value={inputData.destinationInput}
            onChange={changeHandler}
            onFocus={() => {
              setDestinationActive(true), setSourceActive(false);
            }}
          />
          <span
            className="cursor-pointer"
            onClick={() => setDestinationActive(false)}
          >
            <ImCancelCircle size={20} />
          </span>
        </div>
        {destinationActive && inputData.destinationInput && (
          <div className="w-full h-[150px] absolute top-[130px] overflow-auto bg-white">
            {option?.predictions?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-300 p-2 m-1 rounded-md cursor-pointer"
                  onClick={() => {
                    getLongAndLati(item?.place_id, "destination");
                    setDestinationActive(false);
                    inputData.destinationInput = item.description;
                  }}
                >
                  {item?.description}
                </div>
              );
            })}
          </div>
        )}

        <button
          className="bg-black text-gray-300 p-4 rounded-md"
          onClick={calculateDistance}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default InputSearch;
