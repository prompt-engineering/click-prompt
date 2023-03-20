"use client";

import React, { MouseEventHandler, useEffect, useState } from "react";
import { Text, useDisclosure } from "@chakra-ui/react";
import * as UserAPI from "@/api/user";
import { ResponseCreateConversation } from "@/pages/api/chatgpt/conversation";
import { createConversation } from "@/api/conversation";
import { sendMessage } from "@/api/chat";
import { ResponseSend } from "@/pages/api/chatgpt/chat";
import { Button } from "@/components/ChakraUI";
import { BeatLoader } from "react-spinners";
import { ClickPromptBird } from "@/components/ClickPrompt/ClickPromptButton";
import { ButtonSize, StyledPromptButton } from "./Button.shared";
import { LoggingDrawer } from "@/components/ClickPrompt/LoggingDrawer";

export type ExecButtonProps = {
  loading?: boolean;
  onClick?: MouseEventHandler;
  name: string;
  text: string;
  size?: ButtonSize;
  children?: React.ReactNode;
  handleResponse?: (response: ResponseSend) => void;
  conversationId?: number;
  updateConversationId?: (conversationId: number) => void;
};

function ExecutePromptButton(props: ExecButtonProps) {
  const [isLoading, setIsLoading] = useState(props.loading);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasLogin, setHasLogin] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const isLoggedIn = await UserAPI.isLoggedIn();
      if (!isLoggedIn) {
        onOpen();
        setIsLoading(false);
        return;
      }
    } catch (e) {
      console.log(e);
      setHasLogin(false);
    }

    let conversationId = props.conversationId;
    if (!props.conversationId) {
      const conversation: ResponseCreateConversation = await createConversation();
      if (!conversation) {
        return;
      }

      conversationId = conversation.id as number;
      props.updateConversationId ? props.updateConversationId(conversationId) : null;
    }

    if (conversationId) {
      const response: any = await sendMessage(conversationId, props.text);
      if (response && props.handleResponse) {
        props.handleResponse(response as ResponseSend);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    console.log(`hasLogin: ${hasLogin}`);
    if (hasLogin) {
      onClose();
    }
  }, [hasLogin]);

  const handleClose = () => {
    onClose();
  };

  const updateLoginStatus = (status: boolean) => {
    if (status) {
      setHasLogin(true);
      onClose();
    }
  };

  return (
    <>
      <StyledPromptButton>
        <Button colorScheme='twitter' className='bg-blue' onClick={handleClick}>
          {props.children}
          {!isLoading && <Text>Prompt</Text>}
          {isLoading && <BeatLoader size={8} color='black' />}
        </Button>
        <ClickPromptBird />
      </StyledPromptButton>
      {!hasLogin && LoggingDrawer(isOpen, handleClose, hasLogin, props, updateLoginStatus)}
    </>
  );
}

export default ExecutePromptButton;
