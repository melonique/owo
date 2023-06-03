import { useState } from "react"
import { AuthenticationState, LoginRequest, RegisterRequest, User, noAuthentication } from "./Authentication"
import { login as supabaseLogin, register as supabaseRegister } from "./AuthenticationClient"
import { updatePassword as supabaseUpdatePassword } from "./UserInformationClient"
import { UpdatePasswordRequest } from "./UserInformation"

type UseAuthentication = {
  login: (login: LoginRequest) => Promise<void>
  register: (register: RegisterRequest) => Promise<void>,
  user: User | undefined,
}

const useAuthentication = (): UseAuthentication => {
    const [state, setState] = useState<AuthenticationState>(noAuthentication())

    const login = async (login: LoginRequest): Promise<void> => {
      const authState = await supabaseLogin(login)
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
      user: state.tag === 'Authenticated' ? state.user : undefined,
    }
}

export default useAuthentication
