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

function StartlingStepDetail({ step, content }: any) {
  const [response, setResponse] = React.useState<string | undefined>(undefined)

  const handleResponse = (response: ChatMessage) => {
    const messages = response.messages
    const assistantMessage = messages.filter((message) => message.role === 'assistant')
    setResponse(assistantMessage[0].content)
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

export default StartlingStepDetail
