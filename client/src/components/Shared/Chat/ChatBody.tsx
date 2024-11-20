import React, { useEffect, useRef, useState } from "react";
import TrianlgeChat from "./TrianlgeChat";
import io, { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import SingleMessage from "./SingleMessage";
import { Message } from "@/src/types/Message";
import { getAllmessages } from "@/src/api/MessagesApi";

export default function ChatBody() {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { fullname, id, role } = useSelector((state: RootState) => state.auth);
  const user = { fullname, id, role };

  const [message, setMessage] = useState<string>("");
  const [recievedMessages, setRecievedMessages] = useState<[] | Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  // handling connection

  useEffect(() => {
    if (user.id) {
      const socketIo = io("ws://localhost:4000", {
        query: { userId: user.id, isAdmin: false },
      });

      setSocket(socketIo);

      const getAll = async () => {
        const messages = await getAllmessages(Number(user.id));
        setRecievedMessages(messages);
      };

      getAll();

      return () => {
        socketIo.disconnect();
      };
    }
  }, [user.id]);

  // recieving message

  useEffect(() => {
    socket?.on("recieveMessage", (data) => {
      setRecievedMessages((recievedMessages) => [...recievedMessages, data]);
    });

    return () => {
      socket?.off("recieveMessage");
    };
  }, [socket]);

  // displaying messages correctly

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [recievedMessages]);

  // sending a message

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket?.emit("sendMessage", {
      senderId: user.id,
      recieverId: null,
      content: message,
    });
    setMessage("");
  };

  return (
    <form
      className="w-full h-[86%] relative rounded-b-xl bg-slate-100 flex items-center justify-end flex-col"
      onSubmit={sendMessage}
    >
      <TrianlgeChat />
      <div
        className="w-full h-full p-1 flex flex-col text-xs overflow-y-auto gap-3"
        ref={chatContainerRef}
      >
        {recievedMessages.map((obj, index) => (
          <SingleMessage obj={obj} fullname={fullname} key={index} />
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full h-[40px] bg-white flex-shrink-0 border-t-black border-t-[1px] rounded-b-lg focus:outline-none px-2 text-sm text-black placeholder:text-black border-opacity-20 placeholder:text-opacity-65"
      />
    </form>
  );
}
