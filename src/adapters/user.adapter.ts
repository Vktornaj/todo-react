import { User as UserEndpoint } from "../types/endpointTypes";
import { 
    User as MyUser, 
    UserLogin as MyUserLogin, 
    UserRegister as MyUSerRegister
} from "../types/userTypes";
import { UserLogin, UserRegister } from "../types/endpointTypes";
import { Auth as MyAuth } from "../types/authTypes";
import { Auth } from "../types/endpointTypes";


export const addapterEndpointUser = (user: UserEndpoint) => {
    const formattedUser: MyUser = {
        username: user.username,
        lastName: user.lastName,
        firstName: user.firstName,
    };

    return formattedUser;
};

export const addapterMyUser = (user: MyUser) => {
    const formattedUser: UserEndpoint = {
        username: user.username,
        lastName: user.lastName,
        firstName: user.firstName,
    };

    return formattedUser;
};

export const addapterMyUserLogin = (userLogin: MyUserLogin) => {
    const formattedUserLogin: UserLogin = {
        username: userLogin.username,
        password: userLogin.password,
    };

    return formattedUserLogin;
};

export const addapterEndpointUserLogin = (userLogin: UserLogin) => {
    const formattedUserLogin: MyUserLogin = {
        username: userLogin.username,
        password: userLogin.password,
    };

    return formattedUserLogin;
}

export const addapterMyUserRegister = (userRegister: MyUSerRegister) => {
    const formattedUserRegister: UserRegister = {
        username: userRegister.username,
        firstName: userRegister.firstName,
        lastName: userRegister.lastName,
        password: userRegister.password,
    };

    return formattedUserRegister;
};

export const addapterEndpointUserRegister = (userRegister: UserRegister) => {
    const formattedUserRegister: MyUSerRegister = {
        username: userRegister.username,
        firstName: userRegister.firstName,
        lastName: userRegister.lastName,
        password: userRegister.password,
    };

    return formattedUserRegister;
};

export const addapterMyAuth = (auth: MyAuth) => {
    const formattedAuth: Auth = {
        authorizationToken: auth.accessToken,
        tokenType: auth.tokenType,
    };

    return formattedAuth;
};

export const addapterEndpointAuth = (auth: Auth) => {
    const formattedAuth: MyAuth = {
        accessToken: auth.authorizationToken,
        tokenType: auth.tokenType,
    };

    return formattedAuth;
};