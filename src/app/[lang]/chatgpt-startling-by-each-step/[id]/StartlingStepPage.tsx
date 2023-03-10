"use client";

import React from "react";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading, SimpleGrid } from "@/components/ChakraUI";
import StartlingStepDetail from "@/app/[lang]/chatgpt-startling-by-each-step/[id]/StartlingStepDetail";
import { StartlingStep } from "@/app/[lang]/chatgpt-startling-by-each-step/[id]/startling.type";

function StartlingStepPage({ content, id }: { content: StartlingStep; id: string }) {
  const [cachedValue, setCachedValue] = React.useState<Record<number, any>>({});

  const updateCached = (index: number, value: any) => {
    setCachedValue((prev) => ({ ...prev, [index]: value }));
    console.log(cachedValue);
  };

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
                  <BreadcrumbLink href={`/chatgpt-samples/${id}`}>{content.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>

            <Heading as='h4'>{content.name}</Heading>

            <SimpleGrid columns={1} spacing={4}>
              {content.steps.map((step, index) => (
                <StartlingStepDetail
                  step={step}
                  key={index}
                  content={content}
                  onCache={updateCached}
                  cachedValue={cachedValue}
                />
              ))}
            </SimpleGrid>
          </Flex>
        </>
      )}
    </>
  );
}

export default StartlingStepPage;
