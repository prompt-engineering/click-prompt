import { Html, Head, Main, NextScript } from "next/document";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Html lang='en'>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content='Powered by Vercel and Next.js' />
      </Head>
      <body>
        <Main />

        {/* Next inject script */}
        <NextScript />
      </body>
    </Html>
  );
}
