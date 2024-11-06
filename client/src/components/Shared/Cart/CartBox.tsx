import { CartItem } from "@/src/types/CartItem";
import React, { useEffect, useState } from "react";
import SingleCartItem from "./SingleCartItem";
import TotalPrice from "./TotalPrice";
import CartTop from "./CartTop";
type PropType = {
  cart: [] | CartItem[];
  setCartMode: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function CartBox({ cart, setCartMode }: PropType) {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const newTotal = cart.reduce((acc, cartItem: CartItem) => {
      return acc + cartItem.quantity * cartItem.product.salePrice;
    }, 0);
    setTotal(newTotal);
  }, [cart]);

  return (
    <div
      className={`w-[450px] bg-white shadow-lg rounded-lg z-40 flex flex-col items-center justify-center  max-h-[400px] overflow-y-auto p-1`}
    >
      <div className="triangle"></div>
      <CartTop setCartMode={setCartMode} />
      <div className="w-full flex flex-col items-center justify-center p-2 gap-3">
        {cart.length > 0 ? (
          cart.map((el: CartItem) => (
            <SingleCartItem cartItem={el} key={el.id} />
          ))
        ) : (
          <div className="h-[50px]">
            <p className="text-black text-lg">Your cart is empty</p>
          </div>
        )}
      </div>
      {cart.length > 0 && <TotalPrice total={total} />}
    </div>
  );
}
