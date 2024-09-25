"use client";
import { getCategories } from "@/src/api/CategoryApi";
import { Category } from "@/src/utils/data";
import React, { useEffect, useState } from "react";
import PinnedProductsWrapper from "./PinnedProductsWrapper";
import PinnedWrapperSkeleton from "../Card/PinnedWrapperSkeleton";

export default function PinnedCategory() {
  const [pinned, setPinned] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      const res = await getCategories();
      const pinned = res.filter((el: Category) => el.pinned);
      setPinned(pinned);
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <div className="w-full flex flex-col items-center justify-between gap-8">
      {loading && <PinnedWrapperSkeleton />}
      {pinned?.map((el, key) => (
        <PinnedProductsWrapper Category={el} key={key} />
      ))}
    </div>
  );
}
