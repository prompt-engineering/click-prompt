"use client";

import React from "react";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading, SimpleGrid } from "@/components/ChakraUI";
import StartlingStepDetail from "@/app/[lang]/chatgpt-flow/[id]/StartlingStepDetail";
import { StartlingStep } from "@/app/[lang]/chatgpt-flow/[id]/startling.type";
import StepExplain from "../../../../components/FlowExplain/StepExplain";

type StepPageProps = {
  content: StartlingStep;
  id: string;
  i18n: GeneralI18nProps;
};

function StartlingStepPage({ content, id, i18n }: StepPageProps) {
  const [conversationId, setConversationId] = React.useState<number | undefined>(undefined);
  const [cachedValue, setCachedValue] = React.useState<Record<number, any>>({});

  const dict = i18n.i18n.dict;

  const updateCached = (index: number, value: any) => {
    setCachedValue((prev) => ({ ...prev, [index]: value }));
  };

  const updateConversationId = (conversationId: number) => {
    setConversationId(conversationId);
  };

  return (
    <>
      {content && (
        <>
          <Flex direction='column' gap='4'>
            <Box>
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${i18n.locale}/chatgpt-flow/`}>{dict["by-each-step-samples"]}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${i18n.locale}/chatgpt-flow/${id}`}>{content.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>

            {content.explain && (
              <Box style={{ position: "relative", height: "320px" }}>
                <StepExplain step={content} />
              </Box>
            )}

            <Heading as='h4'>{content.name}</Heading>

            <SimpleGrid columns={1} spacing={4}>
              {content.steps.map((step, index) => (
                <StartlingStepDetail
                  index={index}
                  step={step}
                  key={index}
                  content={content}
                  onCache={updateCached}
                  cachedValue={cachedValue}
                  conversationId={conversationId}
                  updateConversationId={updateConversationId}
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
