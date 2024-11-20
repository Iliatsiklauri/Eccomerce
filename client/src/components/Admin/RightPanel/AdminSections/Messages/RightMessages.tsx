import React, { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import MessageInput from "./MessageInput";
import { Message } from "@/src/types/Message";
import AdminSingleMessage from "./AdminSingleMessage";

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
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (socket) {
      socket.emit("fetchPrevMessages", id);
    }
  }, [id, socket]);

  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      setUserId(Number(id));
    }
  }, [id]);

  // displaying correctly

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [recievedMessages]);

  return (
    <div className="h-full overflow-y-auto flex-shrink-0 w-[73%] flex items-center justify-center gap-3 flex-col 2xl:w-[75%] border-2 border-black rounded-xl p-1">
      <div
        className="w-full h-full border-2 border-black rounded-xl overflow-y-auto gap-3 p-1 flex flex-col"
        ref={chatContainerRef}
      >
        {recievedMessages && recievedMessages.length > 0 ? (
          recievedMessages.map((obj, index) => (
            <AdminSingleMessage obj={obj} user={user} key={index} />
          ))
        ) : (
          <h1>no messages</h1>
        )}
      </div>
      <MessageInput user={user} socket={socket} userId={userId} />
    </div>
  );
}
