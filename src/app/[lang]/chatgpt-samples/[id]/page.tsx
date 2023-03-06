import React from "react";
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
  Flex,
  Heading,
  Link,
  Spacer,
  Tooltip,
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

export const generateStaticParams = async () => {
  const index = await import("@/assets/chatgpt/samples/index.json").then((mod) => mod.default);
  return index.map((item) => ({ id: item.path.split(".").slice(0, -1).join(".") }));
};

async function Sample({ params }: { params: { id: string } }) {
  const content: Sample = await import(`@/assets/chatgpt/samples/${params.id}.yml`).then((mod) => mod.default);

  if (!content) {
    notFound();
  }

  return (
    <>
      {content && (
        <>
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
          <Heading as='h4'>
            {content.name} by &nbsp;
            <Link href={content.homepage} isExternal>
              {/*{content.author} <ExternalLinkIcon />*/}
            </Link>
          </Heading>
          <Spacer />
          <Box>
            {content.steps.map((step, index) => (
              <>
                <HumanBlock>
                  <Avatar bg='teal.500' name='Phodal' size='sm' mr={2} />
                  <Flex flex='1'>
                    <Flex flexDirection='column'>
                      <SimpleMarkdown content={step.ask?.replaceAll("\n", "\n\n")} />
                    </Flex>
                    <ClickPromptButton size={"sm"} text={step.ask} />
                    <Box ml={2} mt={1} mr={2}>
                      <CopyComponent value={step.ask} />
                    </Box>
                    <Tooltip label='Open In ChatGPT'>
                      <Link href={"https://chat.openai.com/"} isExternal>
                        {/*<ExternalLinkIcon boxSize={22} />*/}
                      </Link>
                    </Tooltip>
                  </Flex>
                </HumanBlock>
                <AiBlock>
                  <Box>
                    <ChatGptIcon />
                  </Box>
                  <Box ml='2' flex='1'>
                    <SimpleMarkdown content={step.response?.replaceAll("\n", "\n\n")} />
                  </Box>
                </AiBlock>
              </>
            ))}
          </Box>
        </>
      )}
    </>
  );
}

export default Sample;
