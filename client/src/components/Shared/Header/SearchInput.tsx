import Image from "next/image";

export default function SearchInput() {
  return (
    <label
      className={`w-[600px] rounded-lg bg-[#E1E4E8] flex h-[50px] items-center justify-center px-4 relative z-30`}
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
        className="w-full rounded-[20px] text-lg bg-transparent pl-4 pt-1 focus:outline-none flex text-black"
        placeholder="Search..."
      />
    </label>
  );
}
