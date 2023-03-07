"use client";

import "@/app/globals.css";
import React from "react";
// import type { Metadata } from "next";
import { AnalyticsWrapper } from "@/components/Analytics";
import Image from "next/image";
import NavBar from "@/layout/NavBar";
import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { NEXT_SEO_DEFAULT } from "@/configs/next-seo-config";

// TODO: fix metadata
// export const metadata: Metadata = NEXT_SEO_DEFAULT;

type RootLayoutProps = {
  params: {
    lang: string;
  };
  children: React.ReactNode;
};
export default function RootLayout({ params, children }: RootLayoutProps) {
  const { lang } = params;

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
    <html lang={lang}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='shortcut icon' href='/favicon/favicon.ico' />
        <title>ClickPrompt - Streamline your prompt design</title>
        <meta
          name='description'
          content='ClickPrompt 是一款专为 Prompt 编写者设计的工具，它支持多种基于 Prompt 的 AI 应用，例如 Stable
              Diffusion、ChatGPT 和 GitHub Copilot 等。 使用
              ClickPrompt，您可以轻松地查看、分享和一键运行这些模型，同时提供在线的 Prompt
              生成器，使用户能够根据自己的需求轻松创建符合要求的 Prompt，并与其他人分享。'
        />
        <meta name='keywords' content='GitHub Copilot, Prompt Programming, Prompt, Stable Diffusion' />
      </head>
      <NextSeo {...NEXT_SEO_DEFAULT} />
      <body>
        <ChakraProvider theme={theme} resetCSS={true}>
          <NavBar locale={lang} />
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
