import { ChakraProvider } from "@chakra-ui/react";
import {
  Container,
} from "@chakra-ui/react";
import NavBar from '../components/NavBar/NavBar'

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
          <NavBar/>
          <Container maxW='8xl' p="2rem">
            <Component {...pageProps} />
          </Container>
        </div>
      </ChakraProvider>
    </>
  );
}
