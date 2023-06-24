import { createContext, useReducer } from "react";

import { Auth } from "../types/authTypes";
import { authReducer } from "./authReducer";
import { UserLogin } from "../types/userTypes";


type Props = {
    children: JSX.Element | JSX.Element[]  
};

type AuthContextProps = {
    auth: Auth | null,
    login: (userLogin: Auth) => void,
    logout: () => void,
};

const init = (): Auth | null => {
    const auth = localStorage.getItem('auth');
    if (!auth) {
        return null;
    }
    const authContet = JSON.parse(auth);
    return {
        accessToken: authContet['accessToken'],
        tokenType: authContet['tokenType'],
    }
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: Props) => {

    const [ authState, dispatch ] = useReducer(authReducer, null, init);

    const login = (myAuth: Auth) => {
        localStorage.setItem('auth', JSON.stringify( myAuth ));
        dispatch({ type: 'login', payload: myAuth });
    };

    const logout = () => {
        localStorage.removeItem('auth');
        dispatch({ type: 'logout' });
    };

    return (
        <AuthContext.Provider value={{
            auth: authState, 
            login: login, 
            logout: logout,
        }}>
            { children }
        </AuthContext.Provider>
    );
};
