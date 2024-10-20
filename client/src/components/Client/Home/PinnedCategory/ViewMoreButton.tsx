import Image from "next/image";
import Link from "next/link";
import React from "react";
type PropType = {
  id: number;
  isPromotion?: boolean;
};
export default function ViewMoreButton({ id, isPromotion }: PropType) {
  return (
    <Link
      className="h-[40px] flex items-center justify-center gap-4 cursor-pointer"
      href={`/products?${
        isPromotion ? `promotion=true` : `category=${id}`
      }&page=1`}
    >
      <p className="text-black hover:underline">View More</p>
      <Image
        src={"/icons/homepage/right-arrow.png"}
        alt="arrow"
        height={30}
        width={30}
      />
    </Link>
  );
}
