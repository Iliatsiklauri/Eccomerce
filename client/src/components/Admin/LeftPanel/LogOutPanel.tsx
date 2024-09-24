import Image from "next/image";
import React from "react";

export default function LogOutPanel() {
  return (
    <div className="w-full px-4 h-[15%]">
      <a
        className="hover:bg-slate-200 cursor-pointer flex items-center justify-start gap-4 w-full px-4 rounded-xl h-full"
        href="/auth"
      >
        <Image
          src={"/icons/adminPanel/logout.png"}
          alt="admin"
          width={30}
          height={30}
        />
        <p>Log out</p>
      </a>
    </div>
  );
}
