import { Product } from "@/src/types/Product";
import React from "react";
type PropType = {
  product: null | Product;
};

export default function ProductDetails({ product }: PropType) {
  return (
    <li className="flex items-start justify-center w-[20%] flex-col">
      <p className="text-xl text-black font-medium">
        {product?.category.title}
      </p>
      <p className="text-xl text-black font-medium">{product?.title}</p>
      <p className="text-xl text-black font-medium">{product?.description}</p>
      <p className="text-xl text-black font-medium">
        {product?.pinned ? "true" : "false"}
      </p>
    </li>
  );
}
