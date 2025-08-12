"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { MapContext } from "@/context/MapContext";

function GoogleMapSearch() {
  const { source, destination } = useContext(MapContext);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  const [directionRoutePoints, setDirectionRoutePoints] = useState();

  const containerStyle = {
    width: "100%",
    height: "80vh",
  };

  const [center, setCenter] = useState({
    lat: 19.4161609,
    lng: 72.8194645,
  });

  const [map, setMap] = React.useState(null);

  useEffect(() => {
    if (source && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      });
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }

    if (source && destination) {
      directionRoute();
    }
  }, [source]);

  useEffect(() => {
    if (destination && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }

    if (source && destination) {
      directionRoute();
    }
  }, [destination]);

  // direction Route
  const directionRoute = () => {
    const DirectionSerivice = new google.maps.DirectionsService();

    DirectionSerivice.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status == google.maps.DirectionsStatus.OK) {
          setDirectionRoutePoints(result);
        } else {
          console.log("Error");
        }
      }
    );
  };

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: "4113717585f11867" }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {/* source */}
      {source && (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: "/source.png",
            scaledSize: {
              width: 20,
              height: 20,
            },
          }}
        >
          {/* name on map */}
          <OverlayViewF
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{source?.name}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      )}
      {/* destination */}
      {destination && (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: "/destination.png",
            scaledSize: {
              width: 20,
              height: 20,
            },
          }}
        >
          <OverlayViewF
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{destination?.name}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      )}

      {/* Route on map */}
      <DirectionsRenderer
        directions={directionRoutePoints}
        options={{
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: "#000",
            strokeWeight: 5,
          },
        }}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default GoogleMapSearch;
