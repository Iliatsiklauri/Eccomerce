import Navbar from "../components/Client/Home/Navbar/Navbar";
import Hero from "../components/Client/Home/Hero/Hero";
import { Suspense } from "react";
import PinnedCategory from "../components/Client/Home/PinnedCategory/PinnedCategory";
import PromotionWrapper from "../components/Client/Home/PromotionWrapper";
import BrowseProductsLine from "../components/Client/Home/BrowseLine/BrowseProductsLine";
import ChatWrapper from "../components/Shared/Chat/ChatWrapper";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col container1 gap-10">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Navbar />
      <Suspense>
        <Hero />
        <PromotionWrapper />
        <BrowseProductsLine />
        <PinnedCategory />
      </Suspense>
      <ChatWrapper />
    </div>
  );
}
