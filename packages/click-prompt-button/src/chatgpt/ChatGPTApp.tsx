import { ChatRoom } from "@/chatgpt/ChatRoom";
import { LoginPage } from "@/chatgpt/LoginPage";
import React, { useEffect, useState } from "react";

type ChatGPTAppProps = {
  loggedIn?: boolean;
  updateLoginStatus?: (loggedIn: boolean) => void;
  initMessage?: string;
};
export const ChatGPTApp = ({ loggedIn, initMessage, updateLoginStatus }: ChatGPTAppProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn ?? false);

  useEffect(() => {
    if (updateLoginStatus) {
      updateLoginStatus(isLoggedIn);
    }
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <ChatRoom
      setIsLoggedIn={setIsLoggedIn}
      initMessage={initMessage}
      changeConversationNameApi={function (conversation_id: number, name: string): Promise<any> {
        throw new Error("Function not implemented.");
      }}
      createConversationApi={function (name?: string | undefined): Promise<any> {
        throw new Error("Function not implemented.");
      }}
      getChatsByConversationIdApi={function (conversationId: number): Promise<any> {
        throw new Error("Function not implemented.");
      }}
      deleteConversationApi={function (conversationId: number): Promise<any> {
        throw new Error("Function not implemented.");
      }}
      deleteAllConversationsApi={function (): Promise<any> {
        throw new Error("Function not implemented.");
      }}
      sendMsgWithStreamResApi={function (
        conversageId: number,
        message: string,
        name?: string | undefined
      ): Promise<any> {
        throw new Error("Function not implemented.");
      }}
      logoutApi={function (): Promise<any> {
        throw new Error("Function not implemented.");
      }}
    />
  ) : (
    <LoginPage
      setIsLoggedIn={setIsLoggedIn}
      loginApi={function (key: string): Promise<any> {
        throw new Error("Function not implemented.");
      }}
    />
  );
};
