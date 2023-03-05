import { ChakraProvider } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import NavBar from "../layout/NavBar";

import Head from "next/head";

import "./globals.css";

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>
          PromptGenerator - 各种在线符咒（Prompt）生成器，帮助你更好地编写 Prompt，解放生产力，计划支持：Stable
          Diffusion、ChatGPT、GitHub Copilot。
        </title>
      </Head>
      <ChakraProvider resetCSS={true}>
        <div id='root'>
          <NavBar />
          <Container maxW='8xl' p='2rem'>
            <Component {...pageProps} />
          </Container>
        </div>
      </ChakraProvider>
    </>
  );
}
