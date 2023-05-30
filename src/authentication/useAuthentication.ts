import { useState } from "react"
import { AuthenticationState, LoginRequest, RegisterRequest, noAuthentication } from "./Authentication"
import { login as supabaseLogin, register as supabaseRegister } from "./AuthenticationClient"

type UseAuthentication = {
  login: (login: LoginRequest) => Promise<void>
  register: (register: RegisterRequest) => Promise<void>,
  userLoggedIn: boolean,
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

    return {
      login,
      register,
      userLoggedIn: state.tag === 'Authenticated',
    }
}

export default useAuthentication
