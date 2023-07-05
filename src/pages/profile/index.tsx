// pages/profile/index.tsx

import { useRouter } from "next/router"
import { User } from "@/authentication/Authentication"
import useAuthentication from "@/authentication/useAuthentication"
import { useEffect, ReactNode } from "react"
import { Profile } from "@/components"
import { PrivateLayout } from "@/components/Layouts"

const UserProfile = () => {
    const router = useRouter()
    const { user } = useAuthentication()
/*
    useEffect(() => {
        if (!user) {
            router.replace('/')
        }
    }, [user])
*/
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
