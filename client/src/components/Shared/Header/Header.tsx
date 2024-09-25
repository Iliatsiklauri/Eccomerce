"use client";
import React, { useState } from "react";
import HeaderCartSection from "./HeaderCartSection";
import SearchInput from "./SearchInput";
import Link from "next/link";

export default function Header() {
  const [focus, setFocus] = useState(false);
  return (
    <header className="w-full h-[80px] bg-darkBrown flex items-center justify-center z-50 shadow-sm relative">
      {focus && (
        <div
          className="absolute bg-black w-full h-full z-10 bg-opacity-20 top-[80px]"
          onClick={() => setFocus(false)}
        ></div>
      )}
      <Link
        className="text-white text-3xl left-[5%] absolute font-semibold cursor-pointer"
        href={"/"}
      >
        Eccomerce
      </Link>
      <div className="container1 flex justify-between items-center">
        <SearchInput focus={focus} setFocus={setFocus} />
        <HeaderCartSection />
      </div>
    </header>
  );
}
