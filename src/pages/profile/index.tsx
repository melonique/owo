import { useRouter } from "next/router"
import { User } from "@/authentication/Authentication"
import useAuthentication from "@/authentication/useAuthentication"
import { useEffect } from "react"
import { Profile } from "@/components"

type UserProfileProps = {
    user: User
}

const UserProfile: React.FC<UserProfileProps> = () => {
    const router = useRouter()
    const { user } = useAuthentication()

    useEffect(() => {
        if (!user) {
            router.replace('/')
        }
    }, [user])

    return (
        <div>
            {JSON.stringify(user)}
        <Profile />

        </div>
    )
}

export default UserProfile
