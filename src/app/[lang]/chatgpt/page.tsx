import "server-only";

import React from "react";
import { headers } from "next/headers";
import { SITE_INTERNAL_HEADER_URL } from "@/configs/constants";
import { ChatGPTApp } from "@/components/ChatGPTApp";

export default async function ChatGPTPage() {
  const urlStr = headers().get(SITE_INTERNAL_HEADER_URL) as any as string;
  const url = new URL(urlStr);

  // Propagate cookies to the API route
  const headersPropagated = { cookie: headers().get("cookie") as string };
  let data;
  try {
    data = await fetch(new URL(`/api/chatgpt/verify`, url), { headers: headersPropagated, cache: "no-cache" }).then(
      (res) => res.json(),
    );
  } catch (e) {
    console.error(e);
    data = { loggedIn: false };
  }

  return (
    <div className='bg-[#343541] flex h-[85vh] overflow-y-auto rounded-md items-center justify-center'>
      <ChatGPTApp loggedIn={data.loggedIn} />
    </div>
  );
}
