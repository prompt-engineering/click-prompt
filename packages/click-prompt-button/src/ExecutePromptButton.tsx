import React, { useEffect, useState } from "react";
import { Button, Text, useDisclosure } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import { StyledPromptButton } from "@/SharedButton";
import { LoggingDrawer } from "@/LoggingDrawer";
import { ClickPromptBird } from "@/ClickPromptBird";
import type { Response, SharedApi } from "@/types/shared";

interface ExecButtonProps extends SharedApi {
  loading?: boolean;
  text: string;
  children?: React.ReactNode;
  handleResponse?: (response: ReadableStream<Uint8Array> | null) => void;
  conversationId?: number;
  updateConversationId?: (conversationId: number) => void;
  loginApi: () => Promise<Response>;
}

export const ExecutePromptButton = ({
  loading,
  text,
  children,
  handleResponse,
  conversationId,
  updateConversationId,
  isLoggedInApi,
  changeConversationNameApi,
  createConversationApi,
  getChatsByConversationIdApi,
  deleteConversationApi,
  deleteAllConversationsApi,
  sendMsgWithStreamResApi,
  logoutApi,
  loginApi,
}: ExecButtonProps) => {
  const [isLoading, setIsLoading] = useState(loading);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasLogin, setHasLogin] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const isLoggedIn = await isLoggedInApi();
      if (!isLoggedIn) {
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
      const conversation = await createConversationApi();
      if (!conversation) {
        return;
      }

      newConversationId = conversation.id as number;
      updateConversationId ? updateConversationId(newConversationId) : null;
    }

    if (newConversationId) {
      const response = await sendMsgWithStreamResApi(newConversationId, text);
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
        <Button colorScheme="twitter" className="bg-blue" onClick={handleClick}>
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
          changeConversationNameApi,
          createConversationApi,
          getChatsByConversationIdApi,
          deleteConversationApi,
          deleteAllConversationsApi,
          sendMsgWithStreamResApi,
          logoutApi,
          loginApi,
        })}
    </>
  );
};
