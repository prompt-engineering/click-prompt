import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import { ChatGPTApp } from "@/chatgpt/ChatGPTApp";
import React from "react";
import type { LlmServiceApi } from "@/types/llmServiceApi";

interface LoggingDrawerProps {
  isOpen: boolean;
  handleClose: () => void;
  isLoggedIn: boolean;
  updateStatus?: (loggedIn: boolean) => void;
  initMessage: string;
  llmServiceApi: LlmServiceApi;
}

export function LoggingDrawer({
  isOpen,
  handleClose,
  isLoggedIn,
  updateStatus,
  initMessage,
  llmServiceApi,
}: LoggingDrawerProps) {
  return (
    <Drawer isOpen={isOpen} placement='right' onClose={handleClose} size={"2xl"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton className='button-text-white button-z-50' />
        <DrawerBody padding={0}>
          <div className='button-bg-[#343541] button-flex button-flex-1 button-h-[100%] button-overflow-y-auto button-items-center button-justify-center'>
            <ChatGPTApp
              loggedIn={isLoggedIn}
              initMessage={initMessage}
              updateLoginStatus={updateStatus}
              llmServiceApi={llmServiceApi}
            />
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
