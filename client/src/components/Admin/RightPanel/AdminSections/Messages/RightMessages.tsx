import React, { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import MessageInput from "./MessageInput";
import { Message } from "@/src/types/Message";
import AdminSingleMessage from "./AdminSingleMessage";
import { useSearchParams } from "next/navigation";
import { getUserApi } from "@/src/api/UsersApi";
import { userType } from "@/src/store/features/usersSlice";
import Image from "next/image";

type PropType = {
  user: {
    fullname: string | undefined;
    id: string | undefined;
    role: string | undefined;
  };
  id: string;
  socket: Socket | null;
  recievedMessages: [] | Message[];
};

export default function RightMessages({
  user,
  socket,
  recievedMessages,
  id,
}: PropType) {
  const [userId, setUserId] = useState<null | number>(null);
  const [soctumer, setCostumer] = useState<userType | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const params = useSearchParams();
  const target = params.get("id");

  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      setUserId(Number(id));
    }
    async function fetchUser() {
      if (target) {
        const user = await getUserApi(target);
        setCostumer(user);
      }
    }
    fetchUser();
  }, [id, target]);

  // displaying messages correctly

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [recievedMessages]);

  return (
    <div className="h-full overflow-y-auto flex-shrink-0 w-[73%] flex items-center justify-center gap-3 flex-col 2xl:w-[75%] bg-slate-200 border-2 border-black rounded-xl">
      <div className="h-[60px] w-full bg-white border-b-[1px] flex items-center justify-start text-black text-xl px-[2%] gap-2 font-medium border-b-black">
        <Image
          src={"/icons/homepage/user.png"}
          width={30}
          height={30}
          alt="user"
        />
        <p>{soctumer?.fullname}</p>
      </div>
      <div
        className="w-full h-full rounded-xl overflow-y-auto gap-3 px-1  flex flex-col overflow-x-hidden"
        ref={chatContainerRef}
      >
        {recievedMessages && recievedMessages.length > 0 ? (
          recievedMessages.map((obj, index) => (
            <AdminSingleMessage obj={obj} user={user} key={index} />
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full ">
            <h1 className="text-xl">No messages</h1>
          </div>
        )}
      </div>
      <MessageInput user={user} socket={socket} userId={userId} />
    </div>
  );
}
