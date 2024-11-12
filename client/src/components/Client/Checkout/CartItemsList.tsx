import { CartItem } from "@/src/types/CartItem";
import React, { useEffect, useState } from "react";
import SingleCheckItem from "./SingleCheckItem";
import OrderButton from "./OrderButton";
import OrderSummary from "./OrderSummary";

type PropType = {
  cart: [] | CartItem[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  bg: boolean;
  setBg: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  selectedAddress: {
    street: string;
    lat: number;
    lng: number;
  } | null;
};
export default function CartItemsList({
  cart,
  selectedAddress,
  bg,
  loading,
  setBg,
  setLoading,
}: PropType) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cart.reduce((acc, cartItem: CartItem) => {
      return acc + cartItem.quantity * cartItem.product.salePrice;
    }, 0);
    setTotal(newTotal);
  }, [cart]);

  return (
    <div className="w-[60%] flex flex-col justify-center items-center gap-10">
      <div className="w-full grid grid-cols-3 gap-3 ">
        {cart.map((cartItem: CartItem) => (
          <SingleCheckItem CartItem={cartItem} key={cartItem.id} />
        ))}
      </div>
      <OrderSummary
        total={total}
        cart={cart}
        selectedAddress={selectedAddress}
      />
      <div className="w-[99%] h-[1px] bg-black opacity-15"></div>
      <OrderButton
        setBg={setBg}
        bg={bg}
        setLoading={setLoading}
        loading={loading}
      />
    </div>
  );
}
