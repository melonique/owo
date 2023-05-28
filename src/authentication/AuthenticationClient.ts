import { supabase } from '@/config/SupabaseClient'
import { LoginResult, LoginUsecase, authenticated, errorWhileAuthenticating } from '../authentication/Authentication'

export const login = async (login: LoginUsecase): Promise<LoginResult> => {
    const { data, error } = await supabase.auth.signInWithPassword(login)

    return error || !data ? errorWhileAuthenticating(error) : authenticated(data.session, data.user)
}