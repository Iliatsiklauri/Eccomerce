"use client";

import { getUserApi } from "@/src/api/UsersApi";
import CartItemsList from "@/src/components/Client/Checkout/CartItemsList";
import GoogleMapComponent from "@/src/components/Client/Profile/ProfileSections/Addresses/GoogleMap";
import { RootState } from "@/src/store/store";
import { Address } from "@/src/types/Address";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Page() {
  const [bg, setBg] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(setBg, loading, setLoading);

  const { cart } = useSelector((state: RootState) => state.cart);
  const { id } = useSelector((state: RootState) => state.auth);

  const [selectedAddress, setSelectedAddress] = useState<null | {
    street: string;
    lat: number;
    lng: number;
  }>({
    street: "",
    lat: 41.7151,
    lng: 44.8271,
  });

  useEffect(() => {
    const getUser = async () => {
      if (id) {
        const res = await getUserApi(id);
        const address = res.Address as Address;
        setSelectedAddress({
          street: address.street,
          lat: address.lat,
          lng: address.lng,
        });
      }
    };
    getUser();
  }, [id]);

  const [mapBorder, setMapBorder] = useState(false);

  return (
    <div className="w-full flex items-center justify-center">
      {cart.length === 0 ? (
        <div className="text-2xl text-black"> Go Home</div>
      ) : (
        <div className="container1 w-full flex items-start justify-between py-10">
          <CartItemsList cart={cart} selectedAddress={selectedAddress} />
          <div className="w-[35%] flex-shrink-0">
            <GoogleMapComponent
              mapBorder={mapBorder}
              setMapBorder={setMapBorder}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              type
            />
          </div>
        </div>
      )}
      {bg && (
        <div className="fixed w-full h-full  bottom-0 top-0 z-50 left-0 right-0">
          <div className="w-full h-full bg-black bg-opacity-15"></div>
        </div>
      )}
    </div>
  );
}
