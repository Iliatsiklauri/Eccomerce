import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LogInButton() {
  return (
    <>
      <Link className="btn btn-ghost" href={"/auth?mode=login"}>
        <Image
          alt="user"
          src={"/icons/header/profile-user.png"}
          width={20}
          height={20}
          className="mr-2"
        />

        <p className="text-white font-normal text-[16px]">Sign in</p>
      </Link>
    </>
  );
}
