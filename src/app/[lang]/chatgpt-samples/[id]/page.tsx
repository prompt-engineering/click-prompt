import React, { Fragment } from "react";
import CopyComponent from "@/components/CopyComponent";
import SimpleMarkdown from "@/components/SimpleMarkdown";
import { ChatGptIcon } from "@/components/CustomIcon";
import { ClickPromptButton } from "@/components/ClickPromptButton";
import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  SimpleGrid,
  Flex,
} from "@/components/ChakraUI";
import { notFound } from "next/navigation";
import { AiBlock } from "@/app/[lang]/chatgpt-samples/components/AiBlock";
import { HumanBlock } from "@/app/[lang]/chatgpt-samples/components/HumanBlock";

interface Sample {
  name: string;
  description: string;
  category: string;
  author: string;
  homepage: string;
  preview: string;
  steps: {
    ask: string;
    response: string;
  }[];
}

const getSampleNames = async () => {
  const index = await import("@/assets/chatgpt/samples/index.json").then((mod) => mod.default);
  return index.map((item) => item.path.split(".").slice(0, -1).join("."));
};

async function Sample({ params }: { params: { id: string } }) {
  const names = await getSampleNames();
  if (!names.includes(params.id)) {
    notFound();
  }

  const content: Sample = await import(`@/assets/chatgpt/samples/${params.id}.yml`).then((mod) => mod.default);

  if (!content) {
    notFound();
  }

  return (
    <>
      {content && (
        <>
          <Flex direction='column' gap='4'>
            <Box>
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/chatgpt-samples'>ChatGPT 示例</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/chatgpt-samples/${params.id}`}>{content.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>

            <Heading as='h4'>{content.name}</Heading>

            <SimpleGrid columns={1} spacing={4}>
              {content.steps.map((step, index) => (
                <Fragment key={index}>
                  <HumanBlock direction='row' justify='space-between'>
                    <Flex direction='row' gap='2'>
                      <Avatar bg='teaååål.500' name='Phodal' size='sm' mr={2} />
                      <Box>
                        <SimpleMarkdown content={step.ask?.replaceAll("\n", "\n\n")} />
                      </Box>
                    </Flex>
                    <Flex direction='row' gap='2'>
                      <CopyComponent value={step.ask} />
                      <ClickPromptButton size={"sm"} text={step.ask} />
                    </Flex>
                  </HumanBlock>
                  <AiBlock direction='row' gap='2'>
                    <Box>
                      <ChatGptIcon />
                    </Box>
                    <Box gap='2' ml='2' flex='1'>
                      <Box>
                        <SimpleMarkdown content={step.response?.replaceAll("\n", "\n\n")} />
                      </Box>
                    </Box>
                  </AiBlock>
                </Fragment>
              ))}
            </SimpleGrid>
          </Flex>
        </>
      )}
    </>
  );
}

export default Sample;
