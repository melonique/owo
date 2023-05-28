
import { createClient } from '@supabase/supabase-js'
import { LoginResult, LoginUsecase, authenticated, errorWhileAuthenticating } from './Authentication'

const supabase = createClient('https://nchfhnhquozlugyqknuf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jaGZobmhxdW96bHVneXFrbnVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUxNTE4NDgsImV4cCI6MjAwMDcyNzg0OH0.cBU5SjQ9w3OpenF1oWAEe_4jUZRY8sGSQNM1YUbNN8A')

export const login = async (login: LoginUsecase): Promise<LoginResult> => {
    const { data, error } = await supabase.auth.signInWithPassword(login)

    return error || !data ? errorWhileAuthenticating(error) : authenticated(data.session, data.user)
}