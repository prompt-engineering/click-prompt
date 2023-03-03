"use client";

import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Link from "next/link";
import Head from "next/head";

// server component only
// export const metadata = {
//   title: 'Prompt Cheatsheet -- a opensource prompt libraries',
//   description: 'Powered by Vercel and Next.js',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Head>
        <meta charSet='utf-8' />
        <title>Prompt Generator - a opensource prompt online generator</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content='Powered by Vercel and Next.js' />
      </Head>
      <body>
        <ChakraProvider resetCSS={true}>
          <div id='root'>
            <Heading as='h2'>
              Prompt Enginnering =&gt;{" "}
              <Link href={"https://github.com/phodal/prompt-generator"}>
                {" "}
                GitHub{" "}
              </Link>
            </Heading>
            <Tabs variant='enclosed'>
              <TabList>
                <Link href='/ChatGptGeneral'>
                  <Tab>类 ChatGPT 常用指令</Tab>
                </Link>
                <Link href='/ChatGptPromptList'>
                  <Tab>类 ChatGPT 角色扮演</Tab>
                </Link>
                <Link href='/StableDiffusionGenerator'>
                  <Tab>类 ChatGPT 游戏模式</Tab>
                </Link>
                <Link href='/ChatGptCotGenerator'>
                  <Tab>AI 会话生成器</Tab>
                </Link>
                <Link href='/ReadingList'>
                  <Tab>学习资料</Tab>
                </Link>
              </TabList>

              {children}
            </Tabs>
          </div>
        </ChakraProvider>
      </body>
    </html>
  );
}
