import React, { MouseEventHandler } from "react";
import { Box, Button, Text, Tooltip, useToast } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import clickPromptBird from "@/assets/images/click-button-bird.svg";
import Image from "next/image";
import styled from "@emotion/styled";
import { CopyIcon } from "@chakra-ui/icons";

type ButtonSize = "sm" | "md" | "lg";

type CPButtonProps = {
  loading?: boolean;
  onClick?: MouseEventHandler;
  size?: ButtonSize;
  [key: string]: any;
};

export function ClickPromptButton(props: CPButtonProps) {
  const [isLoading, setIsLoading] = React.useState(props.loading);
  const toast = useToast();

  const handleClick = (event: any) => {
    // todo: check token
    setIsLoading(true);
    props.onClick && props.onClick(event);
    toast({
      status: "error",
      position: "top",
      isClosable: true,
      render: () => (
        <Box color='white' p={3} bg='blue.500'>
          未配置 ChatGPT Token，正在跳转到配置页面（未实现）
        </Box>
      ),
    });
  };

  function NormalSize() {
    return (
      <StyledPromptButton>
        <Button colorScheme='twitter' onClick={handleClick} {...props}>
          {!isLoading && <Text>Prompt</Text>}
          {isLoading && <BeatLoader size={8} color='black' />}
        </Button>
        <StyledBird src={clickPromptBird} alt='ClickPrompt Logo' width={38} height={32} />
      </StyledPromptButton>
    );
  }

  function SmallSize() {
    return (
      <Button variant='unstyled' onClick={handleClick} {...props}>
        <Tooltip label='执行 ChatGPT Prompt' aria-label='A tooltip'>
          <Image src={clickPromptBird} alt='ClickPrompt Logo' width={24} height={24} />
        </Tooltip>
      </Button>
    );
  }

  return (
    <Box>
      {props.size !== "sm" && <NormalSize />}
      {props.size === "sm" && <SmallSize />}
    </Box>
  );
}

const StyledPromptButton = styled.div`
  width: 88px;
  position: relative;
`;

const StyledBird = styled(Image)`
  position: absolute;
  top: -20px;
  right: -20px;
`;
