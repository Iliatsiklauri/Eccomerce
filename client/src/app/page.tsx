import Navbar from "../components/Client/Home/Navbar/Navbar";
import Hero from "../components/Client/Home/Hero/Hero";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col container1 gap-10 min-h-sreen">
      <Navbar />
      <Suspense>
        <Hero />
      </Suspense>
    </div>
  );
}
