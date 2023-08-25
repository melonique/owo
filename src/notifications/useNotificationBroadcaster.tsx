import { useEffect } from "react"
import useAuthentication from "@/contexts/authentication/useAuthentication"
import { initializeUserNotificationBroadcaster, removeUserNotificationBroadcaster } from "./UserNotificationClient"

export const useNotificationBroadcaster = () => {
  const { user } = useAuthentication()
  
  useEffect(() => {
    if (user) {
      const channel = initializeUserNotificationBroadcaster({ targetUserId: user.id, notify: (payload) => console.log(payload) })

      return () => {
        removeUserNotificationBroadcaster(channel)
      }
    }
  }, [user])
}