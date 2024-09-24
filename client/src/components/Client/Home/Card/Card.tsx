import CartButton from "@/src/components/Shared/CartButton/CartButton";
import { CardType } from "@/src/utils/data";
import Image from "next/image";
import React from "react";

export default function Card({ card }: { card: CardType }) {
  return (
    <div className=" w-[240px] group  gap-2 flex flex-col justify-between h-[280px] text-black hover:shadow-xl  p-1.5 rounded-lg transition-all duration-200 ease-in-out">
      <div className="relative w-full h-36  overflow-hidden flex-shrink-0 rounded-md ">
        <div className="bg-black h-full w-full absolute z-10 opacity-0 group-hover:opacity-25 transition-all duration-200 ease-in-out cursor-pointer"></div>
        <CartButton />
        <Image src={`${card.image}`} alt="Shoes" fill className="object-fill" />
      </div>
      <div className="flex items-start justify-between flex-col h-full p-0.5">
        <div className="flex flex-col items-start justify-center">
          <p className="text-lg font-medium">{card.title}</p>
          <p className="text-sm opacity-50">{card.description}</p>
        </div>
        <p className="text-lg font-medium">₾{card.price}</p>
      </div>
    </div>
  );
}
