"use client";
import { usePathname } from "next/navigation";
import Footer from "../components/Shared/Footer/Footer";
import Header from "../components/Shared/Header/Header";
import { useEffect } from "react";
import { getCategories } from "../api/CategoryApi";
import { useDispatch } from "react-redux";
import { setCategory, setLoading } from "../store/features/categorySlice";

type Props = {
  children: React.ReactNode;
};

export const LayoutWrapper = ({ children }: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getData() {
      dispatch(setLoading(true));
      try {
        const res = await getCategories();
        dispatch(setCategory(res));
      } catch (er) {
        console.log("error fetching categories", er);
      } finally {
        dispatch(setLoading(false));
      }
    }
    getData();
  }, [dispatch]);
  const pathname = usePathname();
  const render = pathname.split("/")[1] !== "admin" && pathname !== "/auth";

  return (
    <div className="flex items-center justify-center flex-col bg-white gap-10 ">
      {render && <Header />}
      <main className={`flex items-center justify-center w-full `}>
        {children}
      </main>
      {render && <Footer />}
    </div>
  );
};
