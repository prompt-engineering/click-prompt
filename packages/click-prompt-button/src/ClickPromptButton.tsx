import React, { MouseEventHandler, useState } from "react";
import { Box, Button, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import { ClickPromptSmall } from "@/CustomIcon";
import { ButtonSize, StyledPromptButton } from "@/SharedButton";
import { LoggingDrawer } from "@/LoggingDrawer";
import { ClickPromptBird } from "@/ClickPromptBird";
import type { LlmServiceApi } from "@/types/llmServiceApi";

interface ClickPromptButtonProps {
  loading?: boolean;
  onClick?: MouseEventHandler;
  size?: ButtonSize;
  text: string;
  children?: React.ReactNode;
  llmServiceApi: LlmServiceApi;
}

export function ClickPromptButton({ children, size, text, onClick, loading, llmServiceApi }: ClickPromptButtonProps) {
  const [isLoading, setIsLoading] = useState(loading);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = async (event: React.MouseEvent) => {
    setIsLoading(true);
    const isLoggedIn = await llmServiceApi.isLoggedIn();
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
        llmServiceApi,
      })}
    </Box>
  );
}
