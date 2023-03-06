import React from "react";

import { Heading, SimpleGrid, Text, Link } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { DataTable } from "@/components/DataTable/DataTable";

import aiResource from "@/assets/resources/ai-resources.json";
import cnData from "@/assets/resources/reading-list-cn.json";
import enData from "@/assets/resources/reading-list-en.json";

type ReadingResource = {
  name: string;
  link: string;
  description: string;
};

const columnHelper = createColumnHelper<ReadingResource>();
const columns = [
  columnHelper.accessor("name", {
    cell: (info) => (
      <Link href={info.row.original.link} isExternal>
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
  return (
    <SimpleGrid columns={1} spacing={10}>
      <Text align={"center"}>
        创建 &nbsp;
        <a href={"https://github.com/prompt-engineering/click-prompt/tree/master/public/data"}>
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
