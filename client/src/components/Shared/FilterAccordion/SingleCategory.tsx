import { categoryState } from "@/src/store/features/categorySlice";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type PropType = {
  categories: categoryState;
};
export default function SingleCategory({ categories }: PropType) {
  const [active, setActive] = useState(false);
  return (
    <div className="w-full flex items-start justify-center flex-col gap-2">
      <div
        className="w-full flex items-center justify-between cursor-pointer"
        onClick={() => setActive(!active)}
      >
        <p className="text-black text-xl">Category</p>
        <Image
          src={"/icons/adminPanel/arrow-down.png"}
          width={20}
          height={20}
          alt="arrow"
          className={`${
            active && "rotate-180 transition-all duration-150 ease-in-out"
          }`}
        />
      </div>
      {active && (
        <form className="w-full">
          {categories.category.map((el) => (
            <Link
              href={`/products?category=${el.id}`}
              onClick={() => {
                setActive(false);
              }}
              key={el.id}
              className="w-full h-[32px] hover:bg-opacity-5 bg-opacity-0 bg-black cursor-pointer rounded-md pl-1 text-black flex items-center justify-start"
            >
              <p>{el.title}</p>
            </Link>
          ))}
        </form>
      )}
    </div>
  );
}
