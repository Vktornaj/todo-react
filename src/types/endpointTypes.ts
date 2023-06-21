export type Auth = {
    authorizationToken: string;
    tokenType: string;
};

export type Todo = {
    id: string | null;
    title: string;
    description: string;
    status: string;
    createDate: string | null;
    doneDate: string | null;
    deadline: string | null;
    tags: Array<string>;
};

export type TodoUpdate = {
    id: string,
    title: string | null;
    description: string | null;
    status: string | null;
    doneDate: string | null;
    deadline: string | null;
};

export type User = {
    username: string;
    firstName: string;
    lastName: string;
};

export type UserRegister = {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
};

export type UserLogin = {
    username: string;
    password: string;
};
