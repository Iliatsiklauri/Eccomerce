import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

type PropType = {
  id: string;
};

const data = [
  {
    link: "orders",
    title: "My orders",
    image: "/icons/adminPanel/clipboard.png",
  },
  {
    link: "delivery",
    title: "Delivery address",
    image: "/icons/homepage/location.png",
  },
  {
    link: "settings",
    title: "Profile settings",
    image: "/icons/adminPanel/setting.png",
  },
  {
    link: "/auth",
    title: "Log out",
    image: "/icons/adminPanel/logout.png",
  },
];

export default function ChooseSection({ id }: PropType) {
  const params = useSearchParams();
  const section = params.get("section");
  return (
    <div className="flex items-start justify-start flex-col h-1/2 w-[18%] flex-shrink-0 gap-1.5">
      {data.map((data, index) => (
        <Link
          key={index}
          className="h-1/5 w-full flex items-center justify-center flex-col"
          href={`${
            data.link === "/auth"
              ? "/auth"
              : `/profile/${id}?section=${data.link}`
          }`}
        >
          <div
            className={`w-full h-full flex items-center text-black justify-start gap-5 px-4 ${
              section === data.link && "bg-black bg-opacity-10"
            } hover:bg-black hover:bg-opacity-10 transition-all duration-200  ease-in-out cursor-pointer rounded-md `}
          >
            <Image src={data.image} alt="profileIcons" width={20} height={20} />
            <p>{data.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
