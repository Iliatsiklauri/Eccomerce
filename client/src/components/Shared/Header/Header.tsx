"use client";
import HeaderCartSection from "./HeaderCartSection";
import SearchInput from "./SearchInput";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-[80px] bg-darkBrown flex items-center justify-center z-50 shadow-sm relative">
      <Link
        className="text-white text-3xl left-[5%] absolute font-semibold cursor-pointer"
        href={"/"}
      >
        Eccomerce
      </Link>
      <Link href={"/admin/Products?mode=read"}>ADMIN PANEL</Link>
      <div className="container1 flex justify-between items-center">
        <SearchInput />
        <HeaderCartSection />
      </div>
    </header>
  );
}
