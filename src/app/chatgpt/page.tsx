import React from "react";
import { ChatGPTApp } from "@/components/ChatGPTApp";

function ChatGPTPage() {
  return (
    <div className='bg-[#343541] flex h-[85vh] overflow-y-auto'>
      {/* @ts-expect-error Async Server Component */}
      <ChatGPTApp />
    </div>
  );
}

export default ChatGPTPage;
