"use client";

import React, { useEffect } from "react";
import { ChatRoom } from "@/app/[lang]/chatgpt/ChatRoom";
import { LoginPage } from "@/app/[lang]/chatgpt/LoginPage";

export default async function ChatGPTPage() {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);

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

  return (
    <div className='bg-[#343541] flex h-[85vh] overflow-y-auto rounded-md items-center justify-center'>
      {isLoggedIn ? <ChatRoom setIsLoggedIn={setIsLoggedIn} /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}
