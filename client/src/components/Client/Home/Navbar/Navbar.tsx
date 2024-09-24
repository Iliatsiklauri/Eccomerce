"use client";
import { getCategories } from "@/src/api/CategoryApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type CategoryType = {
  id: number;
  title: string;
  pinned: string;
  image: string;
  filePath: string;
  link: string;
};

export default function Navbar() {
  const [categories, setCategories] = useState<CategoryType[] | null>(null);

  useEffect(() => {
    async function getData() {
      const res = await getCategories();
      res[0] = { link: "/", title: "All", image: "" };
      setCategories(res);
    }
    getData();
  }, []);
  return (
    <div className="w-full h-[48px] flex items-center justify-between overflow-x-auto bg-darkBrown rounded-3xl">
      {categories?.map((category, key) => (
        <Link
          className={`h-full px-4 flex items-center justify-center text-xs gap-1.5 rounded-3xl cursor-pointer text-white
           ${category.link === "/" && "bg-lightBrown"}  `}
          href={`${
            category.link === "/" ? "/" : `/products/?category=${category.link}`
          }`}
          key={key}
        >
          {category.title !== "All" && (
            <Image
              alt={category.title}
              src={category.image}
              width={18}
              height={18}
            />
          )}
          <p>{category.title}</p>
        </Link>
      ))}
    </div>
  );
}
