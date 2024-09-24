import React from "react";

export default function AuthButton({ title }: { title: string }) {
  return (
    <button className="w-full h-12 bg-black rounded-xl flex items-center justify-center text-white cursor-pointer hover:bg-opacity-70 transition-all duration-200 ease-in-out">
      {title}
    </button>
  );
}
