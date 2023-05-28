type UserProps = {
    user: any,
    session: any
}

const User: React.FC<UserProps> = ({user, session}) => {
    return (
        <div>
            <h1>User Profile</h1>
            <p>{user}</p>
            <p>{session}</p>
        </div>
    )
}

export default User