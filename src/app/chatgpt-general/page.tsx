"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import parseCsv from "@/data-processor/CsvParser";
import { ClickPromptButton } from "@/components/ClickPromptButton";

import gptCategorySamples from "@/assets/chatgpt/category/index.json";
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
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/data/chatgpt-specific.csv")
      .then((response) => response.text())
      .then((csv) => {
        const parseResult = parseCsv(csv);

        setData(parseResult.data);
      })
      .then();
  }, []);

  const chatgptLink = `${CP_GITHUB_ASSETS}/chatgpt/category`;

  return (
    <div>
      {data && <DataTable data={data} columns={columns} />}
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
            <>
              <Heading as={"h2"}>{category.name["zh-cn"]}</Heading>
              <Box w='100%' maxH='400px' my='auto' sx={{ columnCount: [1, 2, 3, 4], columnGap: "8px" }}>
                <div key={`category-${index}`}>
                  {category.samples.map((sample, sIndex: number) => {
                    return (
                      <Card key={`sample-${index}-${sIndex}`} sx={{ breakInside: "avoid-column" }}>
                        <CardHeader>
                          <ClickPromptButton text={sample.ask} size={"sm"}>
                            {sample.name}
                          </ClickPromptButton>
                        </CardHeader>
                        <CardBody maxH='320px' overflow='auto'>
                          <Heading size={"md"}>Prompt</Heading>
                          <SimpleMarkdown content={sample.ask} />
                          <Heading size={"md"}>Result</Heading>
                          <SimpleMarkdown content={sample.response} />
                        </CardBody>
                      </Card>
                    );
                  })}
                </div>
              </Box>
            </>
          );
        })}
      </Flex>
    </div>
  );
}

export default ChatGptGeneral;
