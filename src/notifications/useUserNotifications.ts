import { useNotificationContext } from "./NotificationContext"
import { UserConversationNotification } from "./UserNotification"

type UserNotificationUsecase = {
  notifications: UserConversationNotification[],
  hasNewNotification: boolean,
  syncNotification: (newNotification: UserConversationNotification) => void,
}

export const useUserNotification = (): UserNotificationUsecase => {
  const { userNotifications, setUserNotifications } = useNotificationContext()

  return {
    notifications: userNotifications,
    hasNewNotification: userNotifications.some((notification) => notification.status === 'new'),
    syncNotification: (notification) => {
      setUserNotifications([notification, ...userNotifications])
    },
  }
}