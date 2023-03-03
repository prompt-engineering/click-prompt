import React from "react";
import { Heading, Text } from "@chakra-ui/react";
import Papa from "papaparse";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable/DataTable";
import { LinkIcon } from "@chakra-ui/icons";
import { DefaultPapaConfig } from "@/DefaultPapaConfig";

type ActPrompt = {
  act: string;
  prompt: string;
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
];

function ChatGptPromptList() {
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/main/prompts.csv",
    )
      .then((response) => response.text())
      .then((csv) => {
        const parseResult = Papa.parse(csv, DefaultPapaConfig);

        setData(parseResult);
      });
  }, []);

  return (
    <div>
      <Heading></Heading>
      <Text>
        base on:{" "}
        <a href={"https://github.com/f/awesome-chatgpt-prompts"}>
          {" "}
          <LinkIcon />
          https://github.com/f/awesome-chatgpt-prompts
        </a>{" "}
      </Text>
      {data && <DataTable data={data.data} columns={columns} />}
    </div>
  );
}

export default ChatGptPromptList;
