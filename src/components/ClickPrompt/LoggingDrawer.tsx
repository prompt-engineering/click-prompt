"use client";

import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import { ChatGPTApp } from "@/components/chatgpt/ChatGPTApp";
import React from "react";
import { CPButtonProps } from "@/components/ClickPrompt/Button.shared";

export function LoggingDrawer(
  isOpen: boolean,
  handleClose: () => void,
  isLoggedIn: boolean,
  props: CPButtonProps,
  updateStatus?: (loggedIn: boolean) => void,
) {
  return (
    <Drawer isOpen={isOpen} placement='right' onClose={handleClose} size={"2xl"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton className='text-white z-50' />
        <DrawerBody padding={0}>
          <div className='bg-[#343541] flex flex-1 h-[100%] overflow-y-auto items-center justify-center'>
            <ChatGPTApp loggedIn={isLoggedIn} initMessage={props.text} updateLoginStatus={updateStatus} />
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
