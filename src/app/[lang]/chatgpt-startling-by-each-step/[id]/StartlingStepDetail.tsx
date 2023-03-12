"use client";

import React, { useEffect } from "react";
import { HumanBlock } from "@/app/[lang]/chatgpt-samples/components/HumanBlock";
import { Avatar, Box } from "@/components/ChakraUI";
import SimpleMarkdown from "@/components/SimpleMarkdown";
import { ExecutePromptButton } from "@/components/ClickPromptButton";
import { AiBlock } from "@/app/[lang]/chatgpt-samples/components/AiBlock";
import { ChatGptIcon } from "@/components/CustomIcon";
import { StartlingStep } from "@/app/[lang]/chatgpt-startling-by-each-step/[id]/startling.type";
import { Textarea } from "@chakra-ui/react";
import { fillStepWithValued, StepDetail } from "@/app/[lang]/chatgpt-startling-by-each-step/[id]/StepDetail";
import { ResponseSend } from "@/pages/api/chatgpt/chat";

type StepProps = {
  index: number;
  step: StepDetail;
  content: StartlingStep;
  cachedValue: Record<number, any>;
  onCache?: (step: number, response: string) => void;
};

type AskRendererProps = { step: StepDetail; onAskUpdate: (ask: string) => void; cachedValue: Record<number, any> };

function AskRenderer({ step, onAskUpdate, cachedValue }: AskRendererProps) {
  const askTask = fillStepWithValued(step, cachedValue);
  if (askTask.replaced) {
    return (
      <Textarea
        className='bg-white'
        h='calc(100%)'
        value={askTask.ask}
        onChange={(event) => {
          onAskUpdate(event.target.value);
        }}
      />
    );
  }

  onAskUpdate(askTask.ask);
  return <SimpleMarkdown content={step.ask} />;
}

function StartlingStepDetail({ index, step, content, onCache, cachedValue }: StepProps) {
  const [response, setResponse] = React.useState<string | undefined>(undefined);

  const handleResponse = (response: ResponseSend) => {
    const messages = response;
    const assistantMessage = messages.filter((message) => message.role === "assistant");
    const assistantResponse = assistantMessage[0].content;
    setResponse(assistantResponse);

    if (onCache && step.cachedResponseRegex) {
      if (step.cachedResponseRegex === ".*" || step.cachedResponseRegex === "(.*?)") {
        onCache(index, assistantResponse);
      } else {
        const regex = new RegExp(step.cachedResponseRegex);
        const matched = assistantResponse.match(regex);
        if (matched) {
          onCache(index, matched[1]);
        }
      }
    }
  };

  const [ask, setAsk] = React.useState<string>(step.ask);

  useEffect(() => {
    const askTask = fillStepWithValued(step, cachedValue);
    if (askTask.replaced) {
      setAsk(askTask.ask);
    }
  }, [cachedValue]);

  return (
    <>
      <HumanBlock direction='row' justify='space-between'>
        <Avatar bg='teal.500' name={content.author} size='sm' mr={2} />
        <Box w='100%' p={4} h='100%'>
          <AskRenderer step={step} onAskUpdate={setAsk} cachedValue={cachedValue} />
        </Box>
      </HumanBlock>
      <ExecutePromptButton text={ask} onResponse={handleResponse} />
      <AiBlock direction='row' gap='2'>
        <Box>
          <ChatGptIcon />
        </Box>
        {response && (
          <Box gap='2' ml='2' flex='1'>
            <SimpleMarkdown content={response} />
          </Box>
        )}
      </AiBlock>
    </>
  );
}

export default StartlingStepDetail;
