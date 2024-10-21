import Navbar from "../components/Client/Home/Navbar/Navbar";
import Hero from "../components/Client/Home/Hero/Hero";
import { Suspense } from "react";
import PinnedCategory from "../components/Client/Home/PinnedCategory/PinnedCategory";
import PromotionWrapper from "../components/Client/Home/PromotionWrapper";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col container1 gap-10">
      <Navbar />
      <Suspense>
        <Hero />
        <PromotionWrapper />
        <div className="w-full h-[50px] bg-slate-500 rounded-md"></div>
        <PinnedCategory />
      </Suspense>
    </div>
  );
}
