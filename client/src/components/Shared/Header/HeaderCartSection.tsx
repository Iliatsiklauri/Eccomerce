import { RootState } from "@/src/store/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import LogInButton from "./LogInButton";
import { getCookie } from "cookies-next";
import { user } from "@/src/types/User";
import { jwtDecode } from "jwt-decode";
import { logIn } from "@/src/store/features/authSlice";

export default function HeaderCartSection() {
  const [user1, setUser] = useState<null | user>(null);
  const { isLoggedIn, role } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const authorization = getCookie("authorization");
    if (authorization) {
      const user: user = jwtDecode(authorization as string);
      setUser(user);
      dispatch(
        logIn({
          email: user.email,
          role: user.role,
          fullname: user.fullname,
          id: user.id,
        })
      );
    }
  }, [dispatch]);

  return (
    <div className="flex gap-3 items-center justify-center">
      {role === "ADMIN" && (
        <Link
          href={"/admin/Products?mode=read"}
          className=" text-white text-sm font-medium flex items-center justify-center gap-2"
        >
          <Image
            alt="adminIcon"
            src={"/icons/adminPanel/administrator-24.ico"}
            width={20}
            height={20}
          />
          <p>ADMIN PANEL</p>
        </Link>
      )}

      <button className="btn btn-ghost" id="cart">
        <div className="w-[20px] h-[20px] relative">
          <Image alt="user" src={"/icons/header/trolley.png"} fill />
        </div>
        <p className="text-white font-normal text-[16px]">Cart</p>
      </button>
      {!isLoggedIn ? <LogInButton /> : user1 && <UserProfile id={user1.id} />}
    </div>
  );
}
