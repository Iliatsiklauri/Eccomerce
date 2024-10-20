import { Product } from "@/src/types/Product";
import React from "react";
type PropType = {
  product: null | Product;
};
export default function ProductDescription({ product }: PropType) {
  return (
    <div className="w-[50%] flex flex-col gap-3">
      <h2 className="text-2xl text-black font-medium">Description</h2>
      <p className="text-black text-md">{product?.description}</p>
    </div>
  );
}
