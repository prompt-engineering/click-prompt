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
import { Textarea } from '@chakra-ui/react'

type StepProps = {
  key: number
  step: StepDetail,
  content: StartlingStep,
  cachedValue: Record<number, any>,
  onCache?: (step: number, response: string) => void
}

// - name: 分析需求，编写用户故事
//   ask:  story: $$placeholder$$
//   cached-value-regex: /.*/
//   values:
//     placeholder: 用户通过主菜单进入“权限管理”模块，选择“账号管理”Tab页，可以看到“新增账号”按钮。
function buildNewAsk(step: StepDetail): { replaced: boolean, ask: string } {
  // 1. find $$placeholder$$ in step.ask
  if (step.ask && step.values) {
    const regex = new RegExp(/\$\$([a-zA-Z0-9_]+)\$\$/)
    const matched = step.ask.match(regex)
    if (matched) {
      // 2. replace $$placeholder$$ with step.values.placeholder
      const placeholder = matched[1]
      const value = step.values[placeholder]
      if (value) {
        return { replaced: true, ask: step.ask.replace(regex, value) }
      }

    }
  }

  return { replaced: false, ask: step.ask }
}

function RenderTemplateQuestion({ step, onAskUpdate }: { step: StepDetail, onAskUpdate: (ask: string) => void }) {
  const askTask = buildNewAsk(step)
  if (askTask.replaced) {
    return <Textarea
      size={ 'md' }
      value={ askTask.ask }
      onChange={
        (event) => {
          onAskUpdate(event.target.value)
        }
      } />
  }

  return <SimpleMarkdown content={ step.ask?.replaceAll('\n', '\n\n') } />
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

  const [ask, setAsk] = React.useState<string>(step.ask)

  return (
    <>
      <HumanBlock direction='row' justify='space-between'>
        <Flex direction='row' gap='2'>
          <Avatar bg='teal.500' name={ content.author } size='sm' mr={ 2 } />
          <RenderTemplateQuestion step={ step } onAskUpdate={ setAsk } />
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
