import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { AuthenticationState, noAuthentication } from "./Authentication";

type ContextValue = {
    state: AuthenticationState
    setState: Dispatch<SetStateAction<AuthenticationState>>
}

const defaultContextValue: ContextValue = {
    state: noAuthentication(),
    setState: () => undefined
}

const AuthenticationContext = createContext<ContextValue>(defaultContextValue);

export const AuthenticationProvider: React.FC<{ children: any, defaultState: AuthenticationState}> = ({ children, defaultState = noAuthentication() }) => {
    const [state, setState] = useState<AuthenticationState>(defaultState)

    return (
        <AuthenticationContext.Provider value={{state, setState}}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export const useAuthenticationContext = () => {
    const context = useContext(AuthenticationContext)

    if (context === undefined) {
      throw new Error('useAuthenticationContext must be used within a AuthenticationProvider')
    }

    return context
}