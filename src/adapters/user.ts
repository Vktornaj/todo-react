import { User as UserEndpoint } from "../types/endpointTypes";
import { 
    User as MyUser, 
    UserLogin as MyUserLogin, 
    UserRegister as MyUSerRegister
} from "../types/userTypes";
import { Todo, UserLogin, UserRegister } from "../types/endpointTypes";
import { Todo as MyTodo, Status} from "../types/todoTypes";
import { Auth as MyAuth } from "../types/authTypes";
import { Auth } from "../types/endpointTypes";


const addapterEndpointStatus = (status: string) => {
    switch (status) {
        case "PENDING":
            return Status.PENDING;
        case "STARTED":
            return Status.STARTED;
        case "DONE":
            return Status.DONE;
        case "PAUSED":
            return Status.PAUSED;
        case "ABORTED":
            return Status.ABORTED;
        default:
            throw new Error("Status not found");
    }
};

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

export const addapterEndpointTodo = (todo: Todo) => {
    const formattedTodo: MyTodo = {
        id: todo.id || "",
        title: todo.title,
        description: todo.description,
        status: addapterEndpointStatus(todo.status),
        createDate: todo.createDate ? new Date(todo.createDate) : null,
        doneDate: todo.doneDate ? new Date(todo.doneDate) : null,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
        tags: todo.tags,
    };

    return formattedTodo;
};

export const addapterMyTodo = (myTodo: MyTodo) => {
    const formattedTodo: Todo = {
        id: myTodo.id,
        title: myTodo.title,
        description: myTodo.description,
        status: myTodo.status,
        createDate: myTodo.createDate?.toJSON() || null,
        doneDate: myTodo.doneDate?.toJSON() || null,
        deadline: myTodo.deadline?.toJSON() || null,
        tags: myTodo.tags,
    };

    return formattedTodo;
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