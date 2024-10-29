import { updateCategory } from "@/src/api/CategoryApi";
import { CategoryType } from "@/src/types/Category";
import React, { useState } from "react";

type PropType = {
  category: CategoryType;
  setActiveCategory: React.Dispatch<React.SetStateAction<number | null>>;
  activeCategory: number | null;
};

export default function SingleCategoryDetails({ category }: PropType) {
  const [checked, setChecked] = useState<boolean>(Boolean(category.pinned));
  const handleClick = async () => {
    setChecked(!checked);

    try {
      await updateCategory(
        { pinned: !checked ? "true" : "false" },
        `${category.id}`
      );
    } catch (error) {
      console.error("Failed to update pinned status", error);
      setChecked(checked);
    }
  };
  return (
    <div className="w-full bg-darkBrown px-6 py-3 rounded-md flex items-center justify-start text-white">
      <div className="flex items-center justify-center gap-3 w-fit ">
        <p>Pinned : {checked ? "true" : "false"}</p>
        <input
          type="checkbox"
          name=""
          id=""
          className="checkbox checkbox-sm bg-white"
          defaultChecked={Boolean(category.pinned)}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
