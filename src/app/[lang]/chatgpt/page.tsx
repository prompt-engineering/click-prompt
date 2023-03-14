import "server-only";

import React from "react";
import { cookies } from "next/headers";
import { SITE_USER_COOKIE } from "@/configs/constants";
import { ChatGPTApp } from "@/components/chatgpt/ChatGPTApp";
import * as UserAPI from "@/api/user";

export default async function ChatGPTPage() {
  const hashedKey = cookies().get(SITE_USER_COOKIE)?.value as string;

  let isLoggedin = false;
  try {
    isLoggedin = await UserAPI.isLoggedIn(hashedKey);
  } catch (e) {
    console.error(e);
    isLoggedin = false;
  }

  return (
    <div className='bg-[#343541] flex h-[85vh] overflow-y-auto rounded-md items-center justify-center'>
      <ChatGPTApp loggedIn={isLoggedin} />
    </div>
  );
}
