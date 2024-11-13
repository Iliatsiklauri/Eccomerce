import { CartItem } from "@/src/types/CartItem";
import React from "react";

type PropType = {
  total: number;
  cart: [] | CartItem[];
  selectedAddress: {
    street: string;
    lat: number;
    lng: number;
  } | null;
};

export default function OrderSummary({
  cart,
  total,
  selectedAddress,
}: PropType) {
  return (
    <div className="w-full flex flex-col items-start justify-center text-black gap-5 border-black border-opacity-30 rounded-md border-[1px] p-2">
      <h2 className="text-black text-2xl font-semibold">Summary</h2>
      <div className="flex flex-col w-full items-start justify-center gap-1 pl-1">
        <p className="font-semibold text-base">
          Delivery fee: <span className="font-normal text-sm">3.99$</span>
        </p>
        <p className=" text-sm">
          <span className="font-semibold text-base">Selected Address: </span>
          {selectedAddress?.street}
        </p>
        <p className="text-sm">
          <span className="font-semibold text-base">Product(s): </span>
          {cart.length}
        </p>
        <p className="text-md">
          <span className="font-semibold text-xl">Total: </span>
          {`${Math.ceil((total + 3.99) * 100) / 100}$`}
        </p>
      </div>
    </div>
  );
}
