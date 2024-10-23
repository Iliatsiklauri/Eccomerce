import React, { useState, useEffect } from "react";
import { GoogleMap, Libraries, LoadScript } from "@react-google-maps/api";

const libraries: Libraries = ["marker"];

type PropType = {
  setMapBorder: React.Dispatch<React.SetStateAction<boolean>>;
  mapBorder: boolean;
  setSelectedAddress: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
      address: string;
    } | null>
  >;
};

export default function GoogleMapComponent({
  setSelectedAddress,
  mapBorder,
}: PropType) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userHasClicked, setUserClicked] = useState(false);
  const [marker, setMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);

  const [markerPosition, setMarkerPosition] = useState({
    lat: 41.7151,
    lng: 44.8271,
  });

  const [addr, setAddr] = useState("");

  useEffect(() => {
    if (!map) return;
    const fetchAddr = async () => {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ location: markerPosition });
      const [result] = response.results;

      if (!result) return;
      setAddr(result.formatted_address);

      if (!userHasClicked) return;
      setSelectedAddress({
        lng: markerPosition.lng,
        lat: markerPosition.lat,
        address: addr,
      });
    };
    fetchAddr();
  }, [markerPosition, map, addr, userHasClicked, setSelectedAddress]);

  const onMapClick = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setUserClicked(true);
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });

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
    if (map && marker) {
      marker.map = map;
    }
  }, [map, marker]);

  return (
    <div
      className={` w-[55%] h-[300px] ${
        mapBorder && "border-red-500 border-[1px]"
      } `}
    >
      <LoadScript
        googleMapsApiKey="AIzaSyBML4x9kmQdrWm_XsQ4QshKo19FuWQPm6g"
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={markerPosition}
          zoom={12}
          onLoad={(mapInstance: google.maps.Map) => setMap(mapInstance)}
          onClick={onMapClick}
          options={{ mapId: "DEMO_MAP_ID" }}
        />
      </LoadScript>

      <h1>x{markerPosition.lat}</h1>
      <h1>y{markerPosition.lng}</h1>
      <h1>{addr}</h1>
    </div>
  );
}
