"use client";

import React from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { ClickPromptButton } from "@/components/ClickPromptButton";

import gptCategorySamples from "@/assets/chatgpt/category/index.json";
import chatgptSpecific from "@/assets/resources/chatgpt-specific.json";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Box,
  AlertIcon,
  AlertTitle,
  Alert,
  Link as NavLink,
} from "@chakra-ui/react";
import SimpleMarkdown from "@/components/SimpleMarkdown";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { CP_GITHUB_ASSETS } from "@/configs/const";
import styled from "@emotion/styled";

type GeneralCommand = {
  english: string;
  chinese: string;
  description: string;
  example: string;
  prompt?: string;
  clickPrompt?: any;
};

// ```yml
// name:
//   zh-cn: 编程
//   en-us: Programming
// category: Programming
// samples:
//   - name: name
//     ask: string
//     response: string
// ```
type CategoryGpt = {
  name: {
    "zh-cn": string;
    "en-us": string;
  };
  category: string;
  samples: {
    name: string;
    ask: string;
    response: string;
  }[];
};

const columnHelper = createColumnHelper<GeneralCommand>();

const columns = [
  columnHelper.accessor("chinese", {
    cell: (info) => info.getValue(),
    header: "中文",
  }),
  columnHelper.accessor("example", {
    cell: (info) => info.getValue(),
    header: "示例",
  }),
  columnHelper.accessor("clickPrompt", {
    cell: (info) => {
      return info.row.original.prompt !== "" ? <ClickPromptButton text={info.row.original.prompt} /> : null;
    },
    header: "",
  }),
];

function ChatGptGeneral() {
  const chatgptLink = `${CP_GITHUB_ASSETS}/chatgpt/category`;

  return (
    <div>
      {chatgptSpecific && <DataTable data={chatgptSpecific} columns={columns} />}
      <Alert status='info'>
        <AlertIcon />
        <AlertTitle>分享我的 ChatGPT 场景：</AlertTitle>
        <NavLink href={chatgptLink} isExternal>
          Pull Request <ExternalLinkIcon />
        </NavLink>
      </Alert>
      <Flex flexDirection={"column"} gap={4}>
        {gptCategorySamples.map((category: CategoryGpt, index: number) => {
          return (
            <Box key={`category-${index}`}>
              <Heading as={"h2"}>{category.name["zh-cn"]}</Heading>
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
                        <ClickPromptButton text={sample.ask} size={"sm"}>
                          {sample.name}
                        </ClickPromptButton>
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
    </div>
  );
}

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
