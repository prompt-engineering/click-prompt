import * as React from 'react'
import { Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import ChatGptPromptList from '../ChatGpt/ChatGptPromptList'
import StableDiffusionGenerator from '../StableDiffusion/StableDiffusionGenerator'
import ChatGptCotGenerator from '../ChatGpt/ChatGptCotGenerator'
import ChatGptGeneral from '../ChatGpt/ChatGptGeneral'

function HomePage() {
  return (
    <div>
      <Heading>Prompt Enginnering -> <a href={ "https://github.com/phodal/prompt-generator" }> GitHub </a></Heading>
      <Tabs variant='enclosed'>
        <TabList>
          <Tab>类 ChatGPT 常用指令</Tab>
          <Tab>类 ChatGPT 角色扮演</Tab>
          <Tab>类 ChatGPT 游戏模式</Tab>
          <Tab>AI 绘画生成器</Tab>
          <Tab>学习资料</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Heading>Stable Diffusion Prompts</Heading>
            <ChatGptGeneral />
          </TabPanel>

          <TabPanel>
            <Heading>ChatGPT Prompts Act List</Heading>
            <ChatGptPromptList />
          </TabPanel>

          <TabPanel>
            <StableDiffusionGenerator />
          </TabPanel>

          <TabPanel>
            <Heading>多步骤生成</Heading>
            <ChatGptCotGenerator />
          </TabPanel>

          <TabPanel>
            <Heading>学习资料</Heading>
            <ul>
              <li><a href='https://github.com/phodal/ai-research/'>理解 Prompt</a></li>
              <li><a href='https://github.com/phodal/prompt-patterns'>Prompt 编写模式</a></li>
            </ul>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default HomePage
