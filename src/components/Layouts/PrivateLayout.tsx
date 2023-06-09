import { FooterNav } from '@/components'

export default function PrivateLayout({ children }) {
  return (
    <>
      <main>{children}</main>
      <FooterNav />
    </>
  )
}
