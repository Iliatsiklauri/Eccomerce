import CartButton from "@/src/components/Shared/CartButton/CartButton";
import { Product } from "@/src/types/Product";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Card({
  card,
  fixed,
}: {
  card: Product;
  fixed?: boolean;
}) {
  return (
    <div
      className={`2xl:w-[240px] gap-1 flex flex-col p-1 justify-between h-[300px] text-black transition-all duration-200 ease-in-out flex-shrink-0 ${
        fixed ? "w-[215px]" : "w-full"
      }`}
    >
      <div className="relative w-full h-44 overflow-hidden flex-shrink-0 rounded-md group ">
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
      </div>
      <div className="flex items-center justify-between flex-col h-full px-0.5 ">
        <div className="flex flex-col items-start justify-center">
          <p className="font-medium leading-5">{card.title}</p>
          <p className="text-xs opacity-50 tracking-tight leading-3 mt-2">
            {card.description.slice(0, 70)}
            {card.description.length > 70 && "..."}
          </p>
        </div>
        <div className="w-full flex items-center justify-between pr-2.5">
          <p className="text-lg font-medium">${card.price}</p>
          {card.brand && (
            <div className="badge badge-primary badge-outline text-xs font-medium">
              {card.brand}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
