import React from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";

type PropType = {
  setChatMode: React.Dispatch<React.SetStateAction<boolean>>;
  chatMode: boolean;
};

export default function Chat({ chatMode, setChatMode }: PropType) {
  return (
    <div
      className={`${
        chatMode
          ? "w-[260px] opacity-100 h-[320px] animate-bounce-effect"
          : "w-[0px] opacity-0 h-0 overflow-hidden "
      } absolute  rounded-xl z-50 transition-all duration-200 ease-in-out shadow-lg bottom-[70px] right-0 flex items-center justify-center flex-col `}
    >
      <ChatHeader setChatMode={setChatMode} />
      <ChatBody />
    </div>
  );
}
