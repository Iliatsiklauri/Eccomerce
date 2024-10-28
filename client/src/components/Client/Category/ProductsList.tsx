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
  const promotion = params.get("promotion");

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
        promotion: promotion || "false",
      });
      setData(res);
      document.querySelector("header")?.scrollIntoView();
    }
    setLoading(false);
    getData();
  }, [category, page, minPrice, maxPrice, sort, promotion]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-10">
      <div className="self-start">
        <BreadCrumbs mainLink="Home" category={category} />
      </div>
      <div className={`flex w-full gap-5 items-start justify-between  `}>
        <FilterAccordion />

        <div className="flex flex-col justify-center items-start w-full gap-6 flex-shrink-0">
          {!loading && <SortingBy />}
          <div
            className={` ${
              data && data?.products.length > 0
                ? `grid grid-cols-4 2xl:grid-cols-4 w-[80%] 2xl:w-[82%] flex-shrink-0`
                : loading
                ? "flex flex-col w-[82%]"
                : "flex items-center justify-start w-full h-[300px]"
            }`}
          >
            {data && !loading && data?.products.length > 0 ? (
              data?.products.map((el: Product, index) => (
                <div
                  className={`border-[1px] border-black border-opacity-5 p-2  border-b-0 border-l-0
                ${index < 4 ? "border-t-0" : ""} 
                ${index % 4 === 3 ? "border-r-0" : ""}  
              `}
                  key={el.id}
                >
                  <Card card={el} listedCard />
                </div>
              ))
            ) : (
              <ProductsListSkeleton showheader less width />
            )}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Pagination
          total={data?.total}
          onChange={(newPage) => {
            router.push(
              `${
                promotion === "true"
                  ? `/products?page=${newPage}&promotion=true`
                  : `/products?category=${category}&page=${newPage}`
              }`,
              {
                scroll: false,
              }
            );
          }}
          activePage={Number(page)}
        />
      </div>
    </div>
  );
}
