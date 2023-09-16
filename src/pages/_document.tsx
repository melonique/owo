import { Html, Head, Main, NextScript } from 'next/document'
import useDetectKeyboardOpen from "use-detect-keyboard-open";

export default function Document() {
  const isKeyboardOpen = useDetectKeyboardOpen();
  return (
    <Html lang="en">
      <Head >

        <link href="https://fonts.cdnfonts.com/css/montserrat" rel="stylesheet" />

        <link rel="manifest" href="manifest.json"></link>
        <meta name="theme-color" content="#1014a3" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="owo" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="icon" href="/favicon.png" />

      </Head>
      <body className={`${isKeyboardOpen ? "keyboard-open" : "keyboard-close"}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
