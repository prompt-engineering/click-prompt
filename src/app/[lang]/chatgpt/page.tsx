import React from "react";
import { ChatGPTApp } from "@/components/ChatGPTApp";

export default async function ChatGPTPage() {
  return (
    <div className='bg-[#343541] flex h-[85vh] overflow-y-auto rounded-md items-center justify-center'>
      <ChatGPTApp />
    </div>
  );
}
