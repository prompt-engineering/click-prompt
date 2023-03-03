import * as React from 'react'
import { Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import ChatGptPromptList from '../ChatGpt/ChatGptPromptList'
import StableDiffusionGenerator from '../StableDiffusion/StableDiffusionGenerator'
import ChatGptCotGenerator from '../ChatGpt/ChatGptCotGenerator'
import ChatGptGeneral from '../ChatGpt/ChatGptGeneral'
import { LinkIcon } from '@chakra-ui/icons'
import ReadingList from '../Resource/ReadingList'

function HomePage() {
  return (
    <div>
      <Heading as='h2'>Prompt Enginnering =&gt; <a
        href={ 'https://github.com/phodal/prompt-generator' }> GitHub </a></Heading>
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
            <ChatGptGeneral />
          </TabPanel>

          <TabPanel>
            <ChatGptPromptList />
          </TabPanel>

          <TabPanel>
            <StableDiffusionGenerator />
          </TabPanel>

          <TabPanel>
            <ChatGptCotGenerator />
          </TabPanel>

          <TabPanel>
            <ReadingList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default HomePage
