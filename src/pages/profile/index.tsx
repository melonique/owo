import { ReactNode } from "react"
import { Profile } from "@/components"
import { PrivateLayout } from "@/components/Layouts"

const UserProfile = () => {
    return (
        <div>
          <Profile />
        </div>
    )
}

UserProfile.getLayout = function getLayout(page: ReactNode) {
  return <PrivateLayout>{page}</PrivateLayout>
}


export default UserProfile
