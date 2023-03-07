import React from "react";
import { LoginPage } from "@/app/chatgpt/LoginPage";
import { ChatRoom } from "@/app/chatgpt/ChatRoom";

type ChatGptAppProp = {
  message?: string;
};

export const ChatGPTApp = async (props: ChatGptAppProp) => {
  const response = await fetch(`${process.env.BASE_URL}/api/chatgpt/verify`, { cache: "no-store" });
  const data = await response.json();

  return data.loggedIn ? <ChatRoom initMessage={props.message} /> : <LoginPage />;
};
