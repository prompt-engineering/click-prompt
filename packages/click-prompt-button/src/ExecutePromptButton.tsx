import React, { useEffect, useState } from "react";
import { Button, Text, useDisclosure } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import { StyledPromptButton } from "@/SharedButton";
import { LoggingDrawer } from "@/LoggingDrawer";
import { ClickPromptBird } from "@/ClickPromptBird";
import type { Chat, LlmServiceApi } from "@/types/llmServiceApi";

export interface ExecButtonProps {
  loading?: boolean;
  text: string;
  children?: React.ReactNode;
  handleResponse?: (response: ReadableStream<Uint8Array> | Chat[] | null) => void;
  conversationId?: number;
  updateConversationId?: (conversationId: number) => void;
  llmServiceApi: LlmServiceApi;
}

export const ExecutePromptButton = ({
  loading,
  text,
  children,
  handleResponse,
  conversationId,
  updateConversationId,
  llmServiceApi,
}: ExecButtonProps) => {
  const [isLoading, setIsLoading] = useState(loading);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasLogin, setHasLogin] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const isUserLoggedIn = await llmServiceApi.isLoggedIn();
      if (!isUserLoggedIn) {
        onOpen();
        setIsLoading(false);
        return;
      }
    } catch (e) {
      console.log(e);
      setHasLogin(false);
    }

    let newConversationId = conversationId;
    if (!conversationId) {
      const conversation = await llmServiceApi.createConversation();
      if (!conversation) {
        return;
      }

      newConversationId = conversation.id as number;
      updateConversationId ? updateConversationId(newConversationId) : null;
    }

    if (newConversationId) {
      const response = llmServiceApi.sendMsgWithStreamRes
        ? await llmServiceApi.sendMsgWithStreamRes(newConversationId, text)
        : await llmServiceApi.sendMessage(newConversationId, text);
      if (response && handleResponse) {
        handleResponse(response);
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
        <Button colorScheme="twitter" className="button-bg-blue" onClick={handleClick}>
          {children}
          {!isLoading && <Text>Prompt</Text>}
          {isLoading && <BeatLoader size={8} color="black" />}
        </Button>
        <ClickPromptBird />
      </StyledPromptButton>
      {!hasLogin &&
        LoggingDrawer({
          isOpen,
          handleClose,
          updateStatus: updateLoginStatus,
          isLoggedIn: hasLogin,
          initMessage: text,
          llmServiceApi,
        })}
    </>
  );
};
