import { UserEndpoint } from "../types/endpointTypes";
import { 
    User as MyUser, 
    UserLogin as MyUserLogin, 
    UserRegister as MyUSerRegister
} from "../types/userTypes";
import { UserLoginEndpoint, UserRegisterEndpoint } from "../types/endpointTypes";
import { Auth as MyAuth } from "../types/authTypes";
import { AuthEndpoint } from "../types/endpointTypes";


export const adapterEndpointUser = (user: UserEndpoint) => {
    const formattedUser: MyUser = {
        username: user.username,
        lastName: user.lastName,
        firstName: user.firstName,
    };

    return formattedUser;
};

export const adapterMyUser = (user: MyUser) => {
    const formattedUser: UserEndpoint = {
        username: user.username,
        lastName: user.lastName,
        firstName: user.firstName,
    };

    return formattedUser;
};

export const adapterMyUserLogin = (userLogin: MyUserLogin) => {
    const formattedUserLogin: UserLoginEndpoint = {
        username: userLogin.username,
        password: userLogin.password,
    };

    return formattedUserLogin;
};

export const adapterEndpointUserLogin = (userLogin: UserLoginEndpoint) => {
    const formattedUserLogin: MyUserLogin = {
        username: userLogin.username,
        password: userLogin.password,
    };

    return formattedUserLogin;
}

export const adapterMyUserRegister = (userRegister: MyUSerRegister) => {
    const formattedUserRegister: UserRegisterEndpoint = {
        username: userRegister.username,
        firstName: userRegister.firstName,
        lastName: userRegister.lastName,
        password: userRegister.password,
    };

    return formattedUserRegister;
};

export const adapterEndpointUserRegister = (userRegister: UserRegisterEndpoint) => {
    const formattedUserRegister: MyUSerRegister = {
        username: userRegister.username,
        firstName: userRegister.firstName,
        lastName: userRegister.lastName,
        password: userRegister.password,
    };

    return formattedUserRegister;
};

export const adapterMyAuth = (auth: MyAuth) => {
    const formattedAuth: AuthEndpoint = {
        authorizationToken: auth.accessToken,
        tokenType: auth.tokenType,
    };

    return formattedAuth;
};

export const adapterEndpointAuth = (auth: AuthEndpoint) => {
    const formattedAuth: MyAuth = {
        accessToken: auth.authorizationToken,
        tokenType: auth.tokenType,
    };

    return formattedAuth;
};