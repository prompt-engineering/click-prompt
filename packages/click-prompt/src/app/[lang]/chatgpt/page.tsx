import "server-only";

import React from "react";
import { cookies } from "next/headers";
import { SITE_USER_COOKIE } from "@/configs/constants";
import { ChatGPTApp } from "@/components/ClickPromptButton";
import { isLoggedIn } from "@/api/user";
import { llmServiceApiWithStream } from "@/api/llmService";

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
      <ChatGPTApp loggedIn={isLoggedin} llmServiceApi={llmServiceApiWithStream} />
    </div>
  );
}
