"use client";
import { getUserApi } from "@/src/api/UsersApi";
import { user } from "@/src/types/User";
import React, { useEffect, useState } from "react";
type PropType = {
  params: {
    id: string;
  };
};
export default function Page({ params: { id } }: PropType) {
  const [user, setUser] = useState<null | user>(null);
  useEffect(() => {
    async function getData() {
      const data = await getUserApi(id);
      setUser(data);
    }
    getData();
  }, [id]);
  return (
    <div className="h-[500px] flex items-center justify-center">
      <h1 className="text-black">{user?.email}</h1>
    </div>
  );
}
