import React from "react";
import { Box, Text, Container, chakra, Stack, Link, Button } from "@chakra-ui/react";
import { ClickPromptIcon } from "@/components/CustomIcon";

function Home() {
  return (
    <Box mb={20}>
      <Box as='section' pt='6rem' pb={{ base: "0", md: "5rem" }}>
        <Container>
          <Box textAlign='center'>
            <ClickPromptIcon width={128} height={128} />

            <chakra.h1
              maxW='16ch'
              mx='auto'
              fontSize={{ base: "2.25rem", sm: "3rem", lg: "4rem" }}
              fontFamily='heading'
              letterSpacing='tighter'
              fontWeight='extrabold'
              mb='16px'
              lineHeight='1.2'
            >
              Streamline your prompt design
            </chakra.h1>

            <Text
              maxW='560px'
              mx='auto'
              color='gray.500'
              _dark={{ color: "gray.400" }}
              fontSize={{ base: "lg", lg: "xl" }}
              mt='6'
            >
              ClickPrompt 是一款专为 Prompt 编写者设计的工具，它支持多种基于 Prompt 的 AI 应用，例如 Stable
              Diffusion、ChatGPT 和 GitHub Copilot 等。 使用
              ClickPrompt，您可以轻松地查看、分享和一键运行这些模型，同时提供在线的 Prompt
              生成器，使用户能够根据自己的需求轻松创建符合要求的 Prompt，并与其他人分享。
            </Text>

            <Stack mt='10' spacing='4' justify='center' direction={{ base: "column", sm: "row" }}>
              <Button
                as='a'
                size='lg'
                h='4rem'
                px='40px'
                fontSize='1.2rem'
                href='https://github.com/prompt-engineering/click-prompt/'
                target='__blank'
              >
                GitHub
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
