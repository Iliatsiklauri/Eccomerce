"use client";
import { fetchProductsByCategory } from "@/src/api/ProductsApi";
import { Product } from "@/src/utils/data";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Card from "../Home/Card/Card";
import Pagination from "../Home/Pagination/Pagination";
import ProductsListSkeleton from "./ProductsListSkeleton";

export default function ProductsList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<null | {
    total: number;
    products: Product[];
  }>(null);
  const router = useRouter();
  const params = useSearchParams();
  const category = params.get("category");
  const page = params.get("page") ? Number(params.get("page")) : 1;

  useEffect(() => {
    async function getData() {
      const res = await fetchProductsByCategory({
        category: Number(category),
        pinned: false,
        page: Number(page),
      });
      setData(res);
      document.querySelector("header")?.scrollIntoView();
    }
    setLoading(false);
    getData();
  }, [category, page]);
  if (!data?.products.length && !loading) {
    return <h1 className="text-xl font-semibold text-black">No Products :)</h1>;
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-20">
      <div className="grid grid-cols-5 gap-y-8">
        {data?.products.map((el: Product) => (
          <Card card={el} key={el.id} />
        ))}
      </div>
      {loading && <ProductsListSkeleton showheader />}
      <Pagination
        total={data?.total}
        onChange={(newPage) => {
          router.push(`/products?category=${category}&page=${newPage}`, {
            scroll: false,
          });
        }}
        activePage={Number(page)}
      />
    </div>
  );
}
