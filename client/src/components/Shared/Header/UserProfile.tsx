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
        <div className="w-[20px] h-[20px] relative ">
          <Image alt="user" src={"/icons/header/profile-user.png"} fill />
        </div>
        <p className="text-white font-normal text-[16px]">Account</p>
      </button>
      <ul
        tabIndex={0}
        className="menu menu-md dropdown-content bg-darkBrown rounded-box z-[1] mt-5 w-52 p-2 shadow"
      >
        <li>
          <Link href={`/profile/${id}`}>Settings</Link>
        </li>
        <li>
          <a href="/auth">Logout</a>
        </li>
      </ul>
    </div>
  );
}
