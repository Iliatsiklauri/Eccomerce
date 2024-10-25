"use client";
import { getCategories } from "@/src/api/CategoryApi";
import React, { useEffect, useState } from "react";
import PinnedProductsWrapper from "./PinnedProductsWrapper";
import PinnedWrapperSkeleton from "../Card/PinnedWrapperSkeleton";
import { CategoryType } from "@/src/types/Category";

export default function PinnedCategory() {
  const [pinned, setPinned] = useState<CategoryType[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      const res = await getCategories();
      const pinned = res.filter((el: CategoryType) => el.pinned);
      setPinned(pinned);
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <div className="w-full flex flex-col items-center justify-between gap-10">
      {loading && <PinnedWrapperSkeleton />}
      {pinned?.map((el, key) => (
        <PinnedProductsWrapper Category={el} key={key} />
      ))}
    </div>
  );
}
