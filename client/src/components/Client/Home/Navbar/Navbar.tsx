"use client";
import { RootState } from "@/src/store/store";
import { CategoryType } from "@/src/utils/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { category, loading } = useSelector(
    (state: RootState) => state.category
  );
  const updatedCategories = [
    ...category,
    {
      link: "/",
      title: "All",
      image: "",
    } as CategoryType,
  ].reverse();

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
      {updatedCategories?.map((category) => (
        <Link
          className={`h-full px-4 flex items-center justify-center text-xs gap-1.5 rounded-3xl cursor-pointer text-white transition-all duration-200 ease-in-out hover:bg-lightBrown
           ${category.link === "/" && "bg-lightBrown"}  `}
          href={`${
            category.link === "/"
              ? "/"
              : `/products/?category=${category.id}&page=1`
          }`}
          key={category.id}
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
