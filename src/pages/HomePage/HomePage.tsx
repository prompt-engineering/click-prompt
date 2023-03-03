import * as React from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from './DataTable'
import { Heading } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import ChatGptPromptList from '../ChatGptPromptList/ChatGptPromptList'
import StableDiffusionGenerator from '../StableDiffusionGenerator/StableDiffusionGenerator'

type UnitConversion = {
  fromUnit: string;
  toUnit: string;
  factor: number;
};

const data: UnitConversion[] = [
  {
    fromUnit: 'inches',
    toUnit: 'millimetres (mm)',
    factor: 25.4
  },
  {
    fromUnit: 'feet',
    toUnit: 'centimetres (cm)',
    factor: 30.48
  },
  {
    fromUnit: 'yards',
    toUnit: 'metres (m)',
    factor: 0.91444
  }
]

const columnHelper = createColumnHelper<UnitConversion>()

const columns = [
  columnHelper.accessor('fromUnit', {
    cell: (info) => info.getValue(),
    header: 'To convert'
  }),
  columnHelper.accessor('toUnit', {
    cell: (info) => info.getValue(),
    header: 'Into'
  }),
  columnHelper.accessor('factor', {
    cell: (info) => info.getValue(),
    header: 'Multiply by',
    meta: {
      isNumeric: true
    }
  })
]

function HomePage() {
  return (
    <div>
      <Tabs variant='enclosed'>
        <TabList>
          <Tab>ChatGPT Prompts 角色 Play List</Tab>
          <Tab>ChatGPT Prompts Generator</Tab>
          <Tab>Stable Diffusion Prompts Generator</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Heading>ChatGPT Prompts Act List</Heading>
            <ChatGptPromptList />
          </TabPanel>
          <TabPanel>
            <Heading>Stable Diffusion Prompts</Heading>
            <DataTable columns={ columns } data={ data } />
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
