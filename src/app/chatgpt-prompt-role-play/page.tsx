"use client";

import React, { useEffect, useState } from "react";
import { Heading, Input, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable/DataTable";
import { LinkIcon } from "@chakra-ui/icons";
import CopyComponent from "@/components/CopyComponent";
import Highlight from "@/components/Highlight";

type ActPrompt = {
  act: string;
  prompt: string;
  icon: string;
};

const columnHelper = createColumnHelper<ActPrompt>();

const genColumns = (highlight: string) => [
  columnHelper.accessor("act", {
    cell: (info) => <Highlight value={info.getValue()} keyword={highlight} />,
    header: "act",
  }),
  columnHelper.accessor("prompt", {
    cell: (info) => <Highlight value={info.getValue()} keyword={highlight} />,
    header: "prompt",
  }),
  columnHelper.accessor("prompt", {
    id: "icon",
    cell: (info) => CopyComponent({ value: info.getValue() }),
    header: "copy",
  }),
];

type Prompts = { act: string; prompt: string }[];

import { SupportedLocales } from "@/i18n";

export const generateStaticParams = async () => {
  return SupportedLocales.map(async (language) => ({
    prompts: await import(`@/assets/resources/prompts_${language}.json`).then((mod) => mod.default),
    lang: language,
  }));
};

async function ChatGptPromptList({ prompts }: { prompts: Prompts }) {
  console.log(prompts);
  // const dictionary = await getDictionary(headers());
  const [search, setSearch] = useState<string>("");

  return (
    <div>
      <Heading></Heading>
      <Input placeholder='Search' value={search} onChange={(ev) => setSearch(ev.target.value)} />
      <Text>
        base on:
        <a href={"https://github.com/f/awesome-chatgpt-prompts"}>
          awesome-chatgpt-prompts <LinkIcon />
        </a>
        <a href={"https://github.com/PlexPt/awesome-chatgpt-prompts-zh"}>
          awesome-chatgpt-prompts-zh <LinkIcon />
        </a>
      </Text>
      {prompts && (
        <DataTable
          data={prompts.filter(
            (it) =>
              (it.act != undefined && it.act.includes(search)) ||
              (it.prompt != undefined && it.prompt.includes(search)),
          )}
          columns={genColumns(search) as any}
        />
      )}
    </div>
  );
}

export default ChatGptPromptList;
