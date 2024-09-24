import Image from "next/image";
import React from "react";

export default function LeftHeader() {
  return (
    <header className="flex w-full items-end justify-start px-8 gap-4">
      <Image
        src={"/icons/adminPanel/manager.png"}
        alt="admin"
        width={50}
        height={50}
      />
      <h1 className="text-2xl font-sans font-medium">Admin</h1>
    </header>
  );
}
