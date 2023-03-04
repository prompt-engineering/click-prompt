import React, { useEffect } from "react";
import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable/DataTable";
import parseCsv from "@/data-processor/CsvParser";
import { ExternalLinkIcon } from "@chakra-ui/icons";

type ReadingResource = {
  name: string;
  link: string;
  description: string;
};

const columnHelper = createColumnHelper<ReadingResource>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => `《${info.getValue()}》`,
    header: "name",
  }),
  columnHelper.accessor("link", {
    cell: (info) => info.getValue(),
    header: "link",
  }),
  columnHelper.accessor("description", {
    cell: (info) => info.getValue(),
    header: "description",
  }),
];

function ReadingList() {
  const [cnData, setCnData] = React.useState<any>(null);
  const [enData, setEnData] = React.useState<any>(null);
  const [aiResource, setAiResource] = React.useState<any>(null);

  useEffect(() => {
    fetch("/data/reading-list-cn.csv")
      .then((response) => response.text())
      .then((csv) => {
        const parseResult = parseCsv(csv);
        setCnData(parseResult.data);
      });
  }, []);

  useEffect(() => {
    fetch("/data/reading-list-en.csv")
      .then((response) => response.text())
      .then((csv) => {
        const parseResult = parseCsv(csv);
        setEnData(parseResult.data);
      });
  }, []);

  React.useEffect(() => {
    fetch("/data/ai-resources.csv")
      .then((response) => response.text())
      .then((csv) => {
        const parseResult = parseCsv(csv);
        setAiResource(parseResult.data);
      });
  }, []);

  return (
    <SimpleGrid columns={1} spacing={10}>
      <Text align={"center"}>
        创建 <a href={"https://github.com/prompt-engineering/prompt-generator/tree/master/public/data"}>Pull Request</a>{" "}
        <ExternalLinkIcon />
        ，添加更多的阅读材料
      </Text>
      <Heading as='h3'>AI Resources</Heading>
      {aiResource && <DataTable data={aiResource} columns={columns} />}
      <Heading as='h3'>中文</Heading>
      {cnData && <DataTable data={cnData} columns={columns} />}
      <Heading as='h3'>English</Heading>
      {enData && <DataTable data={enData} columns={columns} />}
    </SimpleGrid>
  );
}

export default ReadingList;
