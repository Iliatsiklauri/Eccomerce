"use client";
import { fetchProductsByCategory } from "@/src/api/ProductsApi";
import { Product } from "@/src/utils/data";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Card from "../Home/Card/Card";
import Pagination from "../Home/Pagination/Pagination";

export default function ProductsList() {
  const params = useSearchParams();
  const active = params.get("category");
  const [products, setProducts] = useState<null | Product[]>(null);
  useEffect(() => {
    async function getData() {
      const res = await fetchProductsByCategory({
        category: Number(active),
        pinned: false,
      });
      setProducts(res);
    }
    getData();
  }, [active]);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-10">
      <div className="grid grid-cols-5">
        {products?.map((el: Product, key) => (
          <Card card={el} key={key} />
        ))}
      </div>
      <Pagination />
    </div>
  );
}
