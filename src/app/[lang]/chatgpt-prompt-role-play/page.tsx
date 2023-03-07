"use client";

import React, { useEffect, useState } from "react";
import { Heading, Input, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable/DataTable";
import { LinkIcon } from "@chakra-ui/icons";
import CopyComponent from "@/components/CopyComponent";
import Highlight from "@/components/Highlight";
import promptsEn from "@/assets/resources/prompts_en.json";
import promptsCn from "@/assets/resources/prompts_cn.json";

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

function ChatGptPromptList() {
  const [data, setData] = useState<Prompts>([]);
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    // read local json data
    let promptsConcat = promptsCn.concat(promptsEn);
    if (promptsConcat != undefined && promptsConcat.length > 0) {
      setData(promptsConcat as Prompts);
    } else {
      setData([]);
      throw new Error("parse csv error: " + promptsConcat.join(","));
    }
  }, []);

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
      {data && (
        <DataTable
          data={data.filter(
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
