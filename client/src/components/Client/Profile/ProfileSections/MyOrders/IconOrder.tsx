import Image from "next/image";
import React from "react";

export default function IconOrder() {
  return (
    <div className="flex items-center justify-center p-2 rounded-full border-black border-[1px] border-opacity-20 bg-white flex-shrink-0">
      <Image
        src={"/icons/homepage/barcode.png"}
        width={25}
        height={20}
        alt="order"
      />
    </div>
  );
}
