import Image from "next/image";
import Link from "next/link";
import React from "react";

type PropType = {
  id: string;
};

export default function UserProfile({ id }: PropType) {
  return (
    <div className="dropdown dropdown-end">
      <button className="btn btn-ghost" role="button" tabIndex={0}>
        <Image
          alt="user"
          src={"/icons/header/profile-user.png"}
          width={20}
          height={20}
        />

        <p className="text-white font-normal text-[16px]">Account</p>
      </button>
      <div
        tabIndex={0}
        className="menu menu-md dropdown-content bg-darkBrown rounded-box z-[1] mt-5 w-52 p-2 shadow text-white text-lg"
      >
        <li>
          <Link href={`/profile/${id}?section=orders`}>My orders</Link>
        </li>
        <li>
          <Link href={`/profile/${id}?section=delivery`}>My Addresses</Link>
        </li>
        <li>
          <Link href={`/profile/${id}?section=settings`}>Settings</Link>
        </li>
        <li>
          <a href="/auth">Logout</a>
        </li>
      </div>
    </div>
  );
}
