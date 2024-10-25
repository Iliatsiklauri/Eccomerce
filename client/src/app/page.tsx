import Navbar from "../components/Client/Home/Navbar/Navbar";
import Hero from "../components/Client/Home/Hero/Hero";
import { Suspense } from "react";
import PinnedCategory from "../components/Client/Home/PinnedCategory/PinnedCategory";
import PromotionWrapper from "../components/Client/Home/PromotionWrapper";
import BrowseProductsLine from "../components/Client/Home/BrowseLine/BrowseProductsLine";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col container1 gap-10">
      <Navbar />
      <Suspense>
        <Hero />
        <PromotionWrapper />
        <BrowseProductsLine />
        <PinnedCategory />
      </Suspense>
    </div>
  );
}
