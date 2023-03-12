"use client";

import { ChatRoom } from "@/app/[lang]/chatgpt/ChatRoom";
import { LoginPage } from "@/app/[lang]/chatgpt/LoginPage";
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
