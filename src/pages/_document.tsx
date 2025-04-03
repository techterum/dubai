import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="8WzNwd4FQZ5ubM3ceOG0gwseCnQDdffj_2Z6OafEmo4"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.jpeg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.jpeg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.jpeg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta charSet="utf-8" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
