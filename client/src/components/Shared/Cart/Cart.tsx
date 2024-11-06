import { RootState } from "@/src/store/store";
import React from "react";
import { useSelector } from "react-redux";
import CartBox from "./CartBox";
type PropType = {
  setCartMode: React.Dispatch<React.SetStateAction<boolean>>;
  cartMode: boolean;
};
export default function Cart({ setCartMode, cartMode }: PropType) {
  const { cart } = useSelector((state: RootState) => state.cart);
  return (
    <div className="w-full h-full absolute flex items-center justify-center left-0 bottom-0">
      <div
        className={`w-full h-full fixed ${
          cartMode && "bg-black bg-opacity-25"
        } bg-opacity-0 transition-opacity ease-in-out duration-300 top-0 cursor-pointer`}
        onClick={() => setCartMode(false)}
      ></div>
      <div className="w-full h-full flex items-start justify-end container1 pt-[84px]">
        <CartBox cart={cart} setCartMode={setCartMode} />
      </div>
    </div>
  );
}
