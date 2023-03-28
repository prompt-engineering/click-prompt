"use client";

import { Box, Button, Container, Heading, Stack, Text } from "@/components/ChakraUI";
import { ClickPromptHome } from "@/components/CustomIcon";
import { GITHUB_URL } from "@/configs/constants";
import { ClickPromptButton } from "@/components/ClickPromptButton";
import React from "react";
import { llmServiceApiWithStream } from "@/api/llmService";

export const HomeClient = ({ dict }: { dict: Record<string, string> }) => {
  return (
    <Box mb={20}>
      <Box as='section' pt='6rem' pb={{ base: "0", md: "5rem" }}>
        <Container>
          <Box textAlign='center'>
            <ClickPromptHome width={128} height={128} />
            <Heading
              as='h1'
              maxW='16ch'
              mx='auto'
              fontSize={{ base: "2.25rem", sm: "3rem", lg: "4rem" }}
              fontFamily='heading'
              letterSpacing='tighter'
              fontWeight='extrabold'
              mb='16px'
              lineHeight='1.2'
            >
              {dict["title"]}
            </Heading>

            <Text
              maxW='560px'
              mx='auto'
              color='gray.500'
              _dark={{ color: "gray.400" }}
              fontSize={{ base: "lg", lg: "xl" }}
              mt='6'
            >
              {dict["description"]}
            </Text>

            <Stack mt='10' spacing='4' justify='center' direction={{ base: "column", sm: "row" }}>
              <Button as='a' size='lg' h='4rem' px='40px' fontSize='1.2rem' href={GITHUB_URL} target='__blank'>
                GitHub
              </Button>
              <ClickPromptButton
                size='lg'
                h='4rem'
                px='40px'
                text='Hello World'
                llmServiceApi={llmServiceApiWithStream}
              />
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
