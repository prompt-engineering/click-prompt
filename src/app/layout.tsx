"use client";

import "./globals.css";
import React from "react";
// import type { Metadata } from "next";
import { AnalyticsWrapper } from "@/components/Analytics";
import Image from "next/image";
import NavBar from "@/layout/NavBar";
import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";

// TODO: fix metadata
// export const metadata: Metadata = NEXT_SEO_DEFAULT;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = extendTheme({
    components: {
      Drawer: {
        sizes: {
          "2xl": { dialog: { maxW: "8xl" } },
        },
      },
    },
  });

  return (
    // TODO: should make en page lang as `en`
    <html lang='zh-CN'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='shortcut icon' href='/favicon/favicon.ico' />
      </head>
      <body>
        <ChakraProvider theme={theme} resetCSS={true}>
          <NavBar />
          <Container maxW='8xl' p={{ md: "2rem", base: "1rem" }}>
            {children}
          </Container>
        </ChakraProvider>
        <div className='flex justify-center py-4'>
          {/* Vercel footer */}
          <a
            className='flex gap-4 items-center'
            href='https://vercel.com?utm_source=prompt-engineering&utm_campaign=oss'
          >
            <span>Powered by</span>
            <Image
              height={24}
              width={116}
              src='https://images.ctfassets.net/e5382hct74si/78Olo8EZRdUlcDUFQvnzG7/fa4cdb6dc04c40fceac194134788a0e2/1618983297-powered-by-vercel.svg'
              alt='Vercel Logo'
            />
          </a>
        </div>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
