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
        case "FINISHED":
            return Status.FINISHED;
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
        lastName: user.last_name,
        firstName: user.first_name,
    };

    return formattedUser;
};

export const addapterMyUser = (user: MyUser) => {
    const formattedUser: UserEndpoint = {
        username: user.username,
        last_name: user.lastName,
        first_name: user.firstName,
    };

    return formattedUser;
};

export const addapterEndpointTodo = (todo: Todo) => {
    const formattedTodo: MyTodo = {
        id: todo.id || "",
        title: todo.title,
        description: todo.description,
        status: addapterEndpointStatus(todo.status),
        createDate: new Date(todo.create_date),
        doneDate: new Date(todo.done_date),
        deadline: new Date(todo.deadline),
        tags: todo.tags,
    };

    return formattedTodo;
};

export const addapterMyTodo = (todo: MyTodo) => {
    const formattedTodo: Todo = {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        create_date: todo.createDate.toJSON(),
        done_date: todo.doneDate?.toJSON() || "",
        deadline: todo.deadline?.toJSON() || "",
        tags: todo.tags,
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
        first_name: userRegister.firstName,
        last_name: userRegister.lastName,
        password: userRegister.password,
    };

    return formattedUserRegister;
};

export const addapterEndpointUserRegister = (userRegister: UserRegister) => {
    const formattedUserRegister: MyUSerRegister = {
        username: userRegister.username,
        firstName: userRegister.first_name,
        lastName: userRegister.last_name,
        password: userRegister.password,
    };

    return formattedUserRegister;
};

export const addapterMyAuth = (auth: MyAuth) => {
    const formattedAuth: Auth = {
        access_token: auth.accessToken,
        token_type: auth.tokenType,
    };

    return formattedAuth;
};

export const addapterEndpointAuth = (auth: Auth) => {
    const formattedAuth: MyAuth = {
        accessToken: auth.access_token,
        tokenType: auth.token_type,
    };

    return formattedAuth;
};