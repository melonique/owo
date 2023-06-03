import { useState } from "react"
import { AuthenticationState, LoginRequest, RegisterRequest, User, noAuthentication } from "./Authentication"
import { login as supabaseLogin, register as supabaseRegister } from "./AuthenticationClient"
import { updatePassword as supabaseUpdatePassword } from "./UserInformationClient"
import { UpdatePasswordRequest } from "./UserInformation"

type UseAuthentication = {
  login: (request: LoginRequest) => Promise<void>
  register: (request: RegisterRequest) => Promise<void>,
  updatePassword: (request: UpdatePasswordRequest) => Promise<void>,
  user: User | undefined,
}

const useAuthentication = (): UseAuthentication => {
    const [state, setState] = useState<AuthenticationState>(noAuthentication())

    const login = async (request: LoginRequest): Promise<void> => {
      const authState = await supabaseLogin(request)
      setState(authState)
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
    }
}

export default useAuthentication
