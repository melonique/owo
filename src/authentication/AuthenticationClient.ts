import { supabase } from '@/config/SupabaseClient'
import { LoginResponse, LoginRequest, authenticated, errorWhileAuthenticating, RegisterRequest, RegisterResponse, fromAuthenticationResponseToUser } from '../authentication/Authentication'
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js'

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword(request)

    return error || !data ? errorWhileAuthenticating(error) : authenticated(fromAuthenticationResponseToUser(data.user))
}

export const register = async (request: RegisterRequest): Promise<RegisterResponse> => {
    const { data, error } = await supabase.auth.signUp(fromRequestToSignup(request))

    return error || !data ? errorWhileAuthenticating(error) : authenticated(fromAuthenticationResponseToUser(data.user))
}

const fromRequestToSignup = (request: RegisterRequest): SignUpWithPasswordCredentials => ({
    email: request.email,
    password: request.password,
    options: {
        data: {
            username: request.username,
            name: request.name,
        }
    }
})