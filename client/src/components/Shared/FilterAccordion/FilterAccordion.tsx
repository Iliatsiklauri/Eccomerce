"use client";
import { RootState } from "@/src/store/store";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function FilterAccordion() {
  const [active, setActive] = useState<null | string>(null);
  const categories = useSelector((state: RootState) => state.category);
  const handleAccChange = (state: string) => {
    if (active === state) {
      setActive(null);
    } else {
      setActive(state);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center h-[100px] gap-2">
      <div
        className="h-[50px] w-full flex items-center
       justify-between cursor-pointer"
        onClick={() => handleAccChange("Price")}
      >
        <p>Price</p>
        <Image
          src={"/icons/adminPanel/arrow-down.png"}
          width={20}
          height={20}
          alt="arrow"
          className={`${
            active === "Price" &&
            "rotate-180 transition-all duration-150 ease-in-out"
          }`}
        />
      </div>
      <div
        className="h-[50px] w-full  flex items-center
       justify-between cursor-pointer"
        onClick={() => handleAccChange("Category")}
      >
        <p>Category</p>
        <Image
          src={"/icons/adminPanel/arrow-down.png"}
          width={20}
          height={20}
          alt="arrow"
          className={`${
            active === "Category" &&
            "rotate-180 transition-all duration-150 ease-in-out"
          }`}
        />
      </div>
    </div>
  );
}
