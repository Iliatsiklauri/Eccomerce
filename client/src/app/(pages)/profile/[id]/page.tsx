"use client";
import { getUserApi } from "@/src/api/UsersApi";
import ChooseSection from "@/src/components/Client/Profile/ChooseSection";
import ContentDispay from "@/src/components/Client/Profile/ContentDispay";
import { user } from "@/src/types/User";
import React, { useEffect, useState } from "react";
type PropType = {
  params: {
    id: string;
  };
};
export default function Page({ params: { id } }: PropType) {
  const [user, setUser] = useState<null | user>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function getData() {
      const data = await getUserApi(id);
      setUser(data);
    }
    getData();
  }, [id, submitted]);
  return (
    <div className="flex items-start justify-between w-full h-[500px] container1">
      <ChooseSection id={id} />
      <div className="h-full bg-black w-[1px] opacity-10 ml-3"></div>
      <ContentDispay user={user} setSubmitted={setSubmitted} />
    </div>
  );
}
