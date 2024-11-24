"use client";
import { userType } from "@/src/store/features/usersSlice";
import React from "react";
import { useSelector } from "react-redux";
import SingleUserSection from "./SingleUserSection";
import { RootState } from "@/src/store/store";

export default function UsersList() {
  const state = useSelector((state: RootState) => state.user);

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
            <SingleUserSection el={el} key={key} />
          </div>
        ))
      ) : (
        <div>no one</div>
      )}
    </main>
  );
}
