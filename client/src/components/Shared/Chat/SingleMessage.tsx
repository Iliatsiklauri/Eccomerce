import React from "react";
import { Message } from "@/src/types/Message";

type PropType = {
  obj: Message;
  fullname: string | undefined;
};

export default function SingleMessage({ obj }: PropType) {
  return (
    <div
      className={`${
        obj.senderId !== null
          ? "self-end bg-blue-500"
          : "self-start bg-gray-500"
      } p-1 rounded-xl max-w-[70%] relative`}
    >
      <p className="p-0.5 px-1 rounded-xl text-white break-words ">
        {obj.content}
      </p>
    </div>
  );
}
