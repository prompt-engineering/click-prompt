"use client";

import { ChatRoom } from "@/app/[lang]/chatgpt/ChatRoom";
import { LoginPage } from "@/app/[lang]/chatgpt/LoginPage";
import React, { useState } from "react";

export const ChatGPTApp = ({ loggedIn, initMessage }: { loggedIn?: boolean; initMessage?: string }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn ?? false);

  return isLoggedIn ? <ChatRoom setIsLoggedIn={setIsLoggedIn} initMessage={initMessage} /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />;
};
