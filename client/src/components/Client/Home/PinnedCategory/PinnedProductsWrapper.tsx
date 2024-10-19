import React, { useEffect, useState } from "react";
import PinnedHeader from "./PinnedHeader";
import { fetchProductsByCategory } from "@/src/api/ProductsApi";
import Card from "../Card/Card";
import { Product } from "@/src/types/Product";
import { CategoryType } from "@/src/types/Category";

type PropType = {
  Category: CategoryType;
  removeSameItemById?: number;
};

export default function PinnedProductsWrapper({
  Category,
  removeSameItemById,
}: PropType) {
  const [pinnedProducts, setPinnedProducts] = useState<null | Product[]>(null);
  useEffect(() => {
    async function getData() {
      const res = await fetchProductsByCategory({
        category: Category.id,
        pinned: true,
      });
      if (removeSameItemById) {
        return setPinnedProducts(
          res.products
            .filter((product: Product) => product.id !== removeSameItemById)
            .slice(0, 5)
        );
      }
      setPinnedProducts(res.products.slice(0, 5));
    }
    getData();
  }, [Category.id]);
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 min-h-[350px]">
      <PinnedHeader title={Category.title} id={Category.id} />
      <div className="w-full flex items-start justify-start gap-2">
        {pinnedProducts?.map((el, key) => (
          <Card card={el} key={key} fixed />
        ))}
      </div>
    </div>
  );
}
