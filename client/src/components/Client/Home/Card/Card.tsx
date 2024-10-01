import CartButton from "@/src/components/Shared/CartButton/CartButton";
import { Product } from "@/src/utils/data";
import Image from "next/image";
import React from "react";

export default function Card({ card }: { card: Product }) {
  return (
    <div className=" w-[240px] gap-1 flex flex-col justify-between h-[280px] text-black p-1.5 rounded-lg transition-all duration-200 ease-in-out flex-shrink-0">
      <div className="relative w-full h-44 overflow-hidden flex-shrink-0 rounded-md group">
        <div className="bg-black h-full w-full absolute z-10 opacity-0 hover:opacity-15 transition-all duration-200 ease-in-out cursor-pointer"></div>
        <CartButton />
        <Image
          src={`${card.image}`}
          alt={card.title || "Product Image"}
          fill
          className="object-fill transition-transform duration-200 ease-in-out transform group-hover:scale-105"
        />
      </div>
      <div className="flex items-start justify-between flex-col h-full p-0.5">
        <div className="flex flex-col items-start justify-center">
          <p className="text-lg font-medium">{card.title}</p>
          {/* <p className="text-[12px]">ID :{card.id}</p> */}
          {/* <p className=" text-red-600">{card.pinned && "Pinned"}</p> */}
          <p className="text-sm opacity-50 tracking-tight">
            {card.description}
          </p>
        </div>
        <p className="text-lg font-medium">${card.price}</p>
      </div>
    </div>
  );
}
