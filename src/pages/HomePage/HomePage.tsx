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
  // columnHelper.accessor('english', {
  //   cell: (info) => info.getValue(),
  //   header: '英语模式'
  // }),
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
          <Tab>Stable Diffusion Prompts Generator</Tab>
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
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default HomePage
