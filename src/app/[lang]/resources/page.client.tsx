"use client";

import React from "react";

import { Alert, AlertIcon, AlertTitle, Heading, Link, SimpleGrid } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { DataTable } from "@/components/DataTable/DataTable";

import aiResource from "@/assets/resources/ai-resources.json";
import cnData from "@/assets/resources/reading-list_zh-CN.json";
import enData from "@/assets/resources/reading-list_en-US.json";
import { GITHUB_URL } from "@/configs/constants";

type ReadingResource = {
  name: string;
  link: string;
  description: string;
};

function ReadingList({ locale, i18n }: GeneralI18nProps) {
  const dict = i18n.dict;

  const columnHelper = createColumnHelper<ReadingResource>();
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => (
        <Link href={info.row.original.link} isExternal>
          {info.getValue()} <ExternalLinkIcon />
        </Link>
      ),
      header: dict["name"],
    }),
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: dict["description"],
    }),
  ];
  return (
    <SimpleGrid columns={1} spacing={10}>
      <Alert status='info'>
        <AlertIcon />
        <AlertTitle>{dict["share-my-common-gpt-scene"]}</AlertTitle>
        <Link href={`${GITHUB_URL}/tree/master/public/data`} isExternal>
          {dict["PR"]} <ExternalLinkIcon />
        </Link>
      </Alert>
      <Heading as='h3'>{dict["AI-Resources"]}</Heading>
      {aiResource && <DataTable data={aiResource} columns={columns} />}
      <Heading as='h3'>中文</Heading>
      {cnData && <DataTable data={cnData} columns={columns} />}
      <Heading as='h3'>English</Heading>
      {enData && <DataTable data={enData} columns={columns} />}
    </SimpleGrid>
  );
}

export default ReadingList;
