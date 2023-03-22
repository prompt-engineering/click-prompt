import React, { MouseEventHandler, useState } from "react";
import { Box, Button, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import { ClickPromptSmall } from "@/CustomIcon";
import { ButtonSize, StyledPromptButton } from "@/SharedButton";
import { LoggingDrawer } from "@/LoggingDrawer";
import { ClickPromptBird } from "@/ClickPromptBird";
import { SharedApi } from "@/types/shared";

interface ClickPromptButtonProps extends SharedApi {
  loading?: boolean;
  onClick?: MouseEventHandler;
  size?: ButtonSize;
  text: string;
  children?: React.ReactNode;
}

export function ClickPromptButton({
  isLoggedInApi,
  children,
  size,
  text,
  onClick,
  loading,
  changeConversationNameApi,
  createConversationApi,
  getChatsByConversationIdApi,
  deleteConversationApi,
  deleteAllConversationsApi,
  sendMsgWithStreamResApi,
  logoutApi,
}: ClickPromptButtonProps) {
  const [isLoading, setIsLoading] = useState(loading);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = async (event: any) => {
    setIsLoading(true);
    const isLoggedIn = await isLoggedInApi();
    setIsLoggedIn(isLoggedIn);
    onOpen();
    onClick && onClick(event);
  };

  const handleClose = () => {
    setIsLoading(false);
    onClose();
  };

  function NormalSize() {
    return (
      <StyledPromptButton>
        {/*TODO: check ...props with what is passed in*/}
        <Button colorScheme="twitter" className="bg-blue" onClick={handleClick}>
          {children}
          {!isLoading && <Text>Prompt</Text>}
          {isLoading && <BeatLoader size={8} color="black" />}
        </Button>
        <ClickPromptBird />
      </StyledPromptButton>
    );
  }

  function SmallSize() {
    return (
      // TODO: check ...props with what is passed in
      <Button variant="unstyled" onClick={handleClick}>
        {children}
        <Tooltip label="Execute ChatGPT Prompt" aria-label="A tooltip">
          <ClickPromptSmall width={32} height={32} />
        </Tooltip>
      </Button>
    );
  }

  return (
    <Box>
      {size !== "sm" && <NormalSize />}
      {size === "sm" && <SmallSize />}

      {LoggingDrawer({
        isOpen,
        handleClose,
        isLoggedIn,
        initMessage: text,
        changeConversationNameApi,
        createConversationApi,
        getChatsByConversationIdApi,
        deleteConversationApi,
        deleteAllConversationsApi,
        sendMsgWithStreamResApi,
        logoutApi,
      })}
    </Box>
  );
}
