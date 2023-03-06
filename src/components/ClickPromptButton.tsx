import React, { MouseEventHandler } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import clickPromptBird from "@/assets/images/click-button-bird.svg?url";
import Image from "next/image";
import styled from "@emotion/styled";
import { CopyIcon } from "@chakra-ui/icons";
import { ChatGPTApp } from "@/pages/chatgpt";

type ButtonSize = "sm" | "md" | "lg";

type CPButtonProps = {
  loading?: boolean;
  onClick?: MouseEventHandler;
  size?: ButtonSize;
  [key: string]: any;
};

export function ClickPromptButton(props: CPButtonProps) {
  const [isLoading, setIsLoading] = React.useState(props.loading);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast();

  const handleClick = (event: any) => {
    // todo: check token
    setIsLoading(true);
    onOpen();
    props.onClick && props.onClick(event);
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

      <Drawer isOpen={isOpen} placement='right' onClose={onClose} size={"lg"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>ChatGPT</DrawerHeader>

          <DrawerBody>
            <div className='bg-[#343541]'>
              <ChatGPTApp message={props?.text ? props?.text.toString() : ""} />
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
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
