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
      className="overflow-y-auto flex-shrink-0 border-2 border-black rounded-xl w-full h-[60px]"
      onSubmit={sendMessage}
    >
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
