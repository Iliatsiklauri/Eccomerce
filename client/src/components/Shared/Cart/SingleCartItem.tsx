import { CartItem } from "@/src/types/CartItem";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProductAmount from "./ProductAmount";
import { deleteItemFromCart, updateCartItem } from "@/src/api/CartItemsApi";
import { useDispatch } from "react-redux";
import { setCart } from "@/src/store/features/cartSlice";
import Link from "next/link";

type PropType = {
  cartItem: CartItem;
  setCartMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SingleCartItem({ cartItem, setCartMode }: PropType) {
  const dispatch = useDispatch();
  const promotion = cartItem.product.price > cartItem.product.salePrice;
  const [amount, setAmount] = useState(cartItem.quantity);

  const { id: cartItemId } = cartItem;

  const handleDelete = async () => {
    const res = await deleteItemFromCart(cartItemId);
    dispatch(setCart(res));
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      const CartItems = await updateCartItem(cartItemId, amount);
      dispatch(setCart(CartItems));
    }, 300);

    return () => clearTimeout(timer);
  }, [amount, dispatch, cartItemId]);

  return (
    <div className="w-full h-[70px] border-black border-b-[1px] border-opacity-5 flex-shrink-0 pb-2 flex items-center justify-between px-3 text-black pt-1">
      <div className="flex gap-3 flex-shrink-0 w-[73%]">
        <div className="w-[65px] h-[65px] overflow-hidden bg-black bg-opacity-20 flex items-center justify-center relative">
          <Image
            src={cartItem.product.image}
            fill
            alt="product image"
            className="object-center"
            sizes="65px"
          />
        </div>
        <div className="flex flex-col items-start text-[14px]">
          <Link
            href={`/products/${cartItem.product.id}`}
            onClick={() => setCartMode(false)}
          >
            <p className="hover:underline cursor-pointer">
              {cartItem.product.title}
            </p>
          </Link>
          <div className="flex items-center justify-center gap-1">
            <p className={` font-medium `}>
              {" "}
              {Math.ceil(cartItem.product.salePrice * cartItem.quantity * 100) /
                100}
              $
            </p>
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
          onClick={() => handleDelete()}
        />
        <ProductAmount
          amount={amount}
          setAmount={setAmount}
          inStock={cartItem.product.inStock}
        />
      </div>
    </div>
  );
}
