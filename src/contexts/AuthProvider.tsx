import { createContext, useReducer } from "react";

import { Auth } from "../types/authTypes";
import { authReducer } from "./authReducer";
import authService from "../services/auth.service";
import { UserLogin } from "../types/userTypes";
import { addapterEndpointAuth, addapterMyUserLogin } from "../adapters/user.adapter";


type Props = {
    children: JSX.Element | JSX.Element[]  
};

type AuthContextProps = {
    auth: Auth | null,
    login: (userLogin: UserLogin) => void,
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

    const login = (userLogin: UserLogin) => {
        const user = addapterMyUserLogin(userLogin);
        authService.postLogin(user)
            .then(
                (res) => {
                    const myAuth = addapterEndpointAuth(res);
                    localStorage.setItem('auth', JSON.stringify( myAuth ));
                    dispatch({ type: 'login', payload: myAuth });
                }
            )
            .catch(
                _ => {
                    console.error("Error login");
                    window.location.reload();
                }
            );
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
