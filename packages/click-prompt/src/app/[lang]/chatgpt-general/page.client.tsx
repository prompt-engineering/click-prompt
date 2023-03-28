"use client";

import React from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { ClickPromptButton } from "@/components/ClickPromptButton";

import gptCategorySamples from "@/assets/chatgpt/category/index.json";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Link as NavLink,
  SimpleGrid,
} from "@/components/ChakraUI";
import SimpleMarkdown from "@/components/markdown/SimpleMarkdown";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { CP_GITHUB_ASSETS } from "@/configs/constants";
import styled from "@emotion/styled";
import { isLoggedIn, login, logout } from "@/api/user";
import {
  changeConversationName,
  createConversation,
  deleteAllConversations,
  deleteConversation,
} from "@/api/conversation";
import { getChatsByConversationId, sendMsgWithStreamRes } from "@/api/chat";

type GeneralCommand = {
  type: string;
  description: string;
  example: string;
  prompt: string;
  clickPrompt?: any;
};

type CategoryGpt = {
  name: {
    "zh-CN": string;
    "en-US": string;
  };
  category: string;
  samples: {
    name: string;
    ask: string;
    response: string;
  }[];
};

type ChatgptSpecific = { type: string; description: string; example: string; prompt: string }[];

const llmServiceApi: any = {
  login,
  logout,
  isLoggedIn,
  changeConversationName,
  createConversation,
  getChatsByConversationId,
  deleteConversation,
  deleteAllConversations,
  sendMsgWithStreamRes,
};

function ChatGptGeneral({ locale, i18n, chatgptSpecific }: { chatgptSpecific: ChatgptSpecific } & GeneralI18nProps) {
  const dict = i18n.dict;

  const chatgptLink = `${CP_GITHUB_ASSETS}/chatgpt/category`;
  const columnHelper = createColumnHelper<GeneralCommand>();

  const columns = [
    columnHelper.accessor("type", {
      cell: (info) => info.getValue(),
      header: dict["type"],
    }),
    columnHelper.accessor("example", {
      cell: (info) => info.getValue(),
      header: dict["example"],
    }),
    columnHelper.accessor("clickPrompt", {
      cell: (info) => {
        return info.row.original.prompt !== "" ? (
          <ClickPromptButton text={info.row.original.prompt} llmServiceApi={llmServiceApi} />
        ) : null;
      },
      header: "",
    }),
  ];

  return (
    <SimpleGrid columns={1} spacing={10}>
      <Heading as={"h3"}>{dict["common-scene"]}</Heading>
      {chatgptSpecific && <DataTable data={chatgptSpecific} columns={columns} />}
      <Alert status='info'>
        <AlertIcon />
        <AlertTitle>{dict["share-my-common-gpt-scene"]}</AlertTitle>
        <NavLink href={chatgptLink} isExternal>
          {dict["PR"]} <ExternalLinkIcon />
        </NavLink>
      </Alert>
      <Flex flexDirection={"column"} gap={4}>
        {gptCategorySamples.map((category: CategoryGpt, index: number) => {
          return (
            <Box key={`category-${index}`}>
              <Heading as={"h3"}>{category.name[locale]}</Heading>
              <StyleCardList>
                {category.samples.map((sample, sIndex: number) => {
                  return (
                    <StyledCard
                      boxShadow='md'
                      minW='320px'
                      key={`sample-${index}-${sIndex}`}
                      sx={{ breakInside: "avoid-column" }}
                    >
                      <CardHeader>
                        <Flex justifyContent={"space-between"} alignItems={"center"}>
                          <StyledTitle>{sample.name}</StyledTitle>
                          <ClickPromptButton text={sample.ask} size={"sm"} llmServiceApi={llmServiceApi} />
                        </Flex>
                      </CardHeader>
                      <StyledCardBody maxH='320px' overflow='auto'>
                        <Heading size={"md"}>Prompt</Heading>
                        <SimpleMarkdown content={sample.ask} />
                        <Heading size={"md"}>Result</Heading>
                        <SimpleMarkdown content={sample.response} />
                      </StyledCardBody>
                    </StyledCard>
                  );
                })}
              </StyleCardList>
            </Box>
          );
        })}
      </Flex>
    </SimpleGrid>
  );
}

const StyledTitle = styled.span`
  font-size: 1.4rem;
`;

const StyledCard = styled(Card)`
  margin: 8px;
`;

const StyledCardBody = styled(CardBody)`
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-track {
    background-color: darkgrey;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-image: linear-gradient(180deg, #d0368a 0%, #708ad4 99%);
    box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
    border-radius: 100px;
  }
`;

const StyleCardList = styled.div`
  height: 400px;
  max-height: 400px;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: row;

  scrollbar-color: #708ad4 darkgrey;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-track {
    background-color: darkgrey;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-image: linear-gradient(180deg, #d0368a 0%, #708ad4 99%);
    box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
    border-radius: 100px;
  }
`;

export default ChatGptGeneral;
