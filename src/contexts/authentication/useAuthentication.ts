import { LoginRequest, RegisterRequest, ResponseError, User, labelFrom } from "./Authentication"
import { login as supabaseLogin, register as supabaseRegister, resumeSession as supabaseResume } from "./AuthenticationClient"
import { updatePassword as supabaseUpdatePassword } from "./UserInformationClient"
import { UpdatePasswordRequest } from "./UserInformation"
import { useAuthenticationContext } from "./AuthenticationContext"

type UseAuthentication = {
  resume: (onError?: () => void) => Promise<void>,
  login: (request: LoginRequest, onSuccess?: () => void) => Promise<void>,
  register: (request: RegisterRequest, onSuccess?: () => void) => Promise<void>,
  updatePassword: (request: UpdatePasswordRequest) => Promise<void>,
  user: User | undefined,
  userLabel: string | undefined,
  error: ResponseError | undefined,
}

const useAuthentication = (): UseAuthentication => {
    const { state, setState } = useAuthenticationContext()

    const resume = async (onError?: () => void): Promise<void> => {
      const authState = await supabaseResume()
      setState(authState)
      if (authState.tag !== 'Authenticated') {
        onError?.()
      }
    }

    const login = async (request: LoginRequest, onSuccess?: () => void): Promise<void> => {
      const authState = await supabaseLogin(request)
      setState(authState)
      if (authState.tag === 'Authenticated') {
        onSuccess?.()
      }
    }

    const register = async (request: RegisterRequest, onSuccess?: () => void): Promise<void> => {
      const authState = await supabaseRegister(request)
      setState(authState)
      if (authState.tag === 'Authenticated') {
        onSuccess?.()
      }
    }

    const updatePassword = async (request: UpdatePasswordRequest): Promise<void> => {
      const response = await supabaseUpdatePassword(request)
      console.log(response)
    }

    return {
      resume,
      login,
      register,
      updatePassword,
      user: state.tag === 'Authenticated' ? state.user : undefined,
      userLabel: state.tag === 'Authenticated' ? labelFrom(state.user) : undefined,
      error: state.tag === 'ErrorWhileAuthenticating' ? state.error : undefined,
    }
}

export default useAuthentication
