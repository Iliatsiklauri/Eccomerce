"use client";
import React, { useEffect } from "react";
import LeftPanelSection from "./LeftPanelSection";
import LeftHeader from "./LeftHeader";
import LogOutPanel from "./LogOutPanel";
import { panelData } from "@/src/utils/data";
import { getCookie } from "cookies-next";
import { user } from "@/src/types/User";
import { jwtDecode } from "jwt-decode";
import { logIn } from "@/src/store/features/authSlice";
import { useDispatch } from "react-redux";
import { getUsersApi } from "@/src/api/UsersApi";
import { setUsers } from "@/src/store/features/usersSlice";

export default function LeftPanel({
  currentSection,
}: {
  currentSection: string;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const authorization = getCookie("authorization");

    if (authorization) {
      const user: user = jwtDecode(authorization as string);
      dispatch(
        logIn({
          email: user.email,
          role: user.role,
          fullname: user.fullname,
          id: user.id,
        })
      );
    }
    const getUsersArray = async () => {
      try {
        const token = getCookie("authorization");
        if (token) {
          const users = await getUsersApi(token as string);
          dispatch(setUsers(users));
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    getUsersArray();
  }, [dispatch]);

  return (
    <aside className="w-[350px] h-full bg-white flex flex-col items-start justify-start pt-10 pb-3 rounded-xl gap-[3%] flex-shrink-0 shadow-md shadow-stone-500">
      <LeftHeader />
      <div className="w-[85%] h-[1px] bg-darkBrown self-center bg-opacity-20 mt-2"></div>
      <div className="h-full flex items-center justify-start flex-col w-full px-4 gap-[2%]">
        {panelData.map((el, key) => (
          <LeftPanelSection
            image={el.imageUrl}
            name={el.name}
            key={key}
            isActive={
              currentSection ===
              (el.name === "User management" ? "Users" : el.name)
            }
          />
        ))}
      </div>
      <LogOutPanel />
    </aside>
  );
}
