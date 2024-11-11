import React, { useState, useEffect } from "react";
import { GoogleMap, Libraries, LoadScript } from "@react-google-maps/api";

const libraries: Libraries = ["marker"];

type PropType = {
  setMapBorder: React.Dispatch<React.SetStateAction<boolean>>;
  mapBorder: boolean;
  setSelectedAddress: React.Dispatch<
    React.SetStateAction<{
      street: string;
      lat: number;
      lng: number;
    } | null>
  >;
  selectedAddress: {
    street: string;
    lat: number;
    lng: number;
  } | null;
  type?: boolean;
};

export default function GoogleMapComponent({
  setMapBorder,
  setSelectedAddress,
  selectedAddress,
  type,
  mapBorder,
}: PropType) {
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);

  const fetchAddress = async (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    const response = await geocoder.geocode({ location: { lat, lng } });
    const [result] = response.results;

    if (result) {
      setSelectedAddress({ lat, lng, street: result.formatted_address });
    }
  };

  const onMapClick = (event: google.maps.MapMouseEvent) => {
    if (mapBorder) {
      setMapBorder(false);
    }
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelectedAddress({ lat, lng, street: "" });
      fetchAddress(lat, lng);

      if (marker) {
        marker.position = new google.maps.LatLng(lat, lng);
      } else {
        const newMarker = new google.maps.marker.AdvancedMarkerElement({
          position: new google.maps.LatLng(lat, lng),
          map,
          title: "Selected Location",
        });
        setMarker(newMarker);
      }
    }
  };

  useEffect(() => {
    if (map && selectedAddress && selectedAddress.lat && selectedAddress.lng) {
      if (marker) {
        marker.position = new google.maps.LatLng(
          selectedAddress.lat,
          selectedAddress.lng
        );
      } else {
        const newMarker = new google.maps.marker.AdvancedMarkerElement({
          position: new google.maps.LatLng(
            selectedAddress.lat,
            selectedAddress.lng
          ),
          map,
          title: "Selected Location",
        });
        setMarker(newMarker);
      }
    }
  }, [map, selectedAddress, marker]);

  return (
    <div
      className={` flex flex-col items-center justify-center flex-shrink-0 gap-2 ${
        type ? "w-full" : "w-[55%]"
      } `}
    >
      <div
        className={` h-[320px] w-full rounded-lg overflow-hidden ${
          loading && "skeleton bg-black bg-opacity-15"
        } ${mapBorder && "border-red-500 border-[1px]"}`}
      >
        <LoadScript
          googleMapsApiKey="AIzaSyBML4x9kmQdrWm_XsQ4QshKo19FuWQPm6g"
          libraries={libraries}
        >
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={{
              lat: selectedAddress?.lat || 41.69406,
              lng: selectedAddress?.lng || 44.8047,
            }}
            zoom={15}
            onLoad={(mapInstance: google.maps.Map) => {
              setMap(mapInstance);
              setLoading(false);
            }}
            onClick={onMapClick}
            options={{ mapId: "DEMO_MAP_ID" }}
          />
        </LoadScript>
      </div>
      {!type && (
        <div className="w-full h-[40px] px-1">
          <span className="font-medium text-black">Selected Address : </span>
          <span className="text-black">{selectedAddress?.street}</span>
        </div>
      )}
    </div>
  );
}
