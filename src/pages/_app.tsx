import { ChakraProvider } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

import NavBar from "../layout/NavBar";

import "./globals.css";

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>ClickPrompt - Streamline your prompt design </title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta
          name='description'
          content='ClickPrompt 是一款专为Prompt编写者设计的工具，它支持多种基于Prompt的AI应用，例如Stable Diffusion、ChatGPT和GitHub Copilot等。使用ClickPrompt，您可以轻松地查看、分享和一键运行这些模型，同时提供在线的Prompt生成器，使用户能够根据自己的需求轻松创建符合要求的Prompt，并与其他人分享'
        />
      </Head>
      <Analytics />
      <ChakraProvider resetCSS={true}>
        <div id='root'>
          <NavBar />
          <Container maxW='8xl' p='2rem'>
            <Component {...pageProps} />
          </Container>
        </div>
      </ChakraProvider>
      <div className='flex justify-center py-4'>
        {/* Vercel footer */}
        <a className='flex gap-4 items-center' href='https://vercel.com?utm_source=prompt-engineering&utm_campaign=oss'>
          <span>Powered by</span>
          <img
            src='https://images.ctfassets.net/e5382hct74si/78Olo8EZRdUlcDUFQvnzG7/fa4cdb6dc04c40fceac194134788a0e2/1618983297-powered-by-vercel.svg'
            alt='Vercel Logo'
          />
        </a>
      </div>
    </>
  );
}
