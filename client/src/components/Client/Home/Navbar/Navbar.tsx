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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const res = await getCategories();
      res[0] = { link: "/", title: "All", image: "" };
      setCategories(res);
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <div className="w-full h-[48px] flex items-center justify-between overflow-x-auto bg-darkBrown rounded-3xl">
      {loading &&
        Array(10)
          .fill(null)
          .map((_, index) => (
            <div
              className="h-[15px] w-[80px] skeleton bg-white opacity-10 mx-2"
              key={index}
            ></div>
          ))}
      {categories?.map((category, key) => (
        <Link
          className={`h-full px-5 flex items-center justify-center text-xs gap-1.5 rounded-3xl cursor-pointer text-white transition-all duration-200 ease-in-out hover:bg-lightBrown
           ${category.link === "/" && "bg-lightBrown"}  `}
          href={`${
            category.link === "/"
              ? "/"
              : `/products/?category=${category.id}&page=1`
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
