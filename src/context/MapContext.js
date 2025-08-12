"use client";
import { createContext, useState } from "react";
export const MapContext = createContext();

const MapContextProvider = ({ children }) => {
  const [source, setSource] = useState();
  const [destination, setDestination] = useState();
  const [option, setOption] = useState();
  const [distance, setDistance] = useState();

  const fetchOptions = (input) => {
    if (input) {
      fetch(
        `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          setOption(data);
        });
    }
  };

  const getLongAndLati = async (place_id, type) => {
    fetch(
      `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${place_id}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) =>
        type == "source"
          ? setSource({
              lat: data.result.geometry.location.lat,
              lng: data.result.geometry.location.lng,
              name: data.result.formatted_address,
              place_id: data.result.place_id,
            })
          : setDestination({
              lat: data.result.geometry.location.lat,
              lng: data.result.geometry.location.lng,
              name: data.result.formatted_address,
              place_id: data.result.place_id,
            })
      );
  };
  return (
    <MapContext.Provider
      value={{
        source,
        setSource,
        destination,
        setDestination,
        option,
        fetchOptions,
        getLongAndLati,
        distance,
        setDistance,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapContextProvider;
