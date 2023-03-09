import "server-only";

import React from "react";
import {headers} from "next/headers";
import { ChatRoom } from "@/app/[lang]/chatgpt/ChatRoom";
import { LoginPage } from "@/app/[lang]/chatgpt/LoginPage";
import {SITE_INTERNAL_HEADER_URL} from "@/configs/constants";

export default async function ChatGPTPage() {
  const urlStr = headers().get(SITE_INTERNAL_HEADER_URL) as any as string;
  const url = new URL(urlStr);

  let data;
  try {
    data = await fetch(new URL(`/api/chatgpt/verify`, url)).then((res) => res.json());
  } catch (e) {
    console.error(e);
    console.log("nodejs version", process.version);
    data = { isLoggedIn: false };
  }

  return (
    <div className='bg-[#343541] flex h-[85vh] overflow-y-auto rounded-md items-center justify-center'>
      {data.isLoggedIn ? <ChatRoom /> : <LoginPage />}
    </div>
  );
}
