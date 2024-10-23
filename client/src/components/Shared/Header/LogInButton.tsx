import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LogInButton() {
  return (
    <>
      <Link className="btn btn-ghost" href={"/auth?mode=login"}>
        <div className="w-[20px] h-[20px] relative mr-2">
          <Image alt="user" src={"/icons/header/profile-user.png"} fill />
        </div>
        <p className="text-white font-normal text-[16px]">Sign in</p>
      </Link>
    </>
  );
}
