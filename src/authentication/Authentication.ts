export type NoAuthentication = {
    tag: 'NoAuthentication'
}

export const noAuthentication = (): NoAuthentication => ({ tag: 'NoAuthentication' })

type Authenticated = {
    tag: 'Authenticated',
    session: any,
    user: any
}

export const authenticated = (session: any, user: any): Authenticated => ({ tag: 'Authenticated', session, user })

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