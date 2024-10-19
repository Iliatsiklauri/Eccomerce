"use client";
import { getProductById } from "@/src/api/ProductsApi";
import PinnedProductsWrapper from "@/src/components/Client/Home/PinnedCategory/PinnedProductsWrapper";
import Pricebox from "@/src/components/Client/ProductPage/Pricebox";
import ProductComments from "@/src/components/Client/ProductPage/ProductComments";
import ProductDescription from "@/src/components/Client/ProductPage/ProductDescription";
import ProductFooter from "@/src/components/Client/ProductPage/ProductFooter";
import ProductImage from "@/src/components/Client/ProductPage/ProductImage";
import BackButton from "@/src/components/Shared/BackButton/BackButton";
import { Product } from "@/src/types/Product";
import React, { useEffect, useState } from "react";

type PropType = {
  params: {
    id: string;
  };
};
export default function Page({ params: { id } }: PropType) {
  const [product, setProduct] = useState<null | Product>(null);
  const [error, setError] = useState<null | Product>(null);
  useEffect(() => {
    async function getData() {
      try {
        const res = await getProductById(id);
        if (!res?.category) {
          setError(res);
        }
        setProduct(res);
      } catch (er) {
        console.log(er);
      }
    }
    getData();
  }, [id]);
  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center min-h-[500px] text-3xl text-black">
        Product Not Found :)
      </div>
    );
  }
  return (
    <div className="w-full h-full flex items-start justify-center container1 flex-col">
      <BackButton />
      <div className="w-full flex items-center justify-center py-12 flex-col">
        <div className="flex items-start justify-center container1 flex-col gap-16">
          <div className="flex items-center justify-between w-full">
            <ProductImage product={product} />
            <Pricebox product={product} />
          </div>
          <ProductDescription product={product} />
          <ProductComments product={product} />
          <div className="w-full h-[1px] bg-black opacity-15"></div>
          {product ? (
            <PinnedProductsWrapper
              Category={product?.category}
              removeSameItemById={product.id}
            />
          ) : (
            <ProductFooter />
          )}
        </div>
      </div>
    </div>
  );
}
