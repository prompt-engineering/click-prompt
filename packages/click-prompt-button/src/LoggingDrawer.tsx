import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import { ChatGPTApp } from "@/chatgpt/ChatGPTApp";
import React from "react";

interface LoggingDrawerProps {
  isOpen: boolean;
  handleClose: () => void;
  isLoggedIn: boolean;
  updateStatus?: (loggedIn: boolean) => void;
  initMessage: string;
  changeConversationNameApi: (conversation_id: number, name: string) => Promise<any>;
  createConversationApi: (name?: string) => Promise<any>;
  getChatsByConversationIdApi: (conversationId: number) => Promise<any>;
  deleteConversationApi: (conversationId: number) => Promise<any>;
  deleteAllConversationsApi: () => Promise<any>;
  sendMsgWithStreamResApi: (conversageId: number, message: string, name?: string) => Promise<any>;
  logoutApi: () => Promise<any>;
}

export function LoggingDrawer({
  isOpen,
  handleClose,
  isLoggedIn,
  updateStatus,
  initMessage,
  changeConversationNameApi,
  createConversationApi,
  getChatsByConversationIdApi,
  deleteConversationApi,
  deleteAllConversationsApi,
  sendMsgWithStreamResApi,
  logoutApi,
}: LoggingDrawerProps) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={handleClose} size={"2xl"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton className="text-white z-50" />
        <DrawerBody padding={0}>
          <div className="bg-[#343541] flex flex-1 h-[100%] overflow-y-auto items-center justify-center">
            <ChatGPTApp
              loggedIn={isLoggedIn}
              initMessage={initMessage}
              updateLoginStatus={updateStatus}
              changeConversationNameApi={changeConversationNameApi}
              createConversationApi={createConversationApi}
              getChatsByConversationIdApi={getChatsByConversationIdApi}
              deleteConversationApi={deleteConversationApi}
              deleteAllConversationsApi={deleteAllConversationsApi}
              sendMsgWithStreamResApi={sendMsgWithStreamResApi}
              logoutApi={logoutApi}
            />
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
