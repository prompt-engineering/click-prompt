import React from "react";
import { ChatRoom } from "@/app/[lang]/chatgpt/ChatRoom";
import { LoginPage } from "@/app/[lang]/chatgpt/LoginPage";

export default async function ChatGPTPage() {
  const response = await fetch(`http://localhost:3000/api/chatgpt/verify`);
  const data = await response.json();

  return (
    <div className='bg-[#343541] flex h-[85vh] overflow-y-auto rounded-md items-center justify-center'>
      {data.isLoggedIn ? <ChatRoom /> : <LoginPage />}
    </div>
  );
}
