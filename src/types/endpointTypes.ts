export type AuthEndpoint = {
    authorizationToken: string;
    tokenType: string;
};

export type TodoEndpoint = {
    id: string | null;
    title: string;
    description: string;
    status: string;
    createDate: string | null;
    doneDate: string | null;
    deadline: string | null;
    tags: Array<string>;
};

export type TodoUpdateEndpoint = {
    id: string,
    title?: string;
    description?: string;
    status?: string;
    doneDate?: string | null;
    deadline?: string | null;
};

export type UserEndpoint = {
    username: string;
    firstName: string;
    lastName: string;
};

export type UserRegisterEndpoint = {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
};

export type UserLoginEndpoint = {
    username: string;
    password: string;
};
