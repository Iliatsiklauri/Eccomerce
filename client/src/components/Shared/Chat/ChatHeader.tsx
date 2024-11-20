import Image from "next/image";
import React from "react";

type PropType = {
  setChatMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ChatHeader({ setChatMode }: PropType) {
  return (
    <div className="w-full h-[14%] bg-darkBrown bg-opacity-90 z-20 border-black border-[1px] rounded-t-lg border-opacity-20 text-white p-2 flex items-center justify-between gap-2">
      <section className="flex items-center justify-center gap-3">
        <Image
          src={"/icons/adminPanel/administrator-24.ico"}
          width={20}
          height={20}
          alt="admin"
        />
        <p>Support</p>
      </section>
      <Image
        src={"/icons/homepage/icons8-close-50.png"}
        width={22}
        height={20}
        alt="admin"
        className="cursor-pointer"
        onClick={() => setChatMode(false)}
      />
    </div>
  );
}
