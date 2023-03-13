"use client";

import React, { useEffect } from "react";
import { Textarea } from "@chakra-ui/react";

import { HumanBlock } from "@/app/[lang]/chatgpt-samples/components/HumanBlock";
import { Avatar, Box, Text } from "@/components/ChakraUI";
import SimpleMarkdown from "@/components/SimpleMarkdown";
import { AiBlock } from "@/app/[lang]/chatgpt-samples/components/AiBlock";
import { ChatGptIcon } from "@/components/CustomIcon";
import { StartlingStep } from "@/app/[lang]/chatgpt-startling-by-each-step/[id]/startling.type";
import { fillStepWithValued, StepDetail } from "@/app/[lang]/chatgpt-startling-by-each-step/[id]/StepDetail";
import { ResponseSend } from "@/pages/api/chatgpt/chat";
import ExecutePromptButton from "@/components/ClickPrompt/ExecutePromptButton";

type StepProps = {
  index: number;
  step: StepDetail;
  content: StartlingStep;
  cachedValue: Record<number, any>;
  onCache?: (step: number, response: string) => void;
  conversationId?: number;
  updateConversationId?: (conversationId: number) => void;
};

type AskRendererProps = { step: StepDetail; onAskUpdate: (ask: string) => void; cachedValue: Record<number, any> };

function AskRenderer({ step, onAskUpdate, cachedValue }: AskRendererProps) {
  const askTask = fillStepWithValued(step, cachedValue);
  const [value, setValue] = React.useState<string>(askTask.ask);

  useEffect(() => {
    setValue(askTask.ask);
    onAskUpdate(askTask.ask);
  }, [askTask.ask, setValue]);

  if (askTask.replaced) {
    return (
      <Textarea
        className='bg-white'
        h='calc(100%)'
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          onAskUpdate(event.target.value);
        }}
      />
    );
  }

  return <SimpleMarkdown content={step.ask} />;
}

function StartlingStepDetail({
  index,
  step,
  content,
  onCache,
  cachedValue,
  conversationId,
  updateConversationId,
}: StepProps) {
  const [response, setResponse] = React.useState<string | undefined>(undefined);

  const handleResponse = (response: ResponseSend) => {
    const assistantMessage = response.filter((message) => message.role === "assistant");
    const assistantResponse = assistantMessage[0].content;
    setResponse(assistantResponse);

    if (!onCache || !step.cachedResponseRegex) {
      return;
    }

    // todo: check why regex not working well?
    const isMatchAll = step.cachedResponseRegex === ".*" || step.cachedResponseRegex === "(.*?)";
    if (isMatchAll) {
      onCache(index, assistantResponse);
    } else {
      const regex = new RegExp(step.cachedResponseRegex);
      const matched = assistantResponse.match(regex);
      if (matched) {
        onCache(index, matched[1]);
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
      <ExecutePromptButton
        text={ask}
        name={content.name}
        handleResponse={handleResponse}
        conversationId={conversationId}
        updateConversationId={updateConversationId}
      />
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
