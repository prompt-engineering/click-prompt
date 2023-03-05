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
        <title>
          ClickPrompt - 是一款全新的 Prompt 工具应用，可以帮助用户更好地编写 Prompt 并解放生产力。通过查看用户分享的
          Prompt、一键运行多种 Prompt、 以及在线 Prompt 生成器，ClickPrompt 可以帮助你轻松高效地完成 Prompt 的编写。
        </title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content='Powered by Vercel and Next.js' />
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
