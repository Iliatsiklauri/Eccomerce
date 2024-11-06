import { CartItem } from "@/src/types/CartItem";
import Image from "next/image";
import React, { useState } from "react";
import ProductAmount from "./ProductAmount";
type PropType = {
  cartItem: CartItem;
};
export default function SingleCartItem({ cartItem }: PropType) {
  const promotion = cartItem.product.price > cartItem.product.salePrice;
  const [amount, setAmount] = useState(0);
  return (
    <div className="w-full h-[70px] border-black border-t-[1px] border-opacity-5 flex-shrink-0 flex items-center justify-between px-3 text-black pt-1">
      <div className="flex gap-3 flex-shrink-0 w-[73%]">
        <Image
          src={cartItem.product.image}
          width={65}
          height={40}
          alt="product image"
        />
        <div className="flex flex-col items-start text-[14px]">
          <p>{cartItem.product.title}</p>
          <div className="flex items-center justify-center gap-1">
            <p className={` font-medium `}> {cartItem.product.salePrice}$</p>
            {promotion && (
              <p className={`${promotion && " line-through"}`}>
                {cartItem.product.price}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="w-[26%] flex flex-col flex-shrink-0 items-end justify-between h-full pt-1">
        <Image
          src={"/icons/adminPanel/delete.png"}
          width={18}
          height={18}
          alt="delete"
          className="cursor-pointer"
        />
        <ProductAmount amount={amount} setAmount={setAmount} />
      </div>
    </div>
  );
}
