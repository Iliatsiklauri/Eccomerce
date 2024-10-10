"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div
      className="flex items-center justify-center cursor-pointer gap-5"
      onClick={handleBack}
    >
      <Image
        alt="arrow back"
        src={"/icons/homepage/back.png"}
        width={30}
        height={30}
      />
      <p className="text-2xl text-black font-medium">Back</p>
    </div>
  );
}
