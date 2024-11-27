import { CartItem } from "@/src/types/CartItem";
import { Product } from "@/src/types/Product";
import Image from "next/image";
import React from "react";

type PropType = {
  CartItem?: CartItem;
  product?: Product;
  quantity?: number;
};

export default function SingleCheckItem({
  CartItem,
  product,
  quantity,
}: PropType) {
  return (
    <div className="w-full items-start justify-between flex border-[1px] border-opacity-15 border-black h-[100px] rounded-md p-2 bg-slate-50">
      <div className="flex flex-col items-start justify-center text-black gap-1">
        <p className="text-xs">
          <span className="font-semibold text-sm">Title: </span>
          {CartItem ? CartItem.product.title : product?.title}
        </p>

        <p className="text-xs">
          <span className="font-semibold text-sm">Price: </span>
          {CartItem ? CartItem.product.salePrice : product?.salePrice}
        </p>
        <p className="font-semibold">
          {CartItem ? CartItem.quantity : quantity}x
        </p>
      </div>
      <div className="relative w-[70px] h-[70px]">
        <Image
          src={CartItem ? CartItem.product.image : product?.image || ""}
          alt="image"
          fill
          sizes="60px"
        />
      </div>
    </div>
  );
}
