"use client";
import { RootState } from "@/src/store/store";
import { CategoryType } from "@/src/types/Category";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SingleCategory from "./SingleCategory";
const CategoryList = () => {
  const { category } = useSelector((state: RootState) => state.category);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  return (
    <div className="w-full h-full bg-white rounded-xl shadow-md shadow-stone-500 flex flex-col p-5 gap-5 overflow-y-auto">
      {category.map((category: CategoryType) => (
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
