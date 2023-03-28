import "server-only";

import React from "react";
import { cookies } from "next/headers";
import { SITE_USER_COOKIE } from "@/configs/constants";
import { ChatGPTApp } from "@/components/ClickPromptButton";
import { isLoggedIn, login, logout } from "@/api/user";
import {
  changeConversationName,
  createConversation,
  deleteAllConversations,
  deleteConversation,
} from "@/api/conversation";
import { getChatsByConversationId, sendMsgWithStreamRes } from "@/api/chat";

const llmServiceApi: any = {
  login,
  logout,
  isLoggedIn,
  changeConversationName,
  createConversation,
  getChatsByConversationId,
  deleteConversation,
  deleteAllConversations,
  sendMsgWithStreamRes,
};

export default async function ChatGPTPage() {
  const hashedKey = cookies().get(SITE_USER_COOKIE)?.value as string;

  let isLoggedin = false;
  try {
    isLoggedin = await isLoggedIn(hashedKey);
  } catch (e) {
    console.error(e);
    isLoggedin = false;
  }

  return (
    <div className='bg-[#343541] flex h-[85vh] overflow-y-auto rounded-md items-center justify-center'>
      <ChatGPTApp loggedIn={isLoggedin} llmServiceApi={llmServiceApi} />
    </div>
  );
}
