import { CategoryType } from "@/src/types/Category";
import React from "react";
import SingleCategoryHeader from "./SingleCategoryHeader";
import SingleCategoryDetails from "./SingleCategoryDetails";
type PropType = {
  category: CategoryType;
  setActiveCategory: React.Dispatch<React.SetStateAction<number | null>>;
  activeCategory: number | null;
};
export default function SingleCategory({
  category,
  activeCategory,
  setActiveCategory,
}: PropType) {
  return (
    <div className="w-full flex items-end justify-center flex-col gap-2 ">
      <SingleCategoryHeader
        activeCategory={activeCategory}
        category={category}
        setActiveCategory={setActiveCategory}
      />
      {activeCategory === category.id && (
        <SingleCategoryDetails
          activeCategory={activeCategory}
          category={category}
          setActiveCategory={setActiveCategory}
        />
      )}
    </div>
  );
}
