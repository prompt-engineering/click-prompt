"use client";

import React from "react";
import { ChatGPTApp } from "@/components/ChatGPTApp";

export default function ChatGPTPage() {
  return (
    <div className='bg-[#343541] flex h-[85vh] overflow-y-auto'>
      <ChatGPTApp />
    </div>
  );
}
