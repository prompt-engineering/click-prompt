"use client";

import React, { MouseEventHandler, useState } from "react";
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
    try {
      await UserAPI.isLoggedIn();
      setHasLogin(true);
    } catch (e) {
      onOpen();
      setHasLogin(false);
    }

    let conversationId = props.conversationId;
    if (!props.conversationId) {
      setIsLoading(true);
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

    onClose();
    setIsLoading(false);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <StyledPromptButton>
        <Button colorScheme='twitter' className='bg-blue' onClick={handleClick} {...props}>
          {props.children}
          {!isLoading && <Text>Prompt</Text>}
          {isLoading && <BeatLoader size={8} color='black' />}
        </Button>
        <ClickPromptBird />
      </StyledPromptButton>
      {!hasLogin && LoggingDrawer(isOpen, handleClose, hasLogin, props)}
    </>
  );
}

export default ExecutePromptButton;
