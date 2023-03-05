import React from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardFooter, CardHeader } from "@chakra-ui/card";
import { Box, Button, CardBody, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

import samples from "@/assets/chatgpt/samples/index.json";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function ChatGptSamples() {
  const chatgptLink = "https://github.com/prompt-engineering/prompt-generator/tree/master/src/assets/chatgpt";

  return (
    <>
      <Text>
        分享我的 ChatGPT 心得：
        <Link href={chatgptLink}>
          Pull Request <ExternalLinkIcon />
        </Link>
      </Text>
      {samples.length > 0 && (
        <Box padding={4} w='100%' maxW='1200px' mx='auto' sx={{ columnCount: [1, 2, 3], columnGap: "8px" }}>
          {samples.map((sample, index) => (
            <Card key={`sample-${index}`} maxH='400px'>
              <CardHeader>
                <Heading size='md'>
                  {sample.name} - {sample.author}
                </Heading>
              </CardHeader>
              <CardBody>
                <Stack>
                  <ReactMarkdown>
                    {sample?.preview ? sample.preview.replaceAll("\n", "\n\n") : "no preview"}
                  </ReactMarkdown>
                </Stack>
              </CardBody>

              <CardFooter>
                <Link href={"/chatgpt-samples/" + sample.path.split(".")[0]}>
                  <Button>View here</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
}

export default ChatGptSamples;
