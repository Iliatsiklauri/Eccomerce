"use client";

import { getUserApi } from "@/src/api/UsersApi";
import CartItemsList from "@/src/components/Client/Checkout/CartItemsList";
import CheckoutModal from "@/src/components/Client/Checkout/CheckoutModal";
import GoogleMapComponent from "@/src/components/Client/Profile/ProfileSections/Addresses/GoogleMap";
import { RootState } from "@/src/store/store";
import { Address } from "@/src/types/Address";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Page() {
  const [bg, setBg] = useState(false);
  const [loading, setLoading] = useState(false);

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
        <div className="text-3xl text-black min-h-[500px] flex items-center justify-center">
          Go Home
        </div>
      ) : (
        <div className="container1 w-full flex items-start justify-between py-10 ">
          <CartItemsList
            cart={cart}
            selectedAddress={selectedAddress}
            setBg={setBg}
            bg={bg}
            setLoading={setLoading}
            loading={loading}
          />
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
      {bg && <CheckoutModal setBg={setBg} loading={loading} id={id} />}
    </div>
  );
}
