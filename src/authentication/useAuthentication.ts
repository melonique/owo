import { useState } from "react"
import { AuthenticationState, LoginUsecase, noAuthentication } from "./Authentication"
import { login as supabaseLogin } from "./AuthenticationClient"

type UseAuthentication = {
  login: (login: LoginUsecase) => Promise<void>
  userLoggedIn: boolean,
}

const useAuthentication = (): UseAuthentication => {
    const [state, setState] = useState<AuthenticationState>(noAuthentication())

    const login = async (login: LoginUsecase): Promise<void> => {
      const authState = await supabaseLogin(login)
      console.log(authState)
      setState(authState)
    }

    return {
      login,
      userLoggedIn: state.tag === 'Authenticated',
    }
}

export default useAuthentication
