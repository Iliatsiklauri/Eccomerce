"use client";
import Image from "next/image";
import React from "react";

type PropType = {
  setChatMode: React.Dispatch<React.SetStateAction<boolean>>;
  chatMode: boolean;
};

export default function ChatIcon({ setChatMode, chatMode }: PropType) {
  return (
    <div
      className="w-[50px] h-[50px] bg-slate-300 rounded-full flex items-center justify-center cursor-pointer"
      onClick={() => {
        setChatMode(!chatMode);
      }}
    >
      <Image
        width={25}
        height={25}
        alt="chat"
        src={"/icons/homepage/chat.png"}
      />
    </div>
  );
}
