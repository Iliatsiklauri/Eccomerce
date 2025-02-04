import Image from "next/image";
import Link from "next/link";
import React from "react";
type PropType = {
  name: string;
  image: string;
  isActive: boolean;
};
export default function LeftPanelSection({ image, name, isActive }: PropType) {
  return (
    <Link
      href={`${
        name === "User management"
          ? "Users"
          : name === "Products"
          ? "Products?mode=read&page=1"
          : name === "Home"
          ? "/"
          : name === "Categories"
          ? "Categories"
          : name === "Home"
          ? "/"
          : name == "Orders"
          ? "Orders?page=1"
          : name
      }`}
      className={` h-[10%] min-h-[50px] ${
        isActive && "bg-slate-200"
      } w-full flex items-center justify-start px-4 cursor-pointer gap-6 rounded-2xl hover:bg-slate-200`}
    >
      <Image
        src={image}
        alt="admin"
        width={27}
        height={27}
        className="h-auto"
      />
      <p>{name}</p>
    </Link>
  );
}
