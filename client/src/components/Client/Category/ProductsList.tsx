"use client";
import { fetchProductsByCategory } from "@/src/api/ProductsApi";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Card from "../Home/Card/Card";
import Pagination from "../Home/Pagination/Pagination";
import ProductsListSkeleton from "./ProductsListSkeleton";
import { Product } from "@/src/types/Product";
import FilterAccordion from "../../Shared/FilterAccordion/FilterAccordion";
import BreadCrumbs from "../../Shared/BreadCrumbs/BreadCrumbs";
import SortingBy from "./SortingBy";

export default function ProductsList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<null | {
    total: number;
    products: Product[];
  }>(null);
  const router = useRouter();
  const params = useSearchParams();
  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");
  const category = params.get("category");
  const sort = params.get("sort");

  const page = params.get("page") ? Number(params.get("page")) : 1;

  useEffect(() => {
    async function getData() {
      const res = await fetchProductsByCategory({
        category: Number(category),
        pinned: false,
        page: Number(page),
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
        sort: sort || "",
      });
      setData(res);
      document.querySelector("header")?.scrollIntoView();
    }
    setLoading(false);
    getData();
  }, [category, page, minPrice, maxPrice, sort]);

  if (data && data?.products.length === 0 && !loading) {
    return <h1 className="text-xl font-semibold text-black">No Products :)</h1>;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-10">
      <div className="self-start">
        <BreadCrumbs mainLink="Home" category={category} />
      </div>
      <div
        className={`flex w-full gap-5 items-start justify-between ${
          loading ? "flex-col" : ""
        } `}
      >
        {!loading && <FilterAccordion />}
        <div className="flex flex-col justify-center items-start w-full gap-6 flex-shrink-0">
          <SortingBy />
          <div className="grid grid-cols-4 2xl:grid-cols-4 w-[80%] 2xl:w-[82%] flex-shrink-0">
            {data?.products.map((el: Product) => (
              <div
                className="border-[1px] border-black border-opacity-5 p-2"
                key={el.id}
              >
                <Card card={el} />
              </div>
            ))}
          </div>
          {loading && <ProductsListSkeleton showheader />}
        </div>
      </div>
      <div className="mt-10">
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
    </div>
  );
}
