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

import "./globals.css";

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>Prompt Generator - a opensource prompt online generator</title>
      </Head>
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

            <Component {...pageProps} />
          </Tabs>
        </div>
      </ChakraProvider>
    </>
  );
}
