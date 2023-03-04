import React from "react";
import { Heading, Input, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable/DataTable";
import { LinkIcon } from "@chakra-ui/icons";
import CopyComponent from "@/components/CopyComponent";
import parseCsv from "@/data-processor/CsvParser";

type ActPrompt = {
  act: string;
  prompt: string;
  icon: string;
};

const columnHelper = createColumnHelper<ActPrompt>();

const columns = [
  columnHelper.accessor("act", {
    cell: (info) => info.getValue(),
    header: "act",
  }),
  columnHelper.accessor("prompt", {
    cell: (info) => info.getValue(),
    header: "prompt",
  }),
  columnHelper.accessor("prompt", {
    id: "icon",
    cell: (info) => CopyComponent({ value: info.getValue() }),
    header: "copy",
  }),
];

function ChatGptPromptList() {
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    fetch("https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/main/prompts.csv")
      .then((response) => response.text())
      .then((csv) => {
        const parseResult = parseCsv(csv);
        setData(parseResult);
      });
  }, []);

  return (
    <div>
      <Heading></Heading>
      <Text>Todo: add JavaScript database to query in frontend</Text>
      <Input placeholder='Search' />
      <Text>
        base on:
        <a href={"https://github.com/f/awesome-chatgpt-prompts"}>
          awesome-chatgpt-prompts <LinkIcon />
        </a>
      </Text>
      {data && <DataTable data={data.data} columns={columns} />}
    </div>
  );
}

export default ChatGptPromptList;
