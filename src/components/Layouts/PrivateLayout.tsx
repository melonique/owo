import React, { PropsWithChildren } from 'react';
import { FooterNav, Onboarding } from '@/components'
import usePrivatePage from '@/contexts/authentication/usePrivatePage';
import { useNotificationBroadcaster } from '@/notifications/useNotificationBroadcaster';
import { NotificationProvider } from '@/notifications/NotificationContext';
import { useUi } from '@/contexts/UiContext'

const InnerLayout: React.FC<PropsWithChildren> = ({ children }) => {
  useNotificationBroadcaster()
  const { keyboard } = useUi();

  return (
    <>
      <div className={keyboard.isOpen ? 'private-layout keyboard-open' : 'private-layout'}>
        <main>{children}</main>
      </div>
      <Onboarding />
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
