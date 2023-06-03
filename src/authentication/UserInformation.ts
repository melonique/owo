import { User } from "./Authentication"

export type UpdatePasswordRequest = {
    password: string
}

type Success = {
    tag: 'Success',
    user: User
}

export const success = (user: User): Success => ({ tag: 'Success', user })

type Fail = {
    tag: 'Fail',
    reason: any
}

export const fail = (reason: any): Fail => ({ tag: 'Fail', reason })

export type UpdatePasswordResponse = Success | Fail