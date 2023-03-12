import "server-only";

import React from "react";
import { cookies } from "next/headers";
import { SITE_INTERNAL_HEADER_URL, SITE_USER_COOKIE } from "@/configs/constants";
import { ChatGPTApp } from "@/components/ChatGPTApp";
import * as UserAPI from "@/api/user";

export default async function ChatGPTPage() {
  const hashedKey = cookies().get(SITE_USER_COOKIE)?.value as string;
  // const url = new URL(urlStr);

  // Propagate cookies to the API route
  // const headersPropagated = { cookie: headers().get("cookie") as string };
  let isLoggedin = false;
  try {
    isLoggedin = await UserAPI.isLoggedIn(hashedKey);
  } catch (e) {
    console.error(e);
    isLoggedin = false;
  }
  console.log("isLoggedin", isLoggedin, hashedKey);

  return (
    <div className='bg-[#343541] flex h-[85vh] overflow-y-auto rounded-md items-center justify-center'>
      <ChatGPTApp loggedIn={isLoggedin} />
    </div>
  );
}
