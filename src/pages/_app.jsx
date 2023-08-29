// pages/_app.tsx

import { AuthenticationProvider } from '@/contexts/authentication/AuthenticationContext'
import { UiContextProvider } from '@/contexts/UiContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.scss'
import TimeAgo from 'javascript-time-ago'
import Head from 'next/head'
import en from 'javascript-time-ago/locale/en.json'
import fr from 'javascript-time-ago/locale/fr.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(fr)

const MyApp = ({
  Component,
  pageProps,
}) => {

  const getLayout = Component.getLayout || ((page) => page);

  return(
  <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <link href="https://fonts.cdnfonts.com/css/montserrat" rel="stylesheet" />
    </Head>
    <UiContextProvider>
      <AuthenticationProvider>
        {getLayout(<Component {...pageProps} />)}
      </AuthenticationProvider>
    </UiContextProvider>
  </>
  )
}

export default MyApp;
