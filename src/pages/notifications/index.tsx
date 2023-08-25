import { ReactNode } from "react"
import { PrivateLayout } from "@/components/Layouts"
import { Notifications } from '@/components'
import { useUserNotification } from "@/notifications/useUserNotifications"

const NotificationWall = () => {
  const { notifications } = useUserNotification()

  return (
    <div>
      <Notifications notifications={notifications} />
    </div>
  )
}

NotificationWall.getLayout = function getLayout(page: ReactNode) {
  return <PrivateLayout>{page}</PrivateLayout>
}


export default NotificationWall
