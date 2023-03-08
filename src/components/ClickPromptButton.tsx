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
import clickPromptBird from "@/assets/images/click-button-bird.svg?url";
import Image from "next/image";
import styled from "@emotion/styled";
import { ChatGPTApp } from "@/components/ChatGPTApp";

type ButtonSize = "sm" | "md" | "lg";

type CPButtonProps = {
  loading?: boolean;
  onClick?: MouseEventHandler;
  size?: ButtonSize;
  text?: string;
  children?: React.ReactNode;
  [key: string]: any;
};

type ClickPromptBirdParams = { width?: number; height?: number };

function ClickPromptBird(props: ClickPromptBirdParams) {
  let width = props.width || 38;
  let height = props.height || 32;

  return <StyledBird src={clickPromptBird} alt='ClickPrompt Logo' width={width} height={height} />;
}

export function ClickPromptButton(props: CPButtonProps) {
  const [isLoading, setIsLoading] = useState(props.loading);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (event: any) => {
    // todo: check token
    setIsLoading(true);
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
        <Button colorScheme='twitter' onClick={handleClick} {...props}>
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
        <Tooltip label='执行 ChatGPT Prompt' aria-label='A tooltip'>
          <InlinedBird src={clickPromptBird} alt='ClickPrompt Logo' width={24} height={24} />
        </Tooltip>
      </Button>
    );
  }

  return (
    <Box>
      {props.size !== "sm" && <NormalSize />}
      {props.size === "sm" && <SmallSize />}

      <Drawer isOpen={isOpen} placement='right' onClose={handleClose} size={"2xl"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton className='text-white z-50' />
          {/* <DrawerHeader>ChatGPT</DrawerHeader> */}
          <DrawerBody padding={0}>
            <div className='bg-[#343541] flex flex-1 h-[100%] overflow-y-auto items-center justify-center'>
              <ChatGPTApp message={props?.text ? props?.text.toString() : ""} />
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

const InlinedBird = styled(Image)`
  display: inline-block;
  padding-left: 4px;
`;

const StyledPromptButton = styled.div`
  position: relative;
  width: min-content;
`;

const StyledBird = styled(Image)`
  position: absolute;
  top: -20px;
  right: -20px;
`;
