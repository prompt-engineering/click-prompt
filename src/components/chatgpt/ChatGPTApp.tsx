"use client";

import { ChatRoom } from "@/components/chatgpt/ChatRoom";
import { LoginPage } from "@/components/chatgpt/LoginPage";
import React, { useEffect, useState } from "react";

type ChatGPTAppProps = {
  loggedIn?: boolean;
  updateLoginStatus?: (loggedIn: boolean) => void;
  initMessage?: string;
};
export const ChatGPTApp = ({ loggedIn, initMessage, updateLoginStatus }: ChatGPTAppProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn ?? false);

  useEffect(() => {
    if (updateLoginStatus) {
      updateLoginStatus(isLoggedIn);
    }
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <ChatRoom setIsLoggedIn={setIsLoggedIn} initMessage={initMessage} />
  ) : (
    <LoginPage setIsLoggedIn={setIsLoggedIn} />
  );
};
