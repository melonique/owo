import { FooterNav, HeaderBar } from '@/components'

export default function PrivateLayout({ children }) {
  return (
    <>
      <HeaderBar />
      <main>{children}</main>
      <FooterNav />
    </>
  )
}
