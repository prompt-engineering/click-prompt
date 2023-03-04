import React, { useEffect } from "react";
import { Grid, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import Papa from "papaparse";
import { DataTable } from "@/components/DataTable/DataTable";
import { DefaultPapaConfig } from "@/DefaultPapaConfig";

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
        const parseResult = Papa.parse(csv, DefaultPapaConfig);

        console.log(parseResult.data);
        setCnData(parseResult.data);
      });
  }, []);

  useEffect(() => {
    fetch("/data/reading-list-en.csv")
      .then((response) => response.text())
      .then((csv) => {
        const parseResult = Papa.parse(csv, DefaultPapaConfig);

        console.log(parseResult.data);
        setEnData(parseResult.data);
      });
  }, []);

  React.useEffect(() => {
    fetch("/data/ai-resources.csv")
      .then((response) => response.text())
      .then((csv) => {
        const parseResult = Papa.parse(csv, DefaultPapaConfig);
        setAiResource(parseResult.data);
      });
  }, []);

  return (
    <SimpleGrid columns={1} spacing={10}>
      <Text align={"center"}>欢迎 Pull Request，添加更多的阅读材料</Text>
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
