import CartButton from "@/src/components/Shared/CartButton/CartButton";
import { Product } from "@/src/types/Product";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Card({
  card,
  fixed,
  listedCard,
}: {
  card: Product;
  fixed?: boolean;
  listedCard?: boolean;
}) {
  const isPromotion = card.salePrice < card.price;
  const diff = card.price - card.salePrice;
  const promotion = Math.floor((diff / card.price) * 100);
  return (
    <div
      className={`2xl:w-[240px] gap-2 flex flex-col ${
        listedCard ? "p-3 pr-4" : "p-2"
      } justify-between h-[300px] text-black transition-all duration-200 ease-in-out flex-shrink-0 ${
        fixed ? "w-[215px]" : "w-full"
      }`}
    >
      <div className="relative w-full h-40 overflow-hidden flex-shrink-0 rounded-md group">
        <Link
          href={`/products/${card.id}`}
          className="h-full w-full absolute z-10"
        ></Link>
        <CartButton />
        <Image
          src={`${card.image}`}
          alt={card.title || "Product Image"}
          fill
          className="object-fill transition-transform duration-200 ease-in-out transform group-hover:scale-105 "
        />
        {isPromotion && (
          <div className="absolute bg-customRed bottom-1 right-3 py-0.5 px-1 rounded-md shadow-lg text-white text-xs font-medium">
            -{promotion}%
          </div>
        )}
      </div>
      <div className="flex items-center justify-between flex-col h-full px-0.5 ">
        <div className="flex flex-col items-start justify-center">
          <p className="font-medium leading-5">{card.title}</p>
          <p className="text-xs opacity-50 tracking-tight leading-3 mt-2">
            {card.description.slice(0, 70)}
            {card.description.length > 70 && "..."}
          </p>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center justify-center gap-1">
            <p className="font-medium text-lg">${card.salePrice}</p>
            {isPromotion && (
              <p className="font line-through text-[13px] text-opacity-60 text-black">
                ${card.price}
              </p>
            )}
          </div>
          {card.brand && (
            <div
              className={`badge  badge-outline text-[10px] font-medium  ${
                card.category.id === 43
                  ? "border-red-500 text-red-500 bg-red-100"
                  : card.category.id === 39
                  ? "border-blue-600 text-blue-600 bg-blue-100"
                  : card.category.id === 38
                  ? "border-pink-500 text-pink-500 bg-pink-100"
                  : card.category.id === 41
                  ? "border-gray-500 bg-gray-200 text-gray-500 "
                  : "border-black bg-black bg-opacity-10"
              } `}
            >
              {card.brand.slice(0, 14)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
