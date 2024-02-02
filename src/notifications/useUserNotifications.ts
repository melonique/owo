import { useNotificationContext } from "./NotificationContext"
import { UserConversationNotification } from "./UserNotification"

type UserNotificationUsecase = {
  notifications: UserConversationNotification[],
  hasNewNotification: boolean,
  syncNotification: (newNotification: UserConversationNotification) => void,
}
// TODO: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Re-engageable_Notifications_Push
// or onesignal.com
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
