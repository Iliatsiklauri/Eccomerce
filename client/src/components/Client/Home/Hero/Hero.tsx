"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function Hero() {
  const params = useSearchParams();
  const active = params.get("category");
  if (active) return null;
  return (
    <div className="w-full h-[500px] rounded-2xl rounded- flex items-end justify-end relative cursor-pointer group overflow-hidden bg-[#DFD3C3]">
      <div className="h-full relative w-full  flex-shrink-0">
        <Image
          src={"/icons/homepage/pexels-karolina-grabowska-5650040.jpg"}
          fill
          alt="hero"
          className="object-cover absolute"
        />
      </div>
      <div className="bg-black absolute h-full w-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 ease-in-out"></div>
      <div
        className="w-[180px] h-[60px] bg-white rounded-2xl flex items-center justify-center gap-3 left-5
        cursor-pointer absolute opacity-0 bottom-[-20px] group-hover:bottom-5 group-hover:opacity-100 transition-all duration-300 ease-in-out "
      >
        <p className=" text-xl text-darkBrown">Find More</p>
        <Image
          src={"/icons/homepage/right-arrow.png"}
          alt="arrow"
          width={30}
          height={30}
        />
      </div>
    </div>
  );
}
