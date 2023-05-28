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

export type LoginUsecase = {
    email: string
    password: string
}

export type LoginResult = Authenticated | ErrorWhileAuthenticating