import Image from "next/image";
import React, { useState } from "react";
import { Socket } from "socket.io-client";

type PropType = {
  user: {
    fullname: string | undefined;
    id: string | undefined;
    role: string | undefined;
  };
  socket: Socket | null;
  userId: number | null;
};

export default function MessageInput({ socket, userId }: PropType) {
  const [message, setMessage] = useState<string>("");

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket?.emit("sendMessage", {
      senderId: null,
      recieverId: userId,
      content: message,
    });
    setMessage("");
  };
  return (
    <form
      className="overflow-y-auto flex-shrink-0 border-2 border-black  rounded-xl w-full h-[60px] flex items-center justify-between bg-blue-100 px-2"
      onSubmit={sendMessage}
    >
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-[95%] h-full flex-shrink-0 border-t-black border-t-[1px] rounded-b-lg focus:outline-none px-2 bg-blue-100  text-sm text-black placeholder:text-black border-opacity-20 placeholder:text-opacity-65"
      />
      <button
        className="w-[5%] rounded-xl h-[40px] flex-shrink-0 flex items-center justify-center rounded-mg bg-blue-200 cursor-pointer"
        type="submit"
      >
        <Image
          src={"/icons/adminPanel/paper-plane.png"}
          width={20}
          height={20}
          alt="send"
        />
      </button>
    </form>
  );
}
