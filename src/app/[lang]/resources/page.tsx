"use client";

import React from "react";

import { Alert, AlertIcon, AlertTitle, Heading, Link, SimpleGrid } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { DataTable } from "@/components/DataTable/DataTable";

import aiResource from "@/assets/resources/ai-resources.json";
import cnData from "@/assets/resources/reading-list_zh-CN.json";
import enData from "@/assets/resources/reading-list_en-US.json";
import { GITHUB_URL } from "@/configs/const";

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
      <Alert status='info'>
        <AlertIcon />
        <AlertTitle>
          创建 &nbsp;
          <Link href={`${GITHUB_URL}/tree/master/public/data`} isExternal>
            Pull Request <ExternalLinkIcon />
          </Link>{" "}
          &nbsp; ，添加更多的阅读材料
        </AlertTitle>
      </Alert>

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
