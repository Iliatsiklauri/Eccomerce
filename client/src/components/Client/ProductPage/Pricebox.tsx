import { Product } from "@/src/types/Product";
import Image from "next/image";
import React, { useState } from "react";
import SetAmountBox from "./SetAmount";
type PropType = {
  product: null | Product;
};
export default function Pricebox({ product }: PropType) {
  const [amount, setAmount] = useState(0);
  return (
    <div className="h-[290px] w-[30%] bg-opacity-60 bg-slate-50 p-4 rounded-md shadow-md flex items-center justify-between flex-col ">
      <div className="flex items-start justify-between w-full">
        <h1 className="text-black text-3xl font-medium">${product?.price}</h1>
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
        <SetAmountBox amount={amount} setAmount={setAmount} />
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
