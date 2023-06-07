import { AuthenticationProvider } from '@/authentication/AuthenticationContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Nav } from '@/components'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthenticationProvider>
      <Component {...pageProps} />
      <Nav />
    </AuthenticationProvider>
  )
}
