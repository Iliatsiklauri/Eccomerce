"use client";
import React, { useState } from "react";
import ChatIcon from "./ChatIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import Chat from "./Chat";

export default function ChatWrapper() {
  const [chatMode, setChatMode] = useState(false);
  const { isLoggedIn, role } = useSelector((state: RootState) => state.auth);
  return (
    <div className="fixed right-10 bottom-10 z-10">
      <Chat chatMode={chatMode} setChatMode={setChatMode} />
      {isLoggedIn && role !== "ADMIN" && (
        <ChatIcon chatMode={chatMode} setChatMode={setChatMode} />
      )}
    </div>
  );
}
