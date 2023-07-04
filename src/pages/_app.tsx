// pages/_app.tsx

import { ReactNode } from 'react';
import type { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { AuthenticationProvider } from '@/authentication/AuthenticationContext'
import { ChatProvider } from "@/contexts/ChatContext";
import '@/styles/globals.css'


const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {

  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return(
    <AuthenticationProvider>
      <ChatProvider>
        {getLayout(<Component {...pageProps} />)}
      </ChatProvider>
    </AuthenticationProvider>
  )
}

export default MyApp;
