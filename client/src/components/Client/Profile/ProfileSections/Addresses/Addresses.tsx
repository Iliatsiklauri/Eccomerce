import React, { useEffect, useState } from "react";
import GoogleMapComponent from "./GoogleMap";
import AddressForm from "./AddressForm";
import { Address } from "@/src/types/Address";
import { useForm } from "react-hook-form";
import { user } from "@/src/types/User";
import { createAddress, updateAddress } from "@/src/api/AddressApi";
import AddressApiModal from "./AddressApiModal";

type PropType = {
  user: user | null;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Addresses({ user, setSubmitted }: PropType) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Address>({ defaultValues: { name: "", additionalInfo: "" } });

  const [selectedAddress, setSelectedAddress] = useState<null | {
    street: string;
    lat: number;
    lng: number;
  }>({
    street: "",
    lat: 41.7151,
    lng: 44.8271,
  });

  const [mapBorder, setMapBorder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [response, setResponse] = useState<null | {
    status: number;
    success?: {
      message: string;
    };
    error?: {
      message: string;
    };
  }>(null);

  useEffect(() => {
    if (user && user.Address) {
      setSelectedAddress({
        street: user.Address.street,
        lat: user.Address.lat,
        lng: user.Address.lng,
      });
      reset({
        name: user.Address.name,
        additionalInfo: user.Address.additionalInfo,
      });
    }
  }, [user, reset]);

  const handleFormSubmit = async (data: Address) => {
    if (!selectedAddress?.street) {
      setMapBorder(true);
      return;
    }
    setMapBorder(false);

    const finalData = {
      ...data,
      lat: selectedAddress.lat,
      lng: selectedAddress.lng,
      street: selectedAddress.street,
    };

    let res;

    setLoading(true);
    setModal(true);

    if (user && user.Address) {
      res = await updateAddress({
        id: user.Address.id,
        updateAddressDTO: finalData,
      });

      setResponse(res);
    } else {
      res = await createAddress({
        id: user?.id || "1",
        createAddressDTO: finalData,
      });

      setResponse(res);
    }
    setSubmitted(true);
    setLoading(false);
    reset();
  };

  return (
    <div className="w-full h-full flex items-start justify-between">
      {modal && (
        <AddressApiModal loading={loading} setModal={setModal} res={response} />
      )}
      <AddressForm
        handleSubmit={handleSubmit(handleFormSubmit)}
        control={control}
        errors={errors}
      />
      <GoogleMapComponent
        setMapBorder={setMapBorder}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
        mapBorder={mapBorder}
      />
    </div>
  );
}
