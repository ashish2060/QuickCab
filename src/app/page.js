import GoogleMapSearch from "@/components/GoogleMapSearch";
import InputSearch from "@/components/InputSearch";
import ListCars from "@/components/ListCars";
import MapContextProvider from "@/context/MapContext";

export default function Home() {
  return (
    <MapContextProvider>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 py-20">
        <div className="flex flex-col">
          <InputSearch />
          <ListCars />
        </div>
        <div className="col-span-2 order-first md:order-1">
          <GoogleMapSearch />
        </div>
      </div>
    </MapContextProvider>
  );
}
