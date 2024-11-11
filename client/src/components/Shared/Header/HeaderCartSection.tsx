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
import Cart from "../Cart/Cart";
import { setCart } from "@/src/store/features/cartSlice";
import { getUserCart } from "@/src/api/CartItemsApi";

export default function HeaderCartSection() {
  const [user1, setUser] = useState<null | user>(null);
  const [cartMode, setCartMode] = useState(false);
  const { isLoggedIn, role } = useSelector((state: RootState) => state.auth);

  const { cart } = useSelector((state: RootState) => state.cart);
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
      const getCart = async () => {
        const usersCart = await getUserCart();
        dispatch(setCart(usersCart));
      };
      getCart();
    }
  }, [dispatch]);

  return (
    <div className="flex gap-3 items-center justify-center ">
      {role === "ADMIN" && (
        <Link
          href={"/admin/Products?mode=read"}
          className=" text-white text-sm font-medium flex items-center justify-center gap-2 z-30"
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
      {isLoggedIn && (
        <button
          className="btn btn-ghost z-30 "
          id="cart"
          onClick={() => {
            setCartMode(!cartMode);
          }}
        >
          <div className="relative">
            {cart.length > 0 && (
              <div className="bg-red-700 w-[14px] h-[14px] text-white absolute text-[10px] text-center rounded-full top-[-6px] right-3 flex items-center justify-center">
                {cart.length}
              </div>
            )}
            <Image
              alt="cart"
              src={"/icons/header/trolley.png"}
              width={20}
              height={20}
            />
          </div>
          <p className="text-white font-normal text-[16px]">Cart</p>
        </button>
      )}
      {cartMode && <Cart setCartMode={setCartMode} cartMode={cartMode} />}

      {!isLoggedIn ? (
        <LogInButton />
      ) : (
        user1 && (
          <div
            onClick={() => {
              if (cartMode) setCartMode(false);
            }}
          >
            <UserProfile id={user1.id} />
          </div>
        )
      )}
    </div>
  );
}
