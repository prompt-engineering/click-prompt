import "@/app/globals.css";
import React from "react";
import { AnalyticsWrapper } from "@/components/Analytics";
import Image from "next/image";
import NavBar from "@/layout/NavBar";
import { Container } from "@/components/ChakraUI";
import { Provider } from "@/components/ChakraUI/Provider";
import Script from "next/script";

type RootLayoutProps = {
  params: {
    lang: string;
  };
  children: React.ReactNode;
};
export default function RootLayout({ params, children }: RootLayoutProps) {
  const { lang } = params;

  return (
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
      <body>
        <Provider>
          {/* https://github.com/vercel/next.js/issues/42292 */}
          <div className='fixed bg-white left-0 right-0 top-0 z-50'>
            {/* @ts-expect-error Async Server Component */}
            <NavBar locale={lang} />
          </div>
          <Container marginTop='60px' maxW='8xl' p={{ md: "2rem", base: "1rem" }}>
            {children}
          </Container>
        </Provider>
        <div className='flex justify-center py-4'>
          <a
            className='flex gap-4 items-center'
            href='https://vercel.com?utm_source=prompt-engineering&utm_campaign=oss'
            target={"_blank"}
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

        <Script src='https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js' async></Script>
      </body>
    </html>
  );
}
