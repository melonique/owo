import React, { PropsWithChildren } from 'react';
import { FooterNav } from '@/components'
import usePrivatePage from '@/contexts/authentication/usePrivatePage';
import { useNotificationBroadcaster } from '@/notifications/useNotificationBroadcaster';
import { NotificationProvider } from '@/notifications/NotificationContext';

const InnerLayout: React.FC<PropsWithChildren> = ({ children }) => {
  useNotificationBroadcaster()

  return (
    <>
      <main>{children}</main>
      <FooterNav />
    </>
  )
}

const PrivateLayout: React.FC<PropsWithChildren> = ({ children }) => {
  usePrivatePage()

  return (
    <NotificationProvider>
      <InnerLayout>
        {children}
      </InnerLayout>
    </NotificationProvider>
  )
}
export default PrivateLayout;
