// pages/_app.tsx

import { ReactNode, useEffect, useState } from 'react';
import type { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { AuthenticationProvider } from '@/authentication/AuthenticationContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css'
import { AuthenticationState, noAuthentication } from '@/authentication/Authentication';
import { resumeSession } from '@/authentication/AuthenticationClient';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {

  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return(
    <AuthenticationProvider>
      {getLayout(<Component {...pageProps} />)}
    </AuthenticationProvider>
  )
}

export default MyApp;
