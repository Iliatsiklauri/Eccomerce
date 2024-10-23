import React, { useState } from "react";
import GoogleMapComponent from "./GoogleMap";
import AddressForm from "./AddressForm";
import { Address } from "@/src/types/Address";
import { useForm } from "react-hook-form";

export default function Addresses() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Address>({ defaultValues: { name: "", additionalInfo: "" } });

  const [selectedAddress, setSelectedAddress] = useState<null | {
    lat: number;
    lng: number;
    address: string;
  }>(null);
  const [mapBorder, setMapBorder] = useState(false);

  const handleFormSubmit = (data: Address) => {
    if (!selectedAddress?.address) {
      setMapBorder(true);
      return;
    }
    setMapBorder(false);
    const finalData = {
      ...data,
      map: { lat: selectedAddress.lat, lng: selectedAddress.lng },
      street: selectedAddress.address,
    };
    console.log(finalData);
    reset();
  };
  return (
    <div className="w-full h-full flex items-start  justify-between pt-3">
      <AddressForm
        handleSubmit={handleSubmit(handleFormSubmit)}
        control={control}
        errors={errors}
      />
      <GoogleMapComponent
        setSelectedAddress={setSelectedAddress}
        mapBorder={mapBorder}
        setMapBorder={setMapBorder}
      />
    </div>
  );
}
