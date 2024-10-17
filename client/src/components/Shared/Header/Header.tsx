'use client';
import HeaderCartSection from './HeaderCartSection';
import SearchInput from './SearchInput';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full h-[80px] bg-darkBrown flex items-center justify-center z-50 shadow-sm relative">
      <Link
        className="text-white text-2xl  2xl:text-3xl 2xl:left-[5%] left-[3%] absolute font-semibold cursor-pointer"
        href={'/'}
      >
        Eccomerce
      </Link>
      <div className="container1 flex justify-between items-center">
        <SearchInput />
        <HeaderCartSection />
      </div>
    </header>
  );
}
