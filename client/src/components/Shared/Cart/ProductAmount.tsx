import React from "react";
type PropType = {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  inStock: number;
};
export default function ProductAmount({
  amount,
  setAmount,
  inStock,
}: PropType) {
  return (
    <div className="w-full h-[30px]  bg-[#F1F1F1] flex items-center justify-between px-3 rounded-md ">
      <button
        className="text-2xl w-[20px] h-[20px] flex items-center justify-center active:text-black"
        onClick={() => {
          if (amount !== 1) setAmount((prev) => prev - 1);
        }}
      >
        -
      </button>
      <p className="text-black font-medim text-lg">{amount}</p>
      <button
        className="text-xl w-[20px] h-[20px] flex items-center justify-center active:text-black "
        onClick={() => {
          if (amount !== inStock) setAmount((prev) => prev + 1);
        }}
      >
        +
      </button>
    </div>
  );
}
