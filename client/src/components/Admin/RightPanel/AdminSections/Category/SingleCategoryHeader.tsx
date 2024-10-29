import { CategoryType } from "@/src/types/Category";
import Image from "next/image";
import React from "react";
type PropType = {
  category: CategoryType;
  setActiveCategory: React.Dispatch<React.SetStateAction<number | null>>;
  activeCategory: number | null;
};
export default function SingleCategoryHeader({
  activeCategory,
  category,
  setActiveCategory,
}: PropType) {
  return (
    <div
      className={`flex items-center justify-between w-full py-4 px-6 ${
        activeCategory === category.id
          ? "bg-darkBrown"
          : "bg-black bg-opacity-70 hover:bg-opacity-75"
      }  cursor-pointer rounded-md transition-all ease-in-out duration-150`}
      onClick={() => {
        if (activeCategory === category.id) {
          setActiveCategory(null);
        } else {
          setActiveCategory(category.id);
        }
      }}
    >
      <div className="flex items-center justify-center gap-6">
        <h3 className="text-white text-xl">{category.title}</h3>
        <Image src={category.image} alt="category" width={30} height={30} />
      </div>
      <Image
        src={"/icons/adminPanel/icons8-down-arrow-50.png"}
        alt="arrow"
        className={`${
          activeCategory === category.id && "rotate-180"
        } ease-in-out duration-200 transition-all`}
        width={30}
        height={30}
      />
    </div>
  );
}
