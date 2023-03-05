import React, { useEffect } from "react";
import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { DataTable } from "@/components/DataTable/DataTable";
import parseCsv from "@/data-processor/CsvParser";

type ReadingResource = {
  name: string;
  link: string;
  description: string;
};

const columnHelper = createColumnHelper<ReadingResource>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => (
      <Link href={info.row.original.link}>
        {info.getValue()} <ExternalLinkIcon />
      </Link>
    ),
    header: "name",
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
        创建 &nbsp;
        <a href={"https://github.com/prompt-engineering/prompt-generator/tree/master/public/data"}>
          Pull Request <ExternalLinkIcon />{" "}
        </a>{" "}
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
