import { CartItem } from "@/src/types/CartItem";
import React, { useCallback, useEffect, useState } from "react";
import SingleCheckItem from "./SingleCheckItem";
import OrderButton from "./OrderButton";
import OrderSummary from "./OrderSummary";
import { getProductById } from "@/src/api/ProductsApi";
import { Product } from "@/src/types/Product";
import { useSearchParams } from "next/navigation";

type PropType = {
  cart: [] | CartItem[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setBg: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAddress: {
    street: string;
    lat: number;
    lng: number;
  } | null;
};
export default function CartItemsList({
  cart,
  selectedAddress,
  setBg,
  setLoading,
}: PropType) {
  const params = useSearchParams();
  const productId = params.get("id");
  const quantity = params.get("quantity");

  const [total, setTotal] = useState(0);
  const [product, setProduct] = useState<null | Product>(null);

  const fetchProduct = useCallback(async () => {
    if (productId) {
      const res = await getProductById(productId);
      setProduct(res);
      if (res) {
        const tot = Number(res.salePrice) * Number(quantity);
        setTotal(tot);
      }
    }
  }, [productId, quantity]);

  useEffect(() => {
    let newTotal;

    if (productId && quantity) {
      fetchProduct();
    } else {
      newTotal = cart.reduce((acc, cartItem: CartItem) => {
        return acc + cartItem.quantity * cartItem.product.salePrice;
      }, 0);
      setTotal(newTotal);
    }
  }, [cart, productId, quantity, fetchProduct]);
  return (
    <div className="w-[60%] flex flex-col justify-center items-center gap-10">
      <div className="w-full grid grid-cols-3 gap-3 ">
        {product ? (
          <SingleCheckItem product={product} quantity={Number(quantity)} />
        ) : (
          cart.map((cartItem: CartItem) => (
            <SingleCheckItem CartItem={cartItem} key={cartItem.id} />
          ))
        )}
      </div>
      <OrderSummary
        product={product}
        total={total}
        cart={cart}
        selectedAddress={selectedAddress}
      />
      <div className="w-[99%] h-[1px] bg-black opacity-15"></div>
      <OrderButton
        product={product}
        quantity={Number(quantity)}
        setBg={setBg}
        setLoading={setLoading}
      />
    </div>
  );
}
