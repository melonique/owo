import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { UserConversationNotification } from "./UserNotification";
import useAuthentication from "@/contexts/authentication/useAuthentication";
import { getAllNotifications } from "./UserNotificationClient";

type ContextValue = {
  userNotifications: UserConversationNotification[]
  setUserNotifications: Dispatch<SetStateAction<UserConversationNotification[]>>
}

const defaultContextValue: ContextValue = {
  userNotifications: [],
  setUserNotifications: () => undefined
}

const NotificationContext = createContext<ContextValue>(defaultContextValue);

export const NotificationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthentication()
  const [userNotifications, setUserNotifications] = useState<ContextValue['userNotifications']>([])

  useEffect(() => {
    (async () => {
      if (user) {
        setUserNotifications(await getAllNotifications(user.id))
      }
    })()
  }, [user])

  return (
    <NotificationContext.Provider value={{userNotifications, setUserNotifications}}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotificationContext = () => {
    const context = useContext(NotificationContext)

    if (context === undefined) {
      throw new Error('useNotificationContext must be used within a NotificationContext')
    }

    return context
}