"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import HeroSwiper from "./HeroSwiper";
import { Product } from "@/src/types/Product";
import { fetchProducts } from "@/src/api/ProductsApi";

export default function Hero() {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<Product[] | []>([]);
  useEffect(() => {
    async function getPinnedImages() {
      const res = await fetchProducts({ pinned: true });
      const pinnedOnly = await res.products.filter(
        (product: Product) => product.pinned
      );
      setImages(pinnedOnly);
    }
    getPinnedImages();
  }, []);
  const params = useSearchParams();
  const active = params.get("category");
  if (active) return null;

  return (
    <div className="w-full h-[550px] rounded-2xl flex items-end justify-end shadow-lg relative cursor-pointer group overflow-hidden ">
      <div className="h-full relative w-full flex-shrink-0">
        {loading && (
          <div className="absolute inset-0 skeleton bg-black opacity-15"></div>
        )}
        <HeroSwiper
          loading={loading}
          setLoading={setLoading}
          products={images}
        />
      </div>
    </div>
  );
}
