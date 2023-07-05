// pages/_app.tsx

import { ReactNode } from 'react';
import type { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { AuthenticationProvider } from '@/authentication/AuthenticationContext'
import '@/styles/globals.css'


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
