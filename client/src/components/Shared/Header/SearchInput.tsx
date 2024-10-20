import { Product } from "@/src/types/Product";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
type PropType = {
  setQuery: Dispatch<SetStateAction<string>>;
  query: string;
  loading: boolean;
  // setProducts: Dispatch<SetStateAction<Product[] | null>>;
  products: Product[] | null;
  setFocused: Dispatch<SetStateAction<boolean>>;
  focused: boolean;
};
export default function SearchInput({
  setFocused,
  products,
  setQuery,
  query,
  loading,
  focused,
}: PropType) {
  return (
    <div>
      {focused && (
        <div className="fixed w-full h-full bottom-0 top-0 z-20 left-0">
          <div
            className="w-full h-full bg-opacity-25 bg-black z-20 absolute top-0"
            onClick={() => setFocused(false)}
          ></div>
        </div>
      )}
      <label
        className={`w-[600px] rounded-lg bg-[#E1E4E8] flex h-[50px] items-center justify-center px-4 relative z-30`}
        tabIndex={2}
        onClick={() => {
          setFocused(!focused);
        }}
      >
        <div className="w-[19px] h-[19px] relative">
          <Image
            alt="user"
            src={"/icons/header/search-interface-symbol.png"}
            fill
          />
        </div>
        <input
          type="text"
          className="w-full rounded-[20px] text-lg bg-transparent pl-4 pt-1 focus:outline-none flex text-black "
          placeholder="Search..."
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        {focused && (
          <div className="absolute w-full text-black bg-white top-[70px] min-h-[100px] rounded-lg flex items-center justify-center flex-col p-3 gap-2">
            {query === "" ? (
              <div className="flex items-center justify-center gap-4">
                <h1 className="text-xl ">Search for products</h1>
                <Image
                  src={"/icons/header/search.png"}
                  width={34}
                  height={34}
                  alt="Not found"
                />
              </div>
            ) : loading ? (
              <div className="spinner"></div>
            ) : products?.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="flex items-center justify-center gap-4">
                  <h1 className="text-xl">No products can be found</h1>
                  <Image
                    src={"/icons/header/no-results.png"}
                    width={34}
                    height={34}
                    alt="Not found"
                  />
                </div>
                <p className="text-xs opacity-40">
                  make sure that you have typed correctly.
                </p>
              </div>
            ) : (
              products?.map((el: Product, key) => (
                <div
                  key={el.id}
                  className={` w-full flex items-center justify-center flex-col gap-2`}
                >
                  <Link
                    href={`/products/${el.id}`}
                    className="w-full hover:bg-black hover:bg-opacity-15 cursor-pointer p-1 rounded-md"
                  >
                    <p className="text-lg">{el.title}</p>
                    <p className="text-xs opacity-60">
                      {el.description.slice(0, 50)}
                    </p>
                  </Link>
                  {products.length !== key + 1 && (
                    <div className="w-full h-[1px] bg-black bg-opacity-20"></div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </label>
    </div>
  );
}
