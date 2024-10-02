import { Product } from "@/src/types/Product";
import Image from "next/image";
import React from "react";

type PropType = {
  product: null | Product;
};

export default function ProductImage({ product }: PropType) {
  return (
    <div className="flex items-start justify-center w-1/3 flex-col gap-4">
      <h1 className="text-black text-3xl font-medium">{product?.title}</h1>
      <div className="relative w-full h-[400px] flex-shrink-0">
        {product ? (
          <Image
            src={product?.image}
            alt="product image"
            fill
            className="object-fill"
          />
        ) : (
          <div className="skeleton opacity-15 w-full h-full flex-shrink-0"></div>
        )}
      </div>
    </div>
  );
}
