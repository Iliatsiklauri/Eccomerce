import { Product } from "@/src/types/Product";
import Image from "next/image";
import React from "react";

type PropType = {
  product: null | Product;
};

export default function ProductImage({ product }: PropType) {
  return (
    <div className="flex items-start justify-center w-[40%] flex-col gap-6">
      <h1 className="text-black text-3xl font-medium">
        {product ? product?.title : "loading..."}
      </h1>

      <div className="relative w-full h-[430px] flex-shrink-0">
        {product ? (
          <Image
            src={product?.image}
            alt="product image"
            fill
            sizes="(max-width: 640px) 100vw, (min-width: 641px) 50vw, (min-width: 1024px) 100vw"
            className="object-fill"
          />
        ) : (
          <div className="skeleton opacity-15 w-full h-full flex-shrink-0"></div>
        )}
      </div>
    </div>
  );
}
