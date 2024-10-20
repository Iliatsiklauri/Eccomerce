"use client";

import React, { useEffect, useState } from "react";
import PinnedHeader from "./PinnedCategory/PinnedHeader";
import { fetchProductsByCategory } from "@/src/api/ProductsApi";
import { Product } from "@/src/types/Product";
import Card from "./Card/Card";

export default function PromotionWrapper() {
  const [products, setProducts] = useState<null | Product[]>(null);
  useEffect(() => {
    const getData = async () => {
      const res = await fetchProductsByCategory({ promotion: "true" });
      setProducts(res.products);
    };
    getData();
  }, []);
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 min-h-[350px]">
      <PinnedHeader title={"Promotions"} id={12} isPromotion />
      <div className="w-full flex items-start justify-start gap-2">
        {products?.slice(0, 5).map((el, key) => (
          <Card card={el} key={key} fixed />
        ))}
      </div>
    </div>
  );
}
