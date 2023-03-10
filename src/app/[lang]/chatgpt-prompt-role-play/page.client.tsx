"use client";

import { useState, useRef } from "react";
import { Heading, Input, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable/DataTable";
import { LinkIcon } from "@chakra-ui/icons";
import CopyComponent from "@/components/CopyComponent";
import Highlight from "@/components/Highlight";
import { ClickPromptButton } from "@/components/ClickPromptButton";
import { Pagination, usePagination, type PaginationState } from "@/components/Pagination";

type ActPrompt = {
  act: string;
  prompt: string;
  icon: string;
  clickPrompt?: any;
};

const columnHelper = createColumnHelper<ActPrompt>();

const genColumns = (dict: Record<string, string>, highlight: string) => [
  columnHelper.accessor("act", {
    cell: (info) => <Highlight value={info.getValue()} keyword={highlight} />,
    header: dict["act"],
  }),
  columnHelper.accessor("prompt", {
    cell: (info) => <Highlight value={info.getValue()} keyword={highlight} />,
    header: dict["prompt"],
  }),
  columnHelper.accessor("prompt", {
    id: "icon",
    cell: (info) => CopyComponent({ value: info.getValue() }),
    header: dict["copy"],
  }),
  columnHelper.accessor("clickPrompt", {
    cell: (info) => {
      return info.row.original.prompt !== "" ? <ClickPromptButton text={info.row.original.prompt} /> : null;
    },
    header: "",
  }),
];
type Prompt = { act: string; prompt: string };
type Prompts = Prompt[];

function ChatGptPromptList({ prompts, i18n }: { prompts: Prompts } & GeneralI18nProps) {
  const dict = i18n.dict;
  const [search, setSearch] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null)
  const defaultPage = {
    pageIndex: 1,
    pageSize: 20,
  }
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>(defaultPage);
  const [data, setData] = useState<Prompts>(prompts)
  const total = data.length
  const paginationState = usePagination<Prompt>({
    total,
    page: pageIndex,
    items: data,
    itemsPerPage: pageSize,
    siblingsCount: 2
  });
  const handleScroll = (ref: HTMLInputElement) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  function doSearch(val: string) {
    setSearch(val)

    setPagination(defaultPage)
    if (!!val) {
      setData(prompts.filter(
        (it) =>
          (it.act != undefined && it.act.includes(val)) ||
          (it.prompt != undefined && it.prompt.includes(val)),
      ))
    } else {
      setData(prompts)
    }
  }

  return (
    <div>
      <Heading></Heading>
      <Input ref={searchRef} placeholder={dict["Search"]} value={search} onChange={(ev) => {
        doSearch(ev.target.value)
      }} />
      <Text>
        {dict["base-on"]}:
        <a href={"https://github.com/f/awesome-chatgpt-prompts"}>
          awesome-chatgpt-prompts <LinkIcon />
        </a>
        <a href={"https://github.com/PlexPt/awesome-chatgpt-prompts-zh"}>
          awesome-chatgpt-prompts-zh <LinkIcon />
        </a>
      </Text>
      {paginationState.pageItems && <>
        <DataTable
          data={paginationState.pageItems}
          columns={genColumns(dict, search) as any}
        />
        <Pagination
          {...paginationState}
          colorScheme="twitter"
          onPageChange={page => {
            setPagination({
              pageIndex: page,
              pageSize
            })
            if (searchRef.current) {
              handleScroll(searchRef.current)
            }
          }}
        />
      </>}
    </div>
  );
}

export default ChatGptPromptList;
