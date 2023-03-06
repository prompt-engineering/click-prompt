import React, { MouseEventHandler } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import clickPromptBird from "@/assets/images/click-button-bird.svg";
import styled from "@emotion/styled/dist/emotion-styled.cjs";
import Image from "next/image";

export function ClickPromptButton(props: { loading?: boolean; onClick?: MouseEventHandler; [key: string]: any }) {
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

  return (
    <StyledPromptButton>
      <Button colorScheme='blackAlpha' onClick={handleClick} {...props}>
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

const StyledBird = styled(Image)`
  position: absolute;
  top: -20px;
  right: -20px;
`;
