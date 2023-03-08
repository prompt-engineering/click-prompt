"use client";

import React, { MouseEventHandler } from "react";
import { Box, Text, Tooltip } from "@chakra-ui/react";
import { Button } from "@/components/ChakraUI";
import clickPromptBird from "@/assets/images/click-button-bird.svg?url";
import Image from "next/image";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";

type ButtonSize = "sm" | "md" | "lg";

type CPButtonProps = {
  loading?: boolean;
  onClick?: MouseEventHandler;
  size?: ButtonSize;
  text: string;
  children?: React.ReactNode;
  [key: string]: any;
};

type ClickPromptBirdParams = { width?: number; height?: number };

function ClickPromptBird(props: ClickPromptBirdParams) {
  const width = props.width || 38;
  const height = props.height || 32;

  return <StyledBird src={clickPromptBird} alt='ClickPrompt Logo' width={width} height={height} />;
}

export function ClickPromptButton(props: CPButtonProps) {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, message: string) => {
    localStorage.setItem("prompt", message);
    props.onClick?.(event);
    router.push("/chatgpt");
  };

  function NormalSize({ message }: { message: string }) {
    return (
      <StyledPromptButton>
        <Button colorScheme='twitter' className='bg-blue' onClick={(event) => handleClick(event, message)} {...props}>
          {props.children}
          <Text>Prompt</Text>
        </Button>
        <ClickPromptBird />
      </StyledPromptButton>
    );
  }

  function SmallSize({ message }: { message: string }) {
    return (
      <Button variant='unstyled' onClick={(event) => handleClick(event, message)} {...props}>
        {props.children}
        <Tooltip label='执行 ChatGPT Prompt' aria-label='A tooltip'>
          <InlinedBird src={clickPromptBird} alt='ClickPrompt Logo' width={24} height={24} />
        </Tooltip>
      </Button>
    );
  }

  return <Box>{props.size === "sm" ? <SmallSize message={props.text} /> : <NormalSize message={props.text} />}</Box>;
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
