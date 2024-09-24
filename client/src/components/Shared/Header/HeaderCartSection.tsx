import Image from "next/image";
import React from "react";

export default function HeaderCartSection() {
  return (
    <div className="flex gap-3 items-center justify-center">
      <button className="btn btn-ghost" id="cart">
        <div className="w-[20px] h-[20px] relative">
          <Image alt="user" src={"/icons/header/trolley.png"} fill />
        </div>
        <p className="text-white font-normal text-[16px]">Cart</p>
      </button>

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
            <a className="justify-between">Profile</a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a href="/auth">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
