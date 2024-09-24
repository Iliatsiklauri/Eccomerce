import Image from "next/image";
import React from "react";

export default function ViewMoreButton() {
  return (
    <div className="w-[100px] h-[40px] flex items-center justify-center cursor-pointer">
      <p>View More</p>
      <Image
        src={"/icons/homepage/right-arrow.png"}
        alt="arrow"
        height={30}
        width={30}
      />
    </div>
  );
}
