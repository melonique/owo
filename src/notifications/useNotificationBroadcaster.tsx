import { useEffect } from "react"
import useAuthentication from "@/contexts/authentication/useAuthentication"
import { initializeUserNotificationBroadcaster, removeUserNotificationBroadcaster } from "./UserNotificationClient"
import { useUserNotification } from "./useUserNotifications"

export const useNotificationBroadcaster = () => {
  const { user } = useAuthentication()
  const { syncNotification } = useUserNotification()
  
  useEffect(() => {
    if (user) {
      const channel = initializeUserNotificationBroadcaster({ targetUserId: user.id, notify: syncNotification })

      return () => {
        removeUserNotificationBroadcaster(channel)
      }
    }
  }, [syncNotification, user])
}