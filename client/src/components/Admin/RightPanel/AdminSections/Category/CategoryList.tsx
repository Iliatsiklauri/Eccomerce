"use client";
import { RootState } from "@/src/store/store";
import { CategoryType } from "@/src/types/Category";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleCategory from "./SingleCategory";
import { getCategories } from "@/src/api/CategoryApi";

const CategoryList = () => {
  const [categories, setCategories] = useState<null | CategoryType[]>(null);

  useEffect(() => {
    async function getData() {
      const res = await getCategories();
      setCategories(res);
    }
    getData();
  }, []);

  const { loading } = useSelector((state: RootState) => state.category);

  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  return (
    <div className="w-full h-full bg-white rounded-xl shadow-md shadow-stone-500 flex flex-col p-5 gap-5 overflow-y-auto">
      {loading
        ? Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="skeleton w-full bg-black bg-opacity-45 h-[60px] rounded-md"
            ></div>
          ))
        : categories?.map((category: CategoryType) => (
            <SingleCategory
              activeCategory={activeCategory}
              category={category}
              setActiveCategory={setActiveCategory}
              key={category.id}
            />
          ))}
    </div>
  );
};
export default CategoryList;
