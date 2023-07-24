// pages/index.tsx

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import { Header, WelcomePage, Gallery } from '@/components'


export default function Home() {
  return (
    <>
      <Head>
        <title>owo - Économie circulaire à Québec</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <p className="text-center mt-2 mb-3">
        <a className="btn btn-outline-primary" href="https://owo.quebec/" target="_blank">VIEW LANDING PAGE</a>
      </p>
      <Header />
      <WelcomePage />
    </>
  )
}
