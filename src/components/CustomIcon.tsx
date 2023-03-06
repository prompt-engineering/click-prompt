import React, { MouseEventHandler } from "react";
import Image from "next/image";

import chatgptLogo from "@/assets/images/chatgpt-logo.svg";
import clickPromptLogo from "@/assets/clickprompt-logo.svg";
import clickPromptBird from "@/assets/images/click-button-bird.svg";
import styled from "@emotion/styled";
import { Button, Text } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";

export function ChatGptIcon({ width = 32, height = 32 }) {
  return <Image src={chatgptLogo} alt='ChatGPT Logo' width={width} height={height} />;
}

export function ClickPromptIcon({ width = 32, height = 32 }) {
  return <StyledImage src={clickPromptLogo} alt='ClickPrompt Logo' width={width} height={height} />;
}

export function ClickPromptButton({ loading = false, onClick }: { loading?: boolean; onClick?: MouseEventHandler }) {
  const [isLoading, setIsLoading] = React.useState(loading);
  const handleClick = (event: any) => {
    setIsLoading(true);
    onClick && onClick(event);
  };

  return (
    <StyledPromptButton>
      <Button colorScheme='blackAlpha' onClick={handleClick}>
        {!isLoading && <Text>Prompt</Text>}
        {isLoading && <BeatLoader size={8} color='black' />}
      </Button>
      <StyledBird src={clickPromptBird} alt='ClickPrompt Logo' width={38} height={32} />
    </StyledPromptButton>
  );
}

const StyledPromptButton = styled.div`
  position: relative;
`;

const StyledImage = styled(Image)`
  display: inline-block;
`;

const StyledBird = styled(Image)`
  position: absolute;
  top: -20px;
  right: -20px;
`;
