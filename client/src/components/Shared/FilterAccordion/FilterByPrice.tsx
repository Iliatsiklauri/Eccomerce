import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function FilterByPrice() {
  const [minPrice, setMinPrice] = useState<undefined | string>(undefined);
  const [maxPrice, setMaxPrice] = useState<undefined | string>(undefined);
  const params = useSearchParams();
  const minPrice1 = params.get("minPrice");
  const maxPrice1 = params.get("maxPrice");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentParams = new URLSearchParams(params.toString());
    if (minPrice !== undefined) {
      currentParams.set("minPrice", minPrice);
    }
    if (maxPrice !== undefined) {
      currentParams.set("maxPrice", maxPrice);
    }
    router.push(`/products?${currentParams.toString()}`);
  };

  return (
    <form
      className="w-full flex items-center justify-between"
      onSubmit={handleSubmit}
    >
      <input
        type="number"
        placeholder={`${minPrice1 ? minPrice1 : "Min:"}`}
        className={`${
          minPrice1 !== null && "placeholder:text-black"
        } w-[70px] h-[35px] border-[1px] rounded-lg border-green-700 bg-white focus:placeholder-transparent placeholder:text-sm pl-2 text-sm text-black`}
        onChange={(e) => {
          setMinPrice(e.target.value ? e.target.value : undefined);
        }}
      />
      <input
        type="number"
        placeholder={`${maxPrice1 ? maxPrice1 : "Max:"}`}
        className={`w-[70px] h-[35px] border-[1px] rounded-lg focus:placeholder-transparent  border-green-700  bg-white placeholder:text-sm pl-2 text-sm text-black ${
          maxPrice1 !== null && "placeholder:text-black"
        } `}
        onChange={(e) => {
          setMaxPrice(e.target.value ? e.target.value : undefined);
        }}
      />
      <button
        className="btn btn-success btn-sm text-white h-[35px] text-xs font-medium w-[50px]"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
