export type Auth = {
    access_token: string;
    token_type: string;
};

export type Todo = {
    id: string | null;
    title: string;
    description: string;
    status: string;
    create_date: string;
    done_date: string | null;
    deadline: string | null;
    tags: Array<string>;
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
