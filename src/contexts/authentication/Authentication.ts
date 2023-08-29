export type NoAuthentication = {
    tag: 'NoAuthentication'
}

export const noAuthentication = (): NoAuthentication => ({ tag: 'NoAuthentication' })

export type User = {
    id: string
    email: string
    name: string
    firstname: string
    username: string
}

type Authenticated = {
    tag: 'Authenticated',
    user: User
}

export const authenticated = (user: User): Authenticated => ({ tag: 'Authenticated', user })

export type ResponseError = {
    message: string
}

type ErrorWhileAuthenticating = {
    tag: 'ErrorWhileAuthenticating',
    error: ResponseError
}

export const errorWhileAuthenticating = (error: ResponseError): ErrorWhileAuthenticating => ({ tag: 'ErrorWhileAuthenticating', error })

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
    firstname: string
}

export type RegisterResponse = Authenticated | ErrorWhileAuthenticating

export const fromAuthenticationResponseToUser = (userData: any): User => ({
    id: userData['id'],
    email: userData['email'],
    name: userData['user_metadata']['name'],
    firstname: userData['user_metadata']['firstname'],
    username: userData['user_metadata']['username'],
})

export const fromAuthErrorToMessage = (errorData: any): ResponseError => ({
    message: errorData['message'],
})
