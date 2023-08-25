import React, { PropsWithChildren } from 'react';
import { FooterNav } from '@/components'
import usePrivatePage from '@/contexts/authentication/usePrivatePage';
import { useNotificationBroadcaster } from '@/notifications/useNotificationBroadcaster';

const PrivateLayout: React.FC<PropsWithChildren> = ({ children }) => {
  usePrivatePage()
  useNotificationBroadcaster()

  return (
    <>
      <main>{children}</main>
      <FooterNav />
    </>
  )
}
export default PrivateLayout;
