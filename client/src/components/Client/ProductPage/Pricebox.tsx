import { Product } from "@/src/types/Product";
import Image from "next/image";
import React, { useState } from "react";
import SetAmountBox from "./SetAmount";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { setCart } from "@/src/store/features/cartSlice";
import { addItemToCart, updateCartItem } from "@/src/api/CartItemsApi";
import { CartItem } from "@/src/types/CartItem";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PropType = {
  product: null | Product;
};
export default function Pricebox({ product }: PropType) {
  const [amount, setAmount] = useState(1);
  let promotion;
  let dif;
  let percentage;
  if (product) {
    promotion = product?.price > product?.salePrice;
    dif = product?.price - product?.salePrice;
    percentage = Math.floor((dif / product.price) * 100);
  }

  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

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
          <SetAmountBox
            amount={amount}
            setAmount={setAmount}
            product={product}
          />
          {promotion && (
            <div className="bg-customRed  px-3 rounded-md shadow-lg text-white text-sm font-medium flex items-center justify-center h-[30px]">
              -{percentage}%
            </div>
          )}
        </div>
        {isLoggedIn ? (
          <button
            className="btn w-full text-white btn-success"
            onClick={async () => {
              const existingCartItem = cart.find(
                (cartItem: CartItem) =>
                  cartItem.product.pinnedImage === product?.pinnedImage
              );
              if (existingCartItem && product) {
                if (
                  existingCartItem.quantity !==
                    existingCartItem.product.inStock &&
                  existingCartItem.quantity + amount <= product?.inStock
                ) {
                  const cartItems = await updateCartItem(
                    existingCartItem.id,
                    existingCartItem.quantity + amount
                  );
                  dispatch(setCart(cartItems));
                }
              } else {
                if (product) {
                  const cartItems = await addItemToCart(product.id, amount);
                  if (!cartItems.message) {
                    dispatch(setCart(cartItems));
                  }
                }
              }
            }}
          >
            Add to Cart
            <Image
              src={"/icons/header/trolley.png"}
              width={20}
              height={20}
              alt="cart"
            />
          </button>
        ) : (
          <Link
            href={"/auth?mode=login"}
            className="btn w-full text-white btn-success"
          >
            Add to Cart
          </Link>
        )}
        {isLoggedIn ? (
          <button
            className="btn w-full text-white btn-neutral"
            onClick={async () => {
              if (product) {
                const cartItems = await addItemToCart(product.id, amount);
                dispatch(setCart(cartItems));
              }
              router.push("/checkout");
            }}
          >
            Buy
          </button>
        ) : (
          <Link
            className="btn w-full text-white btn-neutral"
            href={"/auth?mode=login"}
          >
            Buy
          </Link>
        )}
      </section>
    </div>
  );
}
