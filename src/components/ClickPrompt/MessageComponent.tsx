import React, { useEffect, useRef } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";

type Message = {
  from: "me" | "ai";
  text: string;
};

function MessageComponent({ messages }: { messages: Message[] }) {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      let current = elementRef?.current;
      if (current!) {
        current.scrollIntoView();
      }
    });

    return <div ref={elementRef} />;
  };

  return (
    <Flex w='100%' h='80%' overflowY='scroll' flexDirection='column' p='3'>
      {messages.map((item, index) => {
        if (item.from === "me") {
          return (
            <Flex key={index} w='100%' justify='flex-end'>
              <Flex bg='black' color='white' minW='100px' maxW='350px' my='1' p='3'>
                <Text>{item.text}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w='100%'>
              <Flex bg='gray.100' color='black' minW='100px' maxW='350px' my='1' p='3'>
                <Text>{item.text}</Text>
              </Flex>
            </Flex>
          );
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  );
}

export default MessageComponent;
