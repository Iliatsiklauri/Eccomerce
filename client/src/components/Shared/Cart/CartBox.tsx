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
    if (cart) {
      const newTotal = cart.reduce((acc, cartItem: CartItem) => {
        return acc + cartItem.quantity * cartItem.product.salePrice;
      }, 0);
      setTotal(newTotal);
    }
  }, [cart]);

  return (
    <div
      className={`w-[450px] bg-white shadow-lg rounded-lg z-40 flex flex-col items-center justify-start max-h-[400px] overflow-y-auto `}
    >
      <div className="triangle"></div>
      <CartTop setCartMode={setCartMode} />
      <div className="w-full flex flex-col items-center justify-start p-2 gap-3 ">
        {cart.length > 0 ? (
          cart.map((el: CartItem) => (
            <SingleCartItem
              cartItem={el}
              key={el.id}
              setCartMode={setCartMode}
            />
          ))
        ) : (
          <div className=" border-black border-t-[1px] w-full text-start pt-2 pb-1 border-opacity-10 pl-2">
            <p className="text-black text-lg">Your cart is empty</p>
          </div>
        )}
      </div>
      {cart.length > 0 && <TotalPrice total={total} />}
    </div>
  );
}
