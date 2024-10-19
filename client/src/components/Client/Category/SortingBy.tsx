import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function SortingBy() {
  const params = useSearchParams();
  const router = useRouter();
  const [sortByPrice, setSortByPrice] = useState(false);
  const currentParams = new URLSearchParams(params.toString());
  return (
    <div className="flex items-center justify-center gap-4">
      <h1 className="text-black">Sort by</h1>
      <div
        className="flex items-center justify-center border-black border-2 rounded-lg px-2 gap-2 py-0.5 bg-darkBrown  text-white text-sm cursor-pointer"
        onClick={() => {
          setSortByPrice(!sortByPrice);
          if (sortByPrice) {
            currentParams.set("sort", "ASC");
          } else {
            currentParams.set("sort", "DESC");
          }
          router.push(`/products?${currentParams.toString()}`);
        }}
      >
        <p>Price : {!sortByPrice ? "ASC" : "DESC"}</p>
        <Image
          src={"/icons/homepage/icons8-arrow-down-50.png"}
          width={17}
          height={17}
          alt="arrow"
          className={`${
            !sortByPrice ? "rotate-180 " : "rotate-0"
          } transition-all duration-150 ease-in-out`}
        />
      </div>
    </div>
  );
}
