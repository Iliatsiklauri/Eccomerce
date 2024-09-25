"use client";
import { usePathname } from "next/navigation";
import Footer from "../components/Shared/Footer/Footer";
import Header from "../components/Shared/Header/Header";

type Props = {
  children: React.ReactNode;
};

export const LayoutWrapper = ({ children }: Props) => {
  const pathname = usePathname();
  const render = pathname.split("/")[1] !== "admin" && pathname !== "/auth";

  return (
    <div className="flex items-center justify-center flex-col bg-[#E1E4E8] gap-10">
      {render && <Header />}
      <main className={` flex items-center justify-center w-full`}>
        {children}
      </main>
      {render && <Footer />}
    </div>
  );
};
