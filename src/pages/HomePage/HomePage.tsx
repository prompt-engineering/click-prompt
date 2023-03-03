import * as React from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from './DataTable'
import { Heading } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import ChatGptPromptList from '../ChatGptPromptList/ChatGptPromptList'
import StableDiffusionGenerator from '../StableDiffusionGenerator/StableDiffusionGenerator'
import Papa from 'papaparse'

type GeneralCommand = {
  english: string
  chinese: string
  description: string
  example: string
};

const columnHelper = createColumnHelper<GeneralCommand>()

const columns = [
  columnHelper.accessor('chinese', {
    cell: (info) => info.getValue(),
    header: '中文'
  }),
  columnHelper.accessor('description', {
    cell: (info) => info.getValue(),
    header: '简述'
  }),
  columnHelper.accessor('example', {
    cell: (info) => info.getValue(),
    header: '示例',
  })
]

function HomePage() {
  const [data, setData] = React.useState<any>(null)

  React.useEffect(() => {
    fetch('/data/chatgpt-specific.csv')
      .then((response) => response.text())
      .then((csv) => {
        const parseResult = Papa.parse(csv, {
          delimiter: ',',
          header: true
        })

        setData(parseResult.data)
      }).then()
  }, [])

  return (
    <div>
      <Tabs variant='enclosed'>
        <TabList>
          <Tab>ChatGPT 常用指令</Tab>
          <Tab>ChatGPT 角色扮演</Tab>
          <Tab>AI 绘画生成器</Tab>
          <Tab>学习资料</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Heading>Stable Diffusion Prompts</Heading>
            { data && <DataTable data={ data } columns={ columns } /> }
          </TabPanel>

          <TabPanel>
            <Heading>ChatGPT Prompts Act List</Heading>
            <ChatGptPromptList />
          </TabPanel>

          <TabPanel>
            <StableDiffusionGenerator />
          </TabPanel>

          <TabPanel>
            <Heading>学习资料</Heading>
            <ul>
              <li><a href="https://github.com/phodal/ai-research/">理解 Prompt</a></li>
              <li><a href="https://github.com/phodal/prompt-patterns">Prompt 编写模式</a></li>
            </ul>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default HomePage
