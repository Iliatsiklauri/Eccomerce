import React from "react";
import { Message } from "@/src/types/Message";

type PropType = {
  obj: Message;
  user: {
    fullname: string | undefined;
    id: string | undefined;
    role: string | undefined;
  };
};

export default function AdminSingleMessage({ obj }: PropType) {
  return (
    <div
      className={`${
        obj.senderId === null
          ? "self-end bg-blue-500"
          : "self-start bg-gray-500"
      } p-1 rounded-xl px-1 relative`}
    >
      <p className="p-0.5 px-1 rounded-xl text-white break-words ">
        {obj.content}
      </p>
    </div>
  );
}
