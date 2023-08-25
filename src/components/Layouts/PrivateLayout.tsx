import React, { PropsWithChildren } from 'react';
import { FooterNav } from '@/components'
import usePrivatePage from '@/contexts/authentication/usePrivatePage';
import { useNotificationBroadcaster } from '@/notifications/useNotificationBroadcaster';
import { NotificationProvider } from '@/notifications/NotificationContext';

const PrivateLayout: React.FC<PropsWithChildren> = ({ children }) => {
  usePrivatePage()
  useNotificationBroadcaster()

  return (
    <NotificationProvider>
      <main>{children}</main>
      <FooterNav />
    </NotificationProvider>
  )
}
export default PrivateLayout;
