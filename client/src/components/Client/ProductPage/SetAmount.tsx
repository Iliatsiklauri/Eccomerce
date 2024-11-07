import { Product } from "@/src/types/Product";
import React from "react";
type PropType = {
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  product: null | Product;
  amount: number;
};
export default function SetAmountBox({ amount, setAmount, product }: PropType) {
  return (
    <div className="w-1/2 h-[40px]  bg-[#F1F1F1] flex items-center justify-between px-3 rounded-md">
      <button
        className="text-2xl w-[20px] h-[20px] flex items-center justify-center active:text-black"
        onClick={() => {
          if (amount !== 1) setAmount(amount - 1);
        }}
      >
        -
      </button>
      <p className="text-black font-medim text-lg">{amount}</p>
      <button
        className="text-xl w-[20px] h-[20px] flex items-center justify-center active:text-black "
        onClick={() => {
          if (amount !== product?.inStock) {
            setAmount(amount + 1);
          }
        }}
      >
        +
      </button>
    </div>
  );
}
