import React from 'react'
import { Heading, Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import Papa from 'papaparse'
import { DataTable } from '../HomePage/DataTable'
import { DefaultPapaConfig } from '../DefaultPapaConfig'

type ReadingResource = {
  author: string
  name: string
  link: string
  description: string
}

const columnHelper = createColumnHelper<ReadingResource>()

const columns = [
  columnHelper.accessor('author', {
    cell: (info) => info.getValue(),
    header: 'author'
  }),
  columnHelper.accessor('name', {
    cell: (info) => `《${ info.getValue() }》`,
    header: 'name'
  }),
  columnHelper.accessor('link', {
    cell: (info) => info.getValue(),
    header: 'link'
  }),
  columnHelper.accessor('description', {
    cell: (info) => info.getValue(),
    header: 'description'
  })
]

function ReadingList() {
  const [cnData, setCnData] = React.useState<any>(null)
  const [enData, setEnData] = React.useState<any>(null)

  React.useEffect(() => {
    fetch('/data/reading-list-cn.csv')
      .then((response) => response.text())
      .then((csv) => {
        const parseResult = Papa.parse(csv, DefaultPapaConfig)

        console.log(parseResult.data)
        setCnData(parseResult.data)
      })
  }, [])

  React.useEffect(() => {
    fetch('/data/reading-list-en.csv')
      .then((response) => response.text())
      .then((csv) => {
        const parseResult = Papa.parse(csv, DefaultPapaConfig)

        console.log(parseResult.data)
        setEnData(parseResult.data)
      })
  }, [])

  return (
    <div>
      <Text>欢迎 PR，添加新的阅读材料</Text>
      <Heading>中文</Heading>
      {
        cnData && <DataTable data={ cnData } columns={ columns } />
      }
      <Heading>English</Heading>
      {
        enData && <DataTable data={ enData } columns={ columns } />
      }
    </div>
  )
}

export default ReadingList
