// pages/index.tsx

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Container from 'react-bootstrap/Container'
import { Header, WelcomePage, Gallery } from '@/components'


export default function Home() {
  return (
    <>
      <Head>
        <title>owo - Économie circulaire à Québec</title>
        <meta name="description" content="owo" />
      </Head>
      <Container fluid className="bg-primary vh-100">
        <Header />
        <WelcomePage />
      </Container>
    </>
  )
}
