import useAuthentication from "@/authentication/useAuthentication"

const UserProfile = () => {
    const { user } = useAuthentication()

    if (!user) {
        return null
    }

    return (
        <div>
            {JSON.stringify(user)}
        </div>
    )
}

export default UserProfile
