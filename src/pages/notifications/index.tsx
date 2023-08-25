import { ReactNode } from "react"
import { PrivateLayout } from "@/components/Layouts"
import { Notifications } from '@/components'
import { sendUserNotification } from "@/notifications/UserNotificationClient"

const testMessage = {
  conversationId: 'fecc9257-92d1-4158-a122-333a738aed9c',
  userId: 'e4db9a7c-f886-41f2-bc6d-77e12305efa7',
  message: 'Sup bro',
}

const sendTestMessage = async () => {
  await sendUserNotification(testMessage)
}

const NotificationWall = () => {
  return (
    <div>
      <button onClick={() => sendTestMessage()}>Test me!</button>
      <Notifications />
    </div>
  )
}

NotificationWall.getLayout = function getLayout(page: ReactNode) {
  return <PrivateLayout>{page}</PrivateLayout>
}


export default NotificationWall
