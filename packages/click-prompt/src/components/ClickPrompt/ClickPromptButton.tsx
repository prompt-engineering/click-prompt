"use client";

import React, { useState } from "react";
import { Box, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { Button } from "@/components/ChakraUI";
import { BeatLoader } from "react-spinners";
import { ClickPromptSmall } from "@/components/CustomIcon";
import clickPromptLogo from "@/assets/clickprompt-light.svg?url";
import { CPButtonProps, StyledBird, StyledPromptButton } from "@/components/ClickPrompt/Button.shared";
import { LoggingDrawer } from "@/components/ClickPrompt/LoggingDrawer";
import * as UserAPI from "@/api/user";

export type ClickPromptBirdParams = { width?: number; height?: number };

export function ClickPromptBird(props: ClickPromptBirdParams) {
  const width = props.width || 38;
  const height = props.height || 32;

  return <StyledBird src={clickPromptLogo} alt='ClickPrompt Logo' width={width} height={height} />;
}

export function ClickPromptButton(props: CPButtonProps) {
  const [isLoading, setIsLoading] = useState(props.loading);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = async (event: any) => {
    setIsLoading(true);
    const isLoggedIn = await UserAPI.isLoggedIn();
    setIsLoggedIn(isLoggedIn);
    onOpen();
    props.onClick && props.onClick(event);
  };

  const handleClose = () => {
    setIsLoading(false);
    onClose();
  };

  function NormalSize() {
    return (
      <StyledPromptButton>
        <Button colorScheme='twitter' className='bg-blue' onClick={handleClick} {...props}>
          {props.children}
          {!isLoading && <Text>Prompt</Text>}
          {isLoading && <BeatLoader size={8} color='black' />}
        </Button>
        <ClickPromptBird />
      </StyledPromptButton>
    );
  }

  function SmallSize() {
    return (
      <Button variant='unstyled' onClick={handleClick} {...props}>
        {props.children}
        <Tooltip label='Execute ChatGPT Prompt' aria-label='A tooltip'>
          <ClickPromptSmall width={32} height={32} />
        </Tooltip>
      </Button>
    );
  }

  return (
    <Box>
      {props.size !== "sm" && <NormalSize />}
      {props.size === "sm" && <SmallSize />}

      {LoggingDrawer(isOpen, handleClose, isLoggedIn, props)}
    </Box>
  );
}
