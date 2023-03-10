"use client";

import React, { useEffect } from "react";
import { HumanBlock } from "@/app/[lang]/chatgpt-samples/components/HumanBlock";
import { Avatar, Box, Flex } from "@/components/ChakraUI";
import SimpleMarkdown from "@/components/SimpleMarkdown";
import CopyComponent from "@/components/CopyComponent";
import { ExecutePromptButton } from "@/components/ClickPromptButton";
import { AiBlock } from "@/app/[lang]/chatgpt-samples/components/AiBlock";
import { ChatGptIcon } from "@/components/CustomIcon";
import { ChatMessage } from "@/api/chat-api";
import { StartlingStep, StepDetail } from "@/app/[lang]/chatgpt-startling-by-each-step/[id]/startling.type";
import { Textarea } from "@chakra-ui/react";

type StepProps = {
  index: number;
  step: StepDetail;
  content: StartlingStep;
  cachedValue: Record<number, any>;
  onCache?: (step: number, response: string) => void;
};

// - name: 分析需求，编写用户故事
//   ask:  story: $$placeholder$$
//   cached-value-regex: /.*/
//   values:
//     placeholder: 用户通过主菜单进入“权限管理”模块，选择“账号管理”Tab页，可以看到“新增账号”按钮。
function fillStepWithValued(step: StepDetail, cachedValue: Record<number, any>): { replaced: boolean; ask: string } {
  const regex = new RegExp(/\$\$([a-zA-Z0-9_]+)\$\$/);
  let newValue = step.ask;
  let isChanged = false;
  // 2. find $$placeholder$$ in step.ask
  if (step.ask && step.values) {
    const matched = step.ask.match(regex);
    if (matched) {
      // 1. replace $$placeholder$$ with step.values.placeholder
      const placeholder = matched[1];
      const value = step.values[placeholder];
      if (value) {
        isChanged = true;
        newValue = step.ask.replace(regex, value);
      }
    }
  }

  // 3. find value in cachedValue, format: $$response:1$$
  if (step.ask && cachedValue) {
    const regex = new RegExp(/\$\$response:([0-9]+)\$\$/);
    const matched = step.ask.match(regex);
    if (matched) {
      const index = parseInt(matched[1]);
      const value = cachedValue[index];
      if (value) {
        isChanged = true;
        newValue = step.ask.replace(regex, value);
      }
    }
  }

  return { replaced: isChanged, ask: newValue };
}

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
  return <SimpleMarkdown content={step.ask?.replaceAll("\n", "\n\n")} />;
}

function StartlingStepDetail({ index, step, content, onCache, cachedValue }: StepProps) {
  const [response, setResponse] = React.useState<string | undefined>(undefined);

  const handleResponse = (response: ChatMessage) => {
    const messages = response.messages;
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
