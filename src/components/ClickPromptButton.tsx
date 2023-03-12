"use client";

import React, { MouseEventHandler, useState } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "@/components/ChakraUI";
import { BeatLoader } from "react-spinners";
import styled from "@emotion/styled";
import { ChatGPTApp } from "@/components/ChatGPTApp";
import { ClickPromptSmall } from "@/components/CustomIcon";
import Image from "next/image";
import clickPromptLogo from "@/assets/clickprompt-light.svg?url";
import * as UserAPI from "@/api/user";
import { createConversation } from "@/api/conversation";
import { sendMessage } from "@/api/chat";
import { ResponseCreateConversation } from "@/pages/api/chatgpt/conversation";
import { RequestSend, ResponseSend } from "@/pages/api/chatgpt/chat";

type ButtonSize = "sm" | "md" | "lg";

type CPButtonProps = {
  loading?: boolean;
  onClick?: MouseEventHandler;
  size?: ButtonSize;
  text: string;
  children?: React.ReactNode;
  [key: string]: any;
};

export type ExecButtonProps = {
  loading?: boolean;
  onClick?: MouseEventHandler;
  name: string;
  text: string;
  size?: ButtonSize;
  children?: React.ReactNode;
  handleResponse?: any;
};

export type ClickPromptBirdParams = { width?: number; height?: number };
export function ClickPromptBird(props: ClickPromptBirdParams) {
  const width = props.width || 38;
  const height = props.height || 32;

  return <StyledBird src={clickPromptLogo} alt='ClickPrompt Logo' width={width} height={height} />;
}

const StyledBird = styled(Image)`
  position: absolute;
  top: -20px;
  right: -20px;
`;

export function ExecutePromptButton(props: ExecButtonProps) {
  const [isLoading, setIsLoading] = useState(props.loading);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasLogin, setHasLogin] = useState(false);

  // todo: add login check
  const handleClick = async (event: any) => {
    try {
      await UserAPI.isLoggedIn();
    } catch (e) {
      onOpen();
      setHasLogin(false);
    }

    setIsLoading(true);
    const conversation: ResponseCreateConversation = await createConversation();
    if (!conversation) {
      return;
    }

    const response: any = await sendMessage(conversation.id || 0, props.text);
    if (!response) {
      props.handleResponse ? props.handleResponse(response as ResponseSend) : null;
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

function LoggingDrawer(isOpen: boolean, handleClose: () => void, isLoggedIn: boolean, props: CPButtonProps) {
  return (
    <Drawer isOpen={isOpen} placement='right' onClose={handleClose} size={"2xl"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton className='text-white z-50' />
        <DrawerBody padding={0}>
          <div className='bg-[#343541] flex flex-1 h-[100%] overflow-y-auto items-center justify-center'>
            <ChatGPTApp loggedIn={isLoggedIn} initMessage={props.text} />
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export function ClickPromptButton(props: CPButtonProps) {
  const [isLoading, setIsLoading] = useState(props.loading);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = async (event: any) => {
    setIsLoading(true);
    const response = await fetch("/api/chatgpt/verify");
    const data = await response.json();
    setIsLoggedIn(data.loggedIn);
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

const StyledPromptButton = styled.div`
  position: relative;
  width: min-content;
`;
