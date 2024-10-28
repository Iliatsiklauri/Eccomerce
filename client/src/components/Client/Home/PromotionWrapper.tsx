"use client";

import React, { useEffect, useState } from "react";
import PinnedHeader from "./PinnedCategory/PinnedHeader";
import { fetchProductsByCategory } from "@/src/api/ProductsApi";
import { Product } from "@/src/types/Product";
import Card from "./Card/Card";
import PinnedWrapperSkeleton from "./Card/PinnedWrapperSkeleton";

export default function PromotionWrapper() {
  const [products, setProducts] = useState<null | Product[]>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await fetchProductsByCategory({ promotion: "true" });
      setProducts(res.products);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 min-h-[350px]">
      {loading && <PinnedWrapperSkeleton />}
      <PinnedHeader title={"Promotions"} id={12} isPromotion />
      <div className="w-full flex items-start justify-start">
        {products?.slice(0, 5).map((el, key) => (
          <Card card={el} key={key} fixed />
        ))}
      </div>
    </div>
  );
}
