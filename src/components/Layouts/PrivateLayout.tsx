import React, { PropsWithChildren } from 'react';
import { FooterNav, HeaderBar } from '@/components'

const PrivateLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <FooterNav />
    </>
  )
}
export default PrivateLayout;
