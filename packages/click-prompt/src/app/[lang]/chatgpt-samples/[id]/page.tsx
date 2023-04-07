import React, { Fragment } from "react";
import CopyComponent from "@/components/CopyComponent";
import SimpleMarkdown from "@/components/markdown/SimpleMarkdown";
import { ChatGptIcon } from "@/components/CustomIcon";
import { ClickPromptButton } from "@/components/ClickPromptButton";
import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  SimpleGrid,
} from "@/components/ChakraUI";
import { notFound } from "next/navigation";
import { AiBlock } from "@/components/chatgpt/AiBlock";
import { HumanBlock } from "@/components/chatgpt/HumanBlock";
import { getAppData } from "@/i18n";
import type { Sample, SampleDetail } from "../type";
import { llmServiceApiWithStream } from "@/api/llmService";

const getSampleNames = async (locale: GeneralI18nProps["locale"]) => {
  const index = await import(`@/assets/chatgpt/samples/index_${locale}.json`).then((mod) => mod.default);
  return index.map((item: Sample) => item.path.split(".").slice(0, -1).join("."));
};

async function ChatGptSampleDetail({ params }: { params: { id: string } }) {
  const { locale, pathname, i18n } = await getAppData();
  const i18nProps: GeneralI18nProps = {
    locale,
    pathname,
    i18n: {
      dict: i18n.dict,
    },
  };
  const dict = i18nProps.i18n.dict;

  const names = await getSampleNames(locale);
  if (!names.includes(params.id)) {
    notFound();
  }

  const content: SampleDetail = await import(`@/assets/chatgpt/samples/${params.id}.yml`).then((mod) => mod.default);

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
                  <BreadcrumbLink href='/chatgpt-samples'>{dict["chatgpt-samples"]}</BreadcrumbLink>
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
                      <Avatar bg='teal.500' name='Phodal' size='sm' mr={2} />
                      <Box>
                        <SimpleMarkdown content={step.ask} />
                      </Box>
                    </Flex>
                    <Flex direction='row' gap='2'>
                      <CopyComponent value={step.ask} />
                      <ClickPromptButton size={"sm"} text={step.ask} llmServiceApi={llmServiceApiWithStream} />
                    </Flex>
                  </HumanBlock>
                  <AiBlock direction='row' gap='2'>
                    <Box>
                      <ChatGptIcon />
                    </Box>
                    <Box gap='2' ml='2' flex='1'>
                      <Box>
                        <SimpleMarkdown content={step.response} />
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

export default ChatGptSampleDetail;
