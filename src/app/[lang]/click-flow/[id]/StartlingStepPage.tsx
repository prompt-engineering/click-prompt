"use client";

import React, { useEffect } from "react";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading, SimpleGrid } from "@/components/ChakraUI";
import StartlingStepDetail from "@/app/[lang]/click-flow/[id]/StartlingStepDetail";
import { StartlingFlow } from "@/flows/types/click-flow";
import FlowExplain from "../../../../flows/explain/FlowExplain";

type StepPageProps = {
  flow: StartlingFlow;
  id: string;
  i18n: GeneralI18nProps;
};

function StartlingStepPage({ flow, id, i18n }: StepPageProps) {
  const [conversationId, setConversationId] = React.useState<number | undefined>(undefined);
  const [cachedValue, setCachedValue] = React.useState<Record<number, any>>({});

  const [currentStep, setCurrentStep] = React.useState<number>(0);

  const bottomAnchor = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    let counter = 0;
    const id = setInterval(() => {
      if (bottomAnchor.current) {
        bottomAnchor.current.scrollIntoView({ behavior: "auto" });
      }

      counter++;
      // animation delay 500ms
      if (counter > 5) {
        clearInterval(id);
      }
    }, 100);

    return () => {
      clearInterval(id);
    };
  }, [currentStep]);

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
                  <BreadcrumbLink href={`/${i18n.locale}/click-flow/`}>{dict["by-each-step-samples"]}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${i18n.locale}/click-flow/${id}`}>{flow.name}</BreadcrumbLink>
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
              {flow.steps.map(
                (step, index) =>
                  (index <= currentStep || !flow.stepGuide) /** show all if stepGuide is falsey */ && (
                    <StartlingStepDetail
                      index={index}
                      flow={flow}
                      step={step}
                      key={index}
                      onCache={updateCached}
                      cachedValue={cachedValue}
                      conversationId={conversationId}
                      updateConversationId={updateConversationId}
                      onStepComplete={(index) => setCurrentStep(index + 1)}
                    />
                  ),
              )}

              <div ref={bottomAnchor}></div>
            </SimpleGrid>
          </Flex>
        </>
      )}
    </>
  );
}

export default StartlingStepPage;
