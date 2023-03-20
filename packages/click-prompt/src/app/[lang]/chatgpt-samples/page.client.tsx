"use client";

import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Link as NavLink,
  SimpleGrid,
  Stack,
  Box,
  Text,
} from "@chakra-ui/react";

import Link from "next/link";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import SimpleMarkdown from "@/components/markdown/SimpleMarkdown";
import { ClickPromptButton } from "@/components/ClickPrompt/ClickPromptButton";
import { CP_GITHUB_ASSETS } from "@/configs/constants";
import type { Sample } from "./type";

function ChatGptSamples({ i18n, samples }: { samples: Sample[] } & GeneralI18nProps) {
  const chatgptLink = `${CP_GITHUB_ASSETS}/chatgpt`;
  const dict = i18n.dict;

  return (
    <>
      <Alert status='info'>
        <AlertIcon />
        <AlertTitle>{dict["share-my-chatgpt-prompt"]}: </AlertTitle>
        <NavLink href={chatgptLink} isExternal>
          Pull Request <ExternalLinkIcon />
        </NavLink>
      </Alert>
      {samples.length > 0 && (
        <SimpleGrid columns={{ md: 4 }} spacing={4}>
          {samples.map((sample, index) => (
            <Card key={`sample-${index}`}>
              <CardHeader>
                <Heading size='md'>{sample.name}</Heading>
                <Text>{sample.author}</Text>
              </CardHeader>

              <CardBody maxH='320px' overflow='auto'>
                <Stack>
                  <SimpleMarkdown content={sample?.preview ? sample.preview : "no preview"} />
                </Stack>
              </CardBody>

              <CardFooter>
                <Flex w='90%' flexGrow={"column"} justifyContent='space-between'>
                  <Box>
                    <Link href={"/chatgpt-samples/" + sample.path.split(".")[0]}>
                      <Button>{dict["view-here"]}</Button>
                    </Link>
                  </Box>
                  <Box>
                    <ClickPromptButton text={sample.preview} />
                  </Box>
                </Flex>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </>
  );
}

export default ChatGptSamples;
