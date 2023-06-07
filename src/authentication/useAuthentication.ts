import { LoginRequest, RegisterRequest, ResponseError, User } from "./Authentication"
import { login as supabaseLogin, register as supabaseRegister } from "./AuthenticationClient"
import { updatePassword as supabaseUpdatePassword } from "./UserInformationClient"
import { UpdatePasswordRequest } from "./UserInformation"
import { useAuthenticationContext } from "./AuthenticationContext"

type UseAuthentication = {
  login: (request: LoginRequest, onSuccess?: () => void) => Promise<void>,
  register: (request: RegisterRequest) => Promise<void>,
  updatePassword: (request: UpdatePasswordRequest) => Promise<void>,
  user: User | undefined,
  error: ResponseError | undefined,
}

const useAuthentication = (): UseAuthentication => {
    const { state, setState } = useAuthenticationContext()

    const login = async (request: LoginRequest, onSuccess?: () => void): Promise<void> => {
      const authState = await supabaseLogin(request)
      setState(authState)
      if (authState.tag === 'Authenticated') {
        onSuccess?.()
      }
    }

    const register = async (request: RegisterRequest): Promise<void> => {
      const authState = await supabaseRegister(request)
      setState(authState)
    }

    const updatePassword = async (request: UpdatePasswordRequest): Promise<void> => {
      const response = await supabaseUpdatePassword(request)

      console.log(response)
    }

    return {
      login,
      register,
      updatePassword,
      user: state.tag === 'Authenticated' ? state.user : undefined,
      error: state.tag === 'ErrorWhileAuthenticating' ? state.error : undefined,
    }
}

export default useAuthentication
