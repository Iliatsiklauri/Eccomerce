import { CartItem } from "@/src/types/CartItem";
import Image from "next/image";
import React from "react";

type PropType = {
  CartItem: CartItem;
};

export default function SingleCheckItem({ CartItem }: PropType) {
  return (
    <div className="w-full items-start justify-between flex border-[1px] border-opacity-15 border-black h-[100px] rounded-md p-2 bg-slate-50">
      <div className="flex flex-col items-start justify-center text-black gap-1">
        <p className="text-xs">
          <span className="font-semibold text-sm">Title: </span>
          {CartItem.product.title}
        </p>

        <p className="text-xs">
          <span className="font-semibold text-sm">Price: </span>
          {CartItem.product.salePrice}
        </p>
        <p className="font-semibold">{CartItem.quantity}x</p>
      </div>
      <div className="relative w-[70px] h-[70px]">
        <Image src={CartItem.product.image} alt="image" fill sizes="60px" />
      </div>
    </div>
  );
}
