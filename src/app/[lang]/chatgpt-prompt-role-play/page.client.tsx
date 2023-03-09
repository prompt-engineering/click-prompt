"use client";

import { useState } from "react";
import { Heading, Input, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable/DataTable";
import { LinkIcon } from "@chakra-ui/icons";
import CopyComponent from "@/components/CopyComponent";
import Highlight from "@/components/Highlight";
import { ClickPromptButton } from "@/components/ClickPromptButton";

type ActPrompt = {
  act: string;
  prompt: string;
  icon: string;
  clickPrompt?: any;
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
  columnHelper.accessor("clickPrompt", {
    cell: (info) => {
      return info.row.original.prompt !== "" ? <ClickPromptButton text={info.row.original.prompt} /> : null;
    },
    header: "",
  }),
];

type Prompts = { act: string; prompt: string }[];

function ChatGptPromptList({ prompts, i18n }: { prompts: Prompts } & GeneralI18nProps) {
  const dict = i18n.dict;
  const [search, setSearch] = useState<string>("");
  console.log("xxx", dict);

  return (
    <div>
      <Heading></Heading>
      <Input placeholder={dict["Search"]} value={search} onChange={(ev) => setSearch(ev.target.value)} />
      <Text>
        {dict["base-on"]}:
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
