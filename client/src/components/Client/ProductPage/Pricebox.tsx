import { Product } from "@/src/types/Product";
import Image from "next/image";
import React, { useState } from "react";
import SetAmountBox from "./SetAmount";
type PropType = {
  product: null | Product;
};
export default function Pricebox({ product }: PropType) {
  const [amount, setAmount] = useState(0);
  let promotion;
  let dif;
  let percentage;
  if (product) {
    promotion = product?.price > product?.salePrice;
    dif = product?.price - product?.salePrice;
    percentage = Math.floor((dif / product.price) * 100);
  }
  return (
    <div className="h-[290px] w-[30%] bg-opacity-60 bg-slate-50 p-4 rounded-md shadow-md flex items-center justify-between flex-col ">
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-black text-3xl font-medium">
            ${product?.salePrice}
          </h1>
          {promotion && (
            <p className="line-through text-lg text-black opacity-30">
              {product?.price}
            </p>
          )}
        </div>
        <p
          className={`text-black text-sm  ${
            product?.inStock && product?.inStock <= 0
              ? "text-red-500"
              : "text-green-500"
          } `}
        >
          {product?.inStock && product?.inStock > 0
            ? "Available"
            : "Not Availabe"}
        </p>
      </div>
      <section className="flex flex-col gap-2 w-full">
        <div className="w-full flex justify-between">
          <SetAmountBox amount={amount} setAmount={setAmount} />
          {promotion && (
            <div className="bg-customRed  px-3 rounded-md shadow-lg text-white text-sm font-medium flex items-center justify-center h-[30px]">
              -{percentage}%
            </div>
          )}
        </div>
        <button className="btn w-full text-white btn-success">
          Add to Cart
          <Image
            src={"/icons/header/trolley.png"}
            width={20}
            height={20}
            alt="cart"
          />
        </button>
        <button className="btn w-full text-white btn-neutral">Buy</button>
      </section>
    </div>
  );
}
