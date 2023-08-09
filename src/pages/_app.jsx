// pages/_app.tsx

import { ReactNode, useEffect, useState } from 'react';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { AuthenticationProvider } from '@/contexts/authentication/AuthenticationContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.scss'
import { AuthenticationState, noAuthentication } from '@/contexts/authentication/Authentication';
import { resumeSession } from '@/contexts/authentication/AuthenticationClient';
import TimeAgo from 'javascript-time-ago'

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
    <AuthenticationProvider>
      {getLayout(<Component {...pageProps} />)}
    </AuthenticationProvider>
  )
}

export default MyApp;
