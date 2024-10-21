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
  const [loading, setLoading] = useState(true);
  const [user1, setUser] = useState<null | user>(null);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
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
    setLoading(false);
  }, [dispatch]);

  return (
    <div className="flex gap-3 items-center justify-center">
      <Link href={"/admin/Products?mode=read"} className="text-md text-white">
        ADMIN PANEL
      </Link>

      <button className="btn btn-ghost" id="cart">
        <div className="w-[20px] h-[20px] relative">
          <Image alt="user" src={"/icons/header/trolley.png"} fill />
        </div>
        <p className="text-white font-normal text-[16px]">Cart</p>
      </button>
      {!isLoggedIn ? (
        loading ? (
          <div className="skeleton bg-white  w-[110px] h-[20px] bg-opacity-20"></div>
        ) : (
          <LogInButton />
        )
      ) : (
        user1 && <UserProfile id={user1.id} />
      )}
    </div>
  );
}
