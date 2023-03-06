import React from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import parseCsv from "@/data-processor/CsvParser";
import { ClickPromptButton } from "@/components/ClickPromptButton";

type GeneralCommand = {
  english: string;
  chinese: string;
  description: string;
  example: string;
  prompt?: string;
  clickPrompt?: any;
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
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    fetch("/data/chatgpt-specific.csv")
      .then((response) => response.text())
      .then((csv) => {
        const parseResult = parseCsv(csv);

        setData(parseResult.data);
      })
      .then();
  }, []);

  return <div>{data && <DataTable data={data} columns={columns} />}</div>;
}

export default ChatGptGeneral;
