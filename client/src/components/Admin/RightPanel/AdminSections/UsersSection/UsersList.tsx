"use client";
import { setUsers, userType } from "@/src/store/features/usersSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleUserSection from "./SingleUserSection";
import { getCookie } from "cookies-next";
import { getUsersApi } from "@/src/api/UsersApi";
import { RootState } from "@/src/store/store";

export default function UsersList() {
  const [userInfo, setUserInfo] = useState<null | number>(null);
  const state = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
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
  const isLoading = state.users === undefined;
  if (isLoading) return <div className="spinner"></div>;

  return (
    <main className="w-full flex flex-col items-center justify-center gap-2 ">
      {state.users ? (
        state.users?.map((el: userType, key: number) => (
          <div
            className="w-full flex flex-col items-center justify-center gap-2"
            key={key}
          >
            <SingleUserSection
              el={el}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              key={key}
            />
          </div>
        ))
      ) : (
        <div>no one</div>
      )}
    </main>
  );
}
