import React from "react";
import { Heading, Input, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable/DataTable";
import { LinkIcon } from "@chakra-ui/icons";
import CopyComponent from "@/components/CopyComponent";
import parseCsv from "@/data-processor/CsvParser";
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

function ChatGptPromptList() {
  const [data, setData] = React.useState<Prompts>([]);
  const [search, setSearch] = React.useState<string>("");

  React.useEffect(() => {
    fetch("https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/main/prompts.csv")
      .then((response) => response.text())
      .then((csv) => {
        const parseResult = parseCsv(csv);

        if (parseResult.errors.length === 0) {
          setData(parseResult.data as Prompts);
        } else {
          setData([]);
          throw new Error("parse csv error: " + parseResult.errors.join(","));
        }
      });
  }, []);

  return (
    <div>
      <Heading></Heading>
      <Text>Todo: add JavaScript database to query in frontend</Text>
      <Input placeholder='Search' value={search} onChange={(ev) => setSearch(ev.target.value)} />
      <Text>
        base on:
        <a href={"https://github.com/f/awesome-chatgpt-prompts"}>
          awesome-chatgpt-prompts <LinkIcon />
        </a>
      </Text>
      {data && (
        <DataTable
          data={data.filter((it) => it.act.includes(search) || it.prompt.includes(search))}
          columns={genColumns(search) as any}
        />
      )}
    </div>
  );
}

export default ChatGptPromptList;
