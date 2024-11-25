"use client";
import React, { useEffect, useState } from "react";
import LeftUsers from "./LeftUsers";
import RightMessages from "./RightMessages";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { Message } from "@/src/types/Message";
import { getAllmessages } from "@/src/api/MessagesApi";
import { useSearchParams } from "next/navigation";

export default function MessagesSection() {
  const { fullname, id, role } = useSelector((state: RootState) => state.auth);
  const user = { fullname, id, role };

  const params = useSearchParams();
  const targetID = params.get("id") ?? "";

  const [recievedMessages, setRecievedMessages] = useState<[] | Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  // handling connection

  useEffect(() => {
    const socketIo = io("ws://16.170.223.145:4000", {
      query: { userId: user.id, isAdmin: true },
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [user.id]);

  /// set data

  useEffect(() => {
    const getAll = async () => {
      const messages = await getAllmessages(Number(targetID));
      setRecievedMessages(messages);
    };

    getAll();
  }, [targetID]);

  // recieving message

  useEffect(() => {
    socket?.on("recieveMessage", (data) => {
      if (
        (targetID == data.senderId && data.recieverId === null) ||
        (targetID == data.recieverId && data.senderId === null)
      ) {
        setRecievedMessages((recieved) => [...recieved, data]);
      }
    });

    return () => {
      socket?.off("recieveMessage");
    };
  }, [socket, recievedMessages, targetID]);

  return (
    <div className="w-full h-full bg-white rounded-xl shadow-md shadow-stone-500 flex items-center justify-between p-1">
      <LeftUsers />
      <div className="w-[1px] h-[90%] bg-black opacity-15"></div>
      <RightMessages
        id={targetID}
        user={user}
        socket={socket}
        recievedMessages={recievedMessages}
      />
    </div>
  );
}
