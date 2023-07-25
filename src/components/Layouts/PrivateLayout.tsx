import React, { PropsWithChildren } from 'react';
import { FooterNav } from '@/components'
import usePrivatePage from '@/contexts/authentication/usePrivatePage';

const PrivateLayout: React.FC<PropsWithChildren> = ({ children }) => {
  usePrivatePage()

  return (
    <>
      <main>{children}</main>
      <FooterNav />
    </>
  )
}
export default PrivateLayout;
