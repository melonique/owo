export type NoAuthentication = {
    tag: 'NoAuthentication'
}

export const noAuthentication = (): NoAuthentication => ({ tag: 'NoAuthentication' })

export type User = {
    id: string
    email: string
    name: string
    username: string
}

type Authenticated = {
    tag: 'Authenticated',
    user: User
}

export const authenticated = (user: User): Authenticated => ({ tag: 'Authenticated', user })

type ErrorWhileAuthenticating = {
    tag: 'ErrorWhileAuthenticating',
    error: any
}

export const errorWhileAuthenticating = (error: any): ErrorWhileAuthenticating => ({ tag: 'ErrorWhileAuthenticating', error })

export type AuthenticationState = NoAuthentication | Authenticated | ErrorWhileAuthenticating

export type LoginRequest = {
    email: string
    password: string
}

export type LoginResponse = Authenticated | ErrorWhileAuthenticating

export type RegisterRequest = {
    email: string
    password: string
    name: string
    username: string
}

export type RegisterResponse = Authenticated | ErrorWhileAuthenticating

export const fromAuthenticationResponseToUser = (userData: any): User => ({
    id: userData['id'],
    email: userData['email'],
    name: userData['user_metadata']['name'],
    username: userData['user_metadata']['username'],
})