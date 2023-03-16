"use client";

import React from "react";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading, SimpleGrid } from "@/components/ChakraUI";
import StartlingStepDetail from "@/app/[lang]/chatgpt-flow/[id]/StartlingStepDetail";
import { StartlingFlow } from "@/app/[lang]/chatgpt-flow/[id]/startling.type";
import FlowExplain from "../../../../components/FlowExplain/FlowExplain";

type StepPageProps = {
  flow: StartlingFlow;
  id: string;
  i18n: GeneralI18nProps;
};

function StartlingStepPage({ flow, id, i18n }: StepPageProps) {
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
      {flow && (
        <>
          <Flex direction='column' gap='4'>
            <Box>
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${i18n.locale}/chatgpt-flow/`}>{dict["by-each-step-samples"]}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${i18n.locale}/chatgpt-flow/${id}`}>{flow.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>

            {flow.explain && (
              <Box style={{ position: "relative", height: "320px" }}>
                <FlowExplain step={flow} />
              </Box>
            )}

            <Heading as='h4'>{flow.name}</Heading>

            <SimpleGrid columns={1} spacing={4}>
              {flow.steps.map((step, index) => (
                <StartlingStepDetail
                  index={index}
                  flow={flow}
                  step={step}
                  key={index}
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
