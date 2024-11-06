import { RootState } from "@/src/store/store";
import { CartItem } from "@/src/types/CartItem";
import React from "react";
import { useSelector } from "react-redux";

export default function MyOrders() {
  const { cart } = useSelector((state: RootState) => state.cart);
  return (
    <div className="w-full h-full flex items-center justify-center">
      {cart.map((el: CartItem) => (
        <div>{el.product.title}</div>
      ))}
    </div>
  );
}
