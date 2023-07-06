// pages/_app.tsx

import { ReactNode, useEffect, useState } from 'react';
import type { GetServerSideProps, NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { AuthenticationProvider } from '@/authentication/AuthenticationContext'
import '@/styles/globals.css'
import { AuthenticationState, noAuthentication } from '@/authentication/Authentication';
import { resumeSession } from '@/authentication/AuthenticationClient';
import { useRouter } from 'next/router';


const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {

  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthenticationState>(noAuthentication())

  useEffect(() => {
    (async () => {
      const state = await resumeSession()
      if (state.tag === 'ErrorWhileAuthenticating') {
        router.replace('/')
      }
      setAuthState(state)
    })()
  }, [])

  return(
    <AuthenticationProvider defaultState={authState}>
      {getLayout(<Component {...pageProps} />)}
    </AuthenticationProvider>
  )
}

export default MyApp;
