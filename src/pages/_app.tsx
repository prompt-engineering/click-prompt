import { NEXT_SEO_DEFAULT } from "@/configs/next-seo-config";
import { ChakraProvider } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import NavBar from "../layout/NavBar";

import "./globals.css";

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='shortcut icon' href='/favicon/favicon.ico' />
      </Head>
      <NextSeo {...NEXT_SEO_DEFAULT} />
      <Analytics />
      <ChakraProvider resetCSS={true}>
        <div id='root'>
          <NavBar />
          <Container maxW='8xl' p={{ md: "2rem", base: "1rem" }}>
            <Component {...pageProps} />
          </Container>
        </div>
      </ChakraProvider>
      <div className='flex justify-center py-4'>
        {/* Vercel footer */}
        <a className='flex gap-4 items-center' href='https://vercel.com?utm_source=prompt-engineering&utm_campaign=oss'>
          <span>Powered by</span>
          <Image
            height={23.99}
            width={(23.99 / 43.99) * 211.99}
            src='https://images.ctfassets.net/e5382hct74si/78Olo8EZRdUlcDUFQvnzG7/fa4cdb6dc04c40fceac194134788a0e2/1618983297-powered-by-vercel.svg'
            alt='Vercel Logo'
          />
        </a>
      </div>
    </>
  );
}
