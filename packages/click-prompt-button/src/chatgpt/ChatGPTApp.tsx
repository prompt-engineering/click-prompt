import { ChatRoom } from "@/chatgpt/ChatRoom";
import { LoginPage } from "@/chatgpt/LoginPage";
import React, { useEffect, useState } from "react";
import type { LlmServiceApi } from "@/types/llmServiceApi";

interface ChatGPTAppProps {
  loggedIn?: boolean;
  updateLoginStatus?: (loggedIn: boolean) => void;
  initMessage?: string;
  llmServiceApi: LlmServiceApi;
}
export const ChatGPTApp = ({ loggedIn, initMessage, updateLoginStatus, llmServiceApi }: ChatGPTAppProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn ?? false);

  useEffect(() => {
    if (updateLoginStatus) {
      updateLoginStatus(isLoggedIn);
    }
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <ChatRoom setIsLoggedIn={setIsLoggedIn} initMessage={initMessage} llmServiceApi={llmServiceApi} />
  ) : (
    <LoginPage setIsLoggedIn={setIsLoggedIn} login={llmServiceApi.login} />
  );
};
