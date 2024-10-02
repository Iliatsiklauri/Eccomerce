import React, { useEffect, useState } from "react";
import PinnedHeader from "./PinnedHeader";
import { fetchProductsByCategory } from "@/src/api/ProductsApi";
import Card from "../Card/Card";
import { Product } from "@/src/types/Product";
import { CategoryType } from "@/src/types/Category";

type PropType = {
  Category: CategoryType;
};

export default function PinnedProductsWrapper({ Category }: PropType) {
  const [pinnedProducts, setPinnedProducts] = useState<null | Product[]>(null);
  useEffect(() => {
    async function getData() {
      const res = await fetchProductsByCategory({
        category: Category.id,
        pinned: true,
      });
      setPinnedProducts(res.products.slice(0, 5));
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
