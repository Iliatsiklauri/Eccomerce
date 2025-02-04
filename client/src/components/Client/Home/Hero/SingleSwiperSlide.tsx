import { Product } from "@/src/types/Product";
import Image from "next/image";
import React from "react";
import DarkBg from "./DarkBg";

type PropType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
};

export default function SingleSwiperSlide({
  product,
  loading,
  setLoading,
}: PropType) {
  return (
    <>
      <Image
        src={product.pinnedImage ? product.pinnedImage : product.image}
        fill
        priority
        alt="hero"
        className={`object-fit absolute transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setLoading(false)}
      />
      <DarkBg product={product} />
    </>
  );
}
