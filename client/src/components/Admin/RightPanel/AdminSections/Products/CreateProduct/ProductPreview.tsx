import { Product } from "@/src/types/Product";
import Image from "next/image";
import React from "react";
type PropType = {
  title: string;
  category1: string | null | number;
  description: string;
  price: number | string;
  salePrice: number | string;
  inStock: number | string;
  brand: string;
  pinned: boolean;
  imageForPrev: null | string | File;
  product: Product | null;
};
export default function ProductPreview({
  imageForPrev,
  product,
  description,
  brand,
  price,
  title,
}: PropType) {
  return (
    <div className="w-[30%] h-full pr-6  flex flex-col items-center justify-start gap-10 pt-1">
      <h2 className="text-3xl text-black font-medium">Preview</h2>
      <div className="w-full gap-5 flex flex-col justify-between text-black p-1.5 rounded-lg border-[1px] border-black border-opacity-15">
        <div className="relative w-full h-[300px] overflow-hidden flex-shrink-0 rounded-md group cursor-pointer">
          {imageForPrev ? (
            <Image
              src={URL.createObjectURL(imageForPrev as File)}
              fill
              alt="Product image"
              className="object-fill transition-transform duration-200 ease-in-out transform group-hover:scale-105"
            />
          ) : product ? (
            <Image
              src={product.image}
              fill
              alt="Product image"
              className="object-fill transition-transform duration-200 ease-in-out transform group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-black opacity-15"></div>
          )}
        </div>
        <div className="flex items-start justify-between flex-col h-full p-0.5">
          <div className="flex flex-col items-start justify-center">
            <p className="text-lg font-medium">{title}</p>
            <p className="text-md opacity-50 tracking-tight">
              {description.slice(0, 70)}
              {description.length > 70 && "..."}
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-lg font-medium">${price}</p>
            {(brand || product?.brand) && (
              <div className="badge badge-primary badge-outline text-xs font-medium">
                {brand || product?.brand}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
