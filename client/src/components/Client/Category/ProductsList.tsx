"use client";
import { fetchProductsByCategory } from "@/src/api/ProductsApi";
import { Product } from "@/src/utils/data";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Card from "../Home/Card/Card";
import Pagination from "../Home/Pagination/Pagination";
import CardSkeleton from "../Home/Card/CardSkeleton";

export default function ProductsList() {
  const [loading, setLoading] = useState(true);
  const params = useSearchParams();
  const active = params.get("category");
  const page = params.get("page");
  const [products, setProducts] = useState<null | {
    total: number;
    products: Product[];
  }>(null);
  useEffect(() => {
    async function getData() {
      const res = await fetchProductsByCategory({
        category: Number(active),
        pinned: false,
        page: Number(page),
      });
      setProducts(res);
      setLoading(false);
    }
    getData();
  }, [active, page]);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-10">
      <div className="flex items-center justify-center flex-col gap-5">
        {loading && (
          <>
            <CardSkeleton showHeader />
            <CardSkeleton showHeader />
            <CardSkeleton showHeader />
            <CardSkeleton showHeader />
          </>
        )}
      </div>
      <div className="grid grid-cols-5">
        {products?.products.map((el: Product, key) => (
          <Card card={el} key={key} />
        ))}
      </div>
      <Pagination total={products?.total} active={active} />
    </div>
  );
}
