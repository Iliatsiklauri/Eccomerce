"use client";
import { useEffect, useState } from "react";
import HeaderCartSection from "./HeaderCartSection";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { Product } from "@/src/types/Product";
import { fetchSearchedProducts } from "@/src/api/ProductsApi";
import { getUserCart } from "@/src/api/CartItemsApi";
import { useDispatch } from "react-redux";
import { setCart } from "@/src/store/features/cartSlice";

export default function Header() {
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<null | Product[]>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const debounceSearching = setTimeout(async () => {
      if (query) {
        setLoading(true);
        const res = await fetchSearchedProducts(query);
        setProducts(res);
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(debounceSearching);
  }, [query]);

  useEffect(() => {
    const getCart = async () => {
      const usersCart = await getUserCart();
      dispatch(setCart(usersCart));
      console.log(usersCart);
    };
    getCart();
  }, [dispatch]);

  return (
    <header className="w-full h-[80px] bg-darkBrown flex items-center justify-center z-20 shadow-lg ">
      <Link
        className="text-white text-2xl  2xl:text-3xl 2xl:left-[5%] left-[3%] absolute font-semibold cursor-pointer"
        href={"/"}
      >
        Eccomerce
      </Link>
      <div className="container1 flex justify-between items-center">
        <div>
          <SearchInput
            focused={focused}
            loading={loading}
            products={products}
            setFocused={setFocused}
            setQuery={setQuery}
            query={query}
          />
        </div>
        <HeaderCartSection />
      </div>
    </header>
  );
}
