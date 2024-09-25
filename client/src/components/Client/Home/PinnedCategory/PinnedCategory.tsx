"use client";
import { getCategories } from "@/src/api/CategoryApi";
import { Category } from "@/src/utils/data";
import React, { useEffect, useState } from "react";

export default function PinnedCategory() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  useEffect(() => {
    async function getData() {
      const res = await getCategories();
      setCategories(res);
    }
    getData();
  }, []);
  return (
    <div>
      {categories?.map((el, key) => (
        <div key={key}>
          <p>{el.title}</p>
          <p>{el.pinned ? "true" : "false"}</p>
        </div>
      ))}
    </div>
  );
}
