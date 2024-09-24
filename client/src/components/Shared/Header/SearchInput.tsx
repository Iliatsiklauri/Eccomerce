"use client";
import Image from "next/image";
import React, { useState } from "react";
type propType = {
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
  focus: boolean;
};

export default function SearchInput({ focus, setFocus }: propType) {
  const [searchText, setSeach] = useState("");
  return (
    <label
      className={`w-[600px] rounded-lg bg-[#E1E4E8] flex h-[50px] items-center justify-center px-4 relative z-30`}
      onFocus={() => setFocus(true)}
    >
      <div className="w-[19px] h-[19px] relative">
        <Image
          alt="user"
          src={"/icons/header/search-interface-symbol.png"}
          fill
        />
      </div>
      <input
        type="text"
        className="w-full rounded-[20px] text-lg bg-transparent pl-4 pt-1 focus:outline-none flex text-black"
        placeholder="Search..."
        onChange={(e) => setSeach(e.target.value)}
      />
      {focus && (
        <div className="w-full absolute min-h-[40px] top-[70px] bg-[#E1E4E8] rounded-md p-5 text-center text-black text-xl">
          Search for {!searchText ? "anything" : searchText}
        </div>
      )}
    </label>
  );
}
