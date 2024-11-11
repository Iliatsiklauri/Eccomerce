import { CartItem } from "@/src/types/CartItem";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type PropType = {
  orderItem: CartItem;
};
export default function SingleOrderProducts({ orderItem }: PropType) {
  const product = orderItem.product;
  const isPromotion = product.price > product.salePrice;
  const promotionPercentage =
    Math.ceil(product.salePrice * orderItem.quantity * 100) / 100;
  console.log(promotionPercentage);
  return (
    <div className="w-full p-2 rounded-md border-[1px] border-black border-opacity-10 bg-white text-sm flex justify-between items-center text-black shadow-sm">
      <div className="flex items-start justify-center gap-6">
        <div className="relative w-[40px] h-[40px] overflow-hidden">
          <Image
            src={product.image}
            alt="productImage"
            fill
            className="object-center"
            sizes="65px"
          />
        </div>
        <div>
          <Link
            className="cursor-pointer hover:underline"
            href={`/products/${product.id}`}
            target="_blank"
          >
            {orderItem.product.title}
          </Link>
          <div className="flex gap-2">
            <p className="font-semibold">Price: {product.salePrice}$</p>
            {isPromotion && (
              <p className="line-through text-sm"> {product.price}$</p>
            )}
          </div>
        </div>
      </div>
      <p className="font-bold mr-5 text-[15px]">{orderItem.quantity}x</p>
    </div>
  );
}
