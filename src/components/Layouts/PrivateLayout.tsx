import { FooterNav, HeaderBar } from '@/components'

export default function PrivateLayout({ children }) {
  return (
    <>
      <main>{children}</main>
      <FooterNav />
    </>
  )
}
