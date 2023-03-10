'use client'

import React from 'react'
import { HumanBlock } from '@/app/[lang]/chatgpt-samples/components/HumanBlock'
import { Avatar, Box, Flex } from '@/components/ChakraUI'
import SimpleMarkdown from '@/components/SimpleMarkdown'
import CopyComponent from '@/components/CopyComponent'
import { ExecutePromptButton } from '@/components/ClickPromptButton'
import { AiBlock } from '@/app/[lang]/chatgpt-samples/components/AiBlock'
import { ChatGptIcon } from '@/components/CustomIcon'
import { ChatMessage } from '@/api/chat-api'
import { StartlingStep, StepDetail } from '@/app/[lang]/chatgpt-startling-by-each-step/[id]/startling.type'

type StepProps = {
  key: number
  step: StepDetail,
  content: StartlingStep,
  cachedValue: Record<number, any>,
  onCache?: (step: number, response: string) => void
}

function StartlingStepDetail({ key, step, content, onCache }: StepProps) {
  const [response, setResponse] = React.useState<string | undefined>(undefined)

  const handleResponse = (response: ChatMessage) => {
    const messages = response.messages
    const assistantMessage = messages.filter((message) => message.role === 'assistant')
    setResponse(assistantMessage[0].content)

    if (onCache && step.cachedResponseRegex) {
      const regex = new RegExp(step.cachedResponseRegex)
      const matched = assistantMessage[0].content.match(regex)
      if (matched) {
        onCache(key, matched[1])
      }
    }
  }

  return (
    <>
      <HumanBlock direction='row' justify='space-between'>
        <Flex direction='row' gap='2'>
          <Avatar bg='teal.500' name={ content.author } size='sm' mr={ 2 } />
          <Box>
            <SimpleMarkdown content={ step.ask?.replaceAll('\n', '\n\n') } />
          </Box>
        </Flex>
        <Flex direction='row' gap='2'>
          <CopyComponent value={ step.ask } />
        </Flex>
      </HumanBlock>
      <ExecutePromptButton text={ step.ask } onResponse={ handleResponse } />
      <AiBlock direction='row' gap='2'>
        <Box>
          <ChatGptIcon />
        </Box>
        { response && <Box gap='2' ml='2' flex='1'>
          <SimpleMarkdown content={ response } />
        </Box> }
      </AiBlock>
    </>
  )
}

export default StartlingStepDetail;
