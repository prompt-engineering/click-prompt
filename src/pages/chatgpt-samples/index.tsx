import React from "react";
import { Card, CardFooter, CardHeader } from "@chakra-ui/card";
import {
  Button,
  CardBody,
  Heading,
  SimpleGrid,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  ButtonGroup,
  Link as NavLink,
} from "@chakra-ui/react";

import Link from "next/link";

import samples from "@/assets/chatgpt/samples/index.json";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import SimpleMarkdown from "@/components/SimpleMarkdown";
import { ClickPromptButton } from "@/components/ClickPromptButton";
import { CP_GITHUB_ASSETS } from "@/configs/const";

function ChatGptSamples() {
  const chatgptLink = `${CP_GITHUB_ASSETS}/chatgpt`;

  return (
    <>
      <Alert status='info'>
        <AlertIcon />
        <AlertTitle>分享我的 ChatGPT 心得：</AlertTitle>
        <NavLink href={chatgptLink} isExternal>
          Pull Request <ExternalLinkIcon />
        </NavLink>
      </Alert>
      {samples.length > 0 && (
        <SimpleGrid columns={{ md: 4, base: 1 }} spacing={4}>
          {samples.map((sample, index) => (
            <Card key={`sample-${index}`} mt='2'>
              <CardHeader>
                <Heading size='md'>
                  {sample.name} - {sample.author}
                </Heading>
              </CardHeader>

              <CardBody maxH='320px' overflow='auto'>
                <Stack>
                  <SimpleMarkdown content={sample?.preview ? sample.preview.replaceAll("\n", "\n\n") : "no preview"} />
                </Stack>
              </CardBody>

              <CardFooter>
                <ButtonGroup spacing='4'>
                  <Link href={"/chatgpt-samples/" + sample.path.split(".")[0]}>
                    <Button>View here</Button>
                  </Link>
                  <ClickPromptButton text={sample.preview} />
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </>
  );
}

export default ChatGptSamples;
