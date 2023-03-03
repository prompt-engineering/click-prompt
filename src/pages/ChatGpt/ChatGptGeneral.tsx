import React from 'react'
import Papa from 'papaparse'
import { DataTable } from '../HomePage/DataTable'
import { createColumnHelper } from '@tanstack/react-table'
import { DefaultPapaConfig } from '../DefaultPapaConfig'

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
  columnHelper.accessor('example', {
    cell: (info) => info.getValue(),
    header: '示例'
  })
]


function ChatGptGeneral() {
  const [data, setData] = React.useState<any>(null)

  React.useEffect(() => {
    fetch('/data/chatgpt-specific.csv')
      .then((response) => response.text())
      .then((csv) => {
        const parseResult = Papa.parse(csv, DefaultPapaConfig)

        setData(parseResult.data)
      }).then()
  }, [])

  return (
    <div>
      { data && <DataTable data={ data } columns={ columns } /> }
    </div>
)
}

export default ChatGptGeneral
