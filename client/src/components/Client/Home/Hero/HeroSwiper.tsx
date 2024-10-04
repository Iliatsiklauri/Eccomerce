import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Product } from "@/src/types/Product";
import SingleSwiperSlide from "./SingleSwiperSlide";

type PropType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  products: Product[];
};
export default function HeroSwiper({
  loading,
  setLoading,
  products,
}: PropType) {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
        spaceBetween={20}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <SingleSwiperSlide
              loading={loading}
              product={product}
              setLoading={setLoading}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
