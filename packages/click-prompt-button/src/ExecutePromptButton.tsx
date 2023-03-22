import React, { useEffect, useState } from "react";
import { Button, Text, useDisclosure } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import { StyledPromptButton } from "@/SharedButton";
import { LoggingDrawer } from "@/LoggingDrawer";
import { ClickPromptBird } from "@/ClickPromptBird";

export type ExecButtonProps = {
  loading?: boolean;
  text: string;
  children?: React.ReactNode;
  handleResponse?: (response: any) => void;
  conversationId?: number;
  updateConversationId?: (conversationId: number) => void;
  createConversation: (name?: string) => Promise<any>;
  sendMessage: (conversageId: number, message: string, name?: string) => Promise<any>;
  isLoggedInApi: () => Promise<any>;
  changeConversationNameApi: (conversation_id: number, name: string) => Promise<any>;
  createConversationApi: (name?: string) => Promise<any>;
  getChatsByConversationIdApi: (conversationId: number) => Promise<any>;
  deleteConversationApi: (conversationId: number) => Promise<any>;
  deleteAllConversationsApi: () => Promise<any>;
  sendMsgWithStreamResApi: (conversageId: number, message: string, name?: string) => Promise<any>;
  logoutApi: () => Promise<any>;
};

export const ExecutePromptButton = ({
  loading,
  text,
  children,
  handleResponse,
  conversationId,
  updateConversationId,
  createConversation,
  sendMessage,
  isLoggedInApi,
  changeConversationNameApi,
  createConversationApi,
  getChatsByConversationIdApi,
  deleteConversationApi,
  deleteAllConversationsApi,
  sendMsgWithStreamResApi,
  logoutApi,
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
      const conversation = await createConversation();
      if (!conversation) {
        return;
      }

      newConversationId = conversation.id as number;
      updateConversationId ? updateConversationId(newConversationId) : null;
    }

    if (newConversationId) {
      const response: any = await sendMessage(newConversationId, text);
      if (response && handleResponse) {
        handleResponse(response as any);
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
          changeConversationNameApi: changeConversationNameApi,
          createConversationApi: createConversationApi,
          getChatsByConversationIdApi: getChatsByConversationIdApi,
          deleteConversationApi: deleteConversationApi,
          deleteAllConversationsApi: deleteAllConversationsApi,
          sendMsgWithStreamResApi: sendMsgWithStreamResApi,
          logoutApi: logoutApi,
        })}
    </>
  );
};
