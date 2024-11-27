"use client";

import { getUserApi } from "@/src/api/UsersApi";
import CartItemsList from "@/src/components/Client/Checkout/CartItemsList";
import CheckoutModal from "@/src/components/Client/Checkout/CheckoutModal";
import { RootState } from "@/src/store/store";
import { Address } from "@/src/types/Address";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GoogleMapComponent = dynamic(
  () =>
    import(
      "@/src/components/Client/Profile/ProfileSections/Addresses/GoogleMap"
    )
);

export default function Page() {
  const [bg, setBg] = useState(false);
  const [loading, setLoading] = useState(false);

  const { cart } = useSelector((state: RootState) => state.cart);
  const { id } = useSelector((state: RootState) => state.auth);

  const params = useSearchParams();
  const productId = params.get("id");

  const [selectedAddress, setSelectedAddress] = useState<null | {
    street: string;
    lat: number;
    lng: number;
  }>({
    street: "",
    lat: 41.7151,
    lng: 44.8271,
  });

  const fetchUserAddress = useCallback(async () => {
    if (id && !selectedAddress) {
      const res = await getUserApi(id);
      const address = res.Address as Address;
      setSelectedAddress({
        street: address.street,
        lat: address.lat,
        lng: address.lng,
      });
    }
  }, [id, selectedAddress]);

  useEffect(() => {
    fetchUserAddress();
  }, [fetchUserAddress]);

  const [mapBorder, setMapBorder] = useState(false);

  return (
    <div className="w-full flex items-center justify-center">
      {cart.length === 0 && productId === null ? (
        <div className="text-3xl text-black min-h-[500px] flex items-center justify-center">
          Go Home
        </div>
      ) : (
        <div className="container1 w-full flex items-start justify-between py-10 ">
          <CartItemsList
            cart={cart}
            selectedAddress={selectedAddress}
            setBg={setBg}
            setLoading={setLoading}
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
