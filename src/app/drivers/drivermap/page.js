"use client";
import { useSocket } from "@/context/SocketContext";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 19.4161609,
  lng: 72.8194645,
};

export default function MapComponent() {
  const { cabRideData } = useSocket();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: {
            lat: cabRideData?.data?.data?.pickupData?.lat,
            lng: cabRideData?.data?.data?.pickupData?.lng,
          }, // Source
          destination: {
            lat: cabRideData?.data?.data?.dropoffData?.lat,
            lng: cabRideData?.data?.data?.dropoffData?.lng,
          }, // Destination
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [isLoaded]);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  ) : (
    <></>
  );
}
