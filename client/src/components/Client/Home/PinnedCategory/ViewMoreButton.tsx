import Image from "next/image";
import Link from "next/link";
import React from "react";
type PropType = {
  id: number;
};
export default function ViewMoreButton({ id }: PropType) {
  return (
    <Link
      className="h-[40px] flex items-center justify-center gap-4 cursor-pointer"
      href={`/products/?category=${id}&page=1`}
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
