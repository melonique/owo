import { supabase } from '@/config/SupabaseClient'
import { LoginResponse, LoginRequest, authenticated, errorWhileAuthenticating, RegisterRequest, RegisterResponse, fromAuthenticationResponseToUser, fromAuthErrorToMessage } from '../authentication/Authentication'
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js'

export const resumeSession = async (): Promise<LoginResponse> => {
    const { data, error } = await supabase.auth.getSession()

    return error || !data.session || !data.session.user
        ? errorWhileAuthenticating(fromAuthErrorToMessage(error || 'no session'))
        : authenticated(fromAuthenticationResponseToUser(data.session.user))
}

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword(request)

    return error ? errorWhileAuthenticating(fromAuthErrorToMessage(error)) : authenticated(fromAuthenticationResponseToUser(data.user))
}

export const register = async (request: RegisterRequest): Promise<RegisterResponse> => {
    const { data, error } = await supabase.auth.signUp(fromRequestToSignup(request))

    return error ? errorWhileAuthenticating(fromAuthErrorToMessage(error)) : authenticated(fromAuthenticationResponseToUser(data.user))
}

const fromRequestToSignup = (request: RegisterRequest): SignUpWithPasswordCredentials => ({
    email: request.email,
    password: request.password,
    options: {
        emailRedirectTo: "https://owo-quebec.vercel.app/profile",
        data: {
            username: request.username,
            name: request.name,
        }
    }
})
