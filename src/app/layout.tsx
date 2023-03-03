import './globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

export const metadata = {
  title: 'Prompt Cheatsheet -- a opensource prompt libraries',
  description: 'Powered by Vercel and Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider resetCSS={true}>
        <Heading as='h2'>Prompt Enginnering =&gt; <a
        href={ 'https://github.com/phodal/prompt-generator' }> GitHub </a></Heading>
      <Tabs variant='enclosed'>
        <TabList>
          <Tab>类 ChatGPT 常用指令</Tab>
          <Tab>类 ChatGPT 角色扮演</Tab>
          <Tab>类 ChatGPT 游戏模式</Tab>
          <Tab>AI 会话生成器</Tab>
          <Tab>学习资料</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {children}
          </TabPanel>
        </TabPanels>
      </Tabs>
        </ChakraProvider>
      </body>
    </html>
  )
}
