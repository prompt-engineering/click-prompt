import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import { ChatGPTApp } from "@/chatgpt/ChatGPTApp";
import React from "react";
import { SharedApi } from "@/types/shared";

interface LoggingDrawerProps extends Omit<SharedApi, "isLoggedInApi"> {
  isOpen: boolean;
  handleClose: () => void;
  isLoggedIn: boolean;
  updateStatus?: (loggedIn: boolean) => void;
  initMessage: string;
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
