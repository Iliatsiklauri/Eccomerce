import { CartItem } from "@/src/types/CartItem";
import React from "react";
import SingleOrderProducts from "./SingleOrderProducts";

type PropType = {
  ordetItems: CartItem[];
};
export default function OrderProducts({ ordetItems }: PropType) {
  return (
    <div
      className={` w-full p-2 bg-slate-100 rounded-md shadow-sm border-[1px] border-black border-opacity-5 transition-all duration-200 ease-in-out flex flex-col items-start justify-center gap-2`}
    >
      {ordetItems.map((orderItem) => (
        <SingleOrderProducts key={orderItem.id} orderItem={orderItem} />
      ))}
    </div>
  );
}
