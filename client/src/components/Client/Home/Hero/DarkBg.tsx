import { Product } from "@/src/types/Product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type PropType = {
  product: Product;
};
export default function DarkBg({ product }: PropType) {
  return (
    <Link href={`/products/${product.id}`} target="_blank">
      <div className="bg-black absolute h-full w-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out"></div>
      <div
        className="w-[200px] h-[60px] bg-white rounded-2xl flex items-center justify-center gap-3 left-5
        cursor-pointer absolute opacity-0 bottom-[-20px] group-hover:bottom-5 group-hover:opacity-100 transition-all duration-300 ease-in-out "
      >
        <p className="text-xl text-darkBrown">View product</p>
        <Image
          src={"/icons/homepage/right-arrow.png"}
          alt="arrow"
          width={30}
          height={30}
        />
      </div>
    </Link>
  );
}
