import { RootState } from "@/src/store/store";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import FilterByPrice from "./FilterByPrice";
import SingleCategory from "./SingleCategory";

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
    <div className=" flex flex-col items-start justify-center gap-2 w-[18%] flex-shrink-0 mt-10">
      <div
        className="w-full flex items-start
       justify-center flex-col border-b-[1px] pb-2 border-opacity-5 border-black"
      >
        <div
          className="cursor-pointer h-[40px] flex w-full justify-between items-center"
          onClick={() => handleAccChange("Price")}
        >
          <p className="text-black text-xl">Price</p>
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
        {active === "Price" && <FilterByPrice />}
      </div>
      <SingleCategory categories={categories} />
    </div>
  );
}
