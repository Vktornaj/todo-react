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
    done_date: string;
    deadline: string;
    tags: Array<string>;
};

export type User = {
    username: string;
    first_name: string;
    last_name: string;
};

export type UserRegister = {
    username: string;
    first_name: string;
    last_name: string;
    password: string;
};

export type UserLogin = {
    username: string;
    password: string;
};
