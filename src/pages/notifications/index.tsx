import { ReactNode } from "react"
import { PrivateLayout } from "@/components/Layouts"
import { Notifications } from '@/components'

const NotificationWall = () => {
  return (
    <div>
      <Notifications />
    </div>
  )
}

NotificationWall.getLayout = function getLayout(page: ReactNode) {
  return <PrivateLayout>{page}</PrivateLayout>
}


export default NotificationWall
