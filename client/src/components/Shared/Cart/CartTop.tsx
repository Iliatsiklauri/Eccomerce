import Image from "next/image";
import React from "react";
type PropType = {
  setCartMode: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function CartTop({ setCartMode }: PropType) {
  return (
    <div className="w-full p-4 flex items-center justify-between ">
      <h2 className="text-xl text-black font-normal">My cart</h2>

      <div
        onClick={() => setCartMode(false)}
        className="bg-gray-200 p-2 rounded-full cursor-pointer"
      >
        <Image
          src={"/icons/header/close.png"}
          width={10}
          alt="close"
          height={10}
        />
      </div>
    </div>
  );
}
