"use client";

import React, { useEffect } from "react";
import { LoginPage } from "@/app/[lang]/chatgpt/LoginPage";
import { ChatRoom } from "@/app/[lang]/chatgpt/ChatRoom";

type ChatGptAppProp = {
  message?: string;
};

export function ChatGPTApp(props: ChatGptAppProp) {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);
  const [openAiKey, setOpenAiKey] = React.useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/chatgpt/verify");
        const data = await response.json();
        setIsLoggedIn(data.loggedIn);
      } catch {
        setIsLoggedIn(false);
      }
    })();
  }, []);

  return isLoggedIn ? (
    <ChatRoom initMessage={props.message} setIsLoggedIn={setIsLoggedIn} />
  ) : (
    <LoginPage openAiKey={openAiKey} setOpenAiKey={setOpenAiKey} setIsLoggedIn={setIsLoggedIn} />
  );
}
