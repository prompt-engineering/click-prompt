import React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  SimpleGrid,
  Flex,
} from "@/components/ChakraUI";
import { notFound } from "next/navigation";
import StartlingStepDetail from "./StartlingStepDetail";

interface StartlingStep {
  name: string;
  category: string;
  author: string;
  description: string;
  steps: {
    name: string;
    ask: string;
    response?: string;
    cachedResponseRegex: string;
    values: Record<string, string>;
  }[];
}

const getSampleNames = async () => {
  const index = await import("@/assets/chatgpt/by-steps/index.json").then((mod) => mod.default);
  return index.map((item) => item.path.split(".").slice(0, -1).join("."));
};

async function StartlingByEachStepDetail({ params }: { params: { id: string } }) {
  const names = await getSampleNames();
  if (!names.includes(params.id)) {
    notFound();
  }

  const content: StartlingStep = await import(`@/assets/chatgpt/by-steps/${params.id}.yml`).then((mod) => mod.default);

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
                <StartlingStepDetail step={step} key={index} content={content} />
              ))}
            </SimpleGrid>
          </Flex>
        </>
      )}
    </>
  );
}

export default StartlingByEachStepDetail;
