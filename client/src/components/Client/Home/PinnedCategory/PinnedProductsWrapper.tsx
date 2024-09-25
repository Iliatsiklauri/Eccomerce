import React, { useEffect, useState } from "react";
import PinnedHeader from "./PinnedHeader";
import { Product, Category } from "@/src/utils/data";
import { fetchProductsByCategory } from "@/src/api/ProductsApi";
import Card from "../Card/Card";

type PropType = {
  Category: Category;
};

export default function PinnedProductsWrapper({ Category }: PropType) {
  const [pinnedProducts, setPinnedProducts] = useState<null | Product[]>(null);
  useEffect(() => {
    async function getData() {
      const res = await fetchProductsByCategory({
        category: Category.id,
        pinned: true,
      });
      setPinnedProducts(res);
    }
    getData();
  }, [Category.id]);
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 min-h-[350px]">
      <PinnedHeader title={Category.title} id={Category.id} />
      <div className="w-full flex items-center justify-start">
        {pinnedProducts?.map((el, key) => (
          <Card card={el} key={key} />
        ))}
      </div>
    </div>
  );
}
